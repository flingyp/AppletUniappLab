<template>
	<view>
		<canvas :canvas-id="canvasInfo.canvasId" :style="{width: canvasWH.canvasWidth + 'px', height: canvasWH.canvasHeight + 'px'}"></canvas>
	</view>
</template>

<script>
	export default {
		name: 'savePosterCom',
		data() {
			return {
				userPhoneWHInfo: {},
				canvasWH: {
					canvasWidth: 0,
					canvasHeight: 0
				}
			}
		},
		props: {
			// 决定保存下来的图片的宽高
			canvasInfo: {
				type: Object,
				default: () => {
					return {
						canvasWidth: 0,
						canvasHeight: 0,
						canvasId: 'canvasId'
					}
				}
			},
			// canvas画布是不是全屏，默认是false。 false时使用必须传 canvasInfo
			isFullScreen: Boolean
		},
		created() {
			this.userPhoneWHInfo = this.getPhoneSystemInfo()
			if (this.isFullScreen) { // 画布全屏
				this.canvasWH.canvasWidth = this.userPhoneWHInfo.windowWidth
				this.canvasWH.canvasHeight = this.userPhoneWHInfo.windowHeight
			} else { // 指定宽高
				this.canvasWH.canvasWidth = this.canvasInfo.canvasWidth
				this.canvasWH.canvasHeight = this.canvasInfo.canvasHeight
			}
		},
		mounted() {},
		methods: {
			/**
			 * 获取用户手机屏幕信息
			 */
			getPhoneSystemInfo() {
				const res = uni.getSystemInfoSync();
				return {
					windowWidth: res.windowWidth,
					windowHeight: res.windowHeight
				}
			},
			/** 获取 CanvasContext实例
			 * @param {String} canvasId 
			 */
			getCanvasContextInit(canvasId) {
				return uni.createCanvasContext(canvasId, this)
			},
			/** 保存海报组件初始化
			 * @param {Function} callback(context) 回调函数
			 */
			canvasInit(callback) {
				let context = this.getCanvasContextInit(this.canvasInfo.canvasId)
				if (context) {
					callback({
						context: context,
						comThis: this
					})
				}
			},
			/** 将上诉的绘制画到画布中 并且 将画布导出为图片
			 *  @param context 画布
			 *  @param {Promise[]} 存放Promise的数组 
			 *  @param {Function} callback 保存图片后执行的回调函数(本地图片临时路径)
			 */
			startDrawToImage(context, promiseArr, callback) {
				// 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
				let canvasId = this.canvasInfo.canvasId
				let tempFilePath = ''
				Promise.all(promiseArr).then(res => {
					context.draw(false, async () => {
						callback(await this.canvasToImage(canvasId))
					})
				})
			},
			/**
			 * 在canvas绘制一张图片
			 * @param context 画布
			 * @param src 图片资源
			 * @param _imageWidth 图片宽度
			 * @param _imageHeight 图片高度 
			 */
			drawCanvasImage(context, src, _imageWidth, _imageHeight, dx, dy) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: src,
						success: res => {
							context.drawImage(res.path, (dx - _imageWidth), (dy - _imageHeight), _imageWidth, _imageHeight)
							resolve(context)
						},
					})
				})
			},
			/** 绘制一个圆形头像
			 * @param  context 画布 
			 * @param  url     图片地址
			 * @param  _circularX  圆心X坐标
			 * @param  _circularY  圆心Y坐标
			 * @param  _circularR  圆半径
			 */
			drawCircularAvatar(context, url, _circularX, _circularY, _circularR) {
				let dx = _circularX - _circularR;
				let dy = _circularY - _circularR;
				let dwidth = _circularR * 2;
				let dheight = _circularR * 2
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: url,
						success: res => {
							context.save()
							context.beginPath()
							// _circularX圆的x坐标  _circularY圆的y坐标  _circularR圆的半径
							context.arc(_circularX, _circularY, _circularR, 0, 2 * Math.PI)
							context.clip()
							// dx: 图像的左上角在目标canvas上 X 轴的位置
							// dy: 图像的左上角在目标canvas上 Y 轴的位置
							// dwidth: 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
							// dheight: 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
							context.drawImage(res.tempFilePath, dx, dy, dwidth, dheight)
							context.restore()
							// context.draw()
							resolve(context)
						}
					})
				})
			},
			/** 绘制多行文本 注:, 和 空格都算一个字
			 * @param context 画布
			 * @param text 需要被绘制的文本
			 * @param dx 左上角x坐标
			 * @param dy 右上角y坐标
			 * @param rowStrnum 每行多少个字 (默认为text字体个数->单行)
			 * @param fontSize 文字大小 （默认16）
			 * @param fontColor 文字颜色 (默认black)
			 * @param lineHeight 单行文本行高 (默认0)
			 */
			drawText(options) {
				let {
					context,
					text,
					dx,
					dy,
					rowStrnum = text.length,
					lineHeight = 0,
					fontSize = 16,
					fontColor = 'black'
				} = options
				return new Promise((resolve, reject) => {
					context.setFontSize(fontSize)
					context.setFillStyle(fontColor)
					context.setTextBaseline('middle')
					// 获取需要绘制的文本宽度
					let textWidth = Number(context.measureText(text).width)
					// console.log('textWidth',textWidth)
					// 获取文本的字数 
					let textNum = text.length
					// 获取行数 向上取整
					let lineNum = Math.ceil(textNum / rowStrnum)
					// console.log('textNum',textNum)
					// console.log('lineNum',lineNum)
					for (let i = 0; i < lineNum; i++) {
						let sliceText = text.slice(i * rowStrnum, (i + 1) * rowStrnum)
						// fillText 的 dx = 文字最左边的距离到屏幕政策的距离
						context.fillText(sliceText, dx - textWidth, dy + i * lineHeight);
					}
					resolve(context)
				})
			},
			/** 将画布导出为图片
			 * @param canvasId 画布标识
			 */
			canvasToImage(canvasId) {
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
						canvasId: canvasId, // 画布标识
						success: res => {
							// 在H5平台下，tempFilePath 为 base64
							resolve(res.tempFilePath)
						},
						fail: err => {
							console.log('err', err)
							reject(err)
						}
					}, this)
				})
			},
			/** 保存生成的图片到本地相册中
			 *  @param {String} filePath 图片临时路劲
			 */
			posterToPhotosAlbum(filePath) {
				uni.showLoading({
					title: '保存中...'
				})
				uni.saveImageToPhotosAlbum({
					filePath: filePath,
					success: (res) => {
						uni.showToast({
							title: '保存成功，请前往手机相册中查看',
							mask: true,
							icon: 'none',
							duration: 2000
						})
					},
					fail: (err) => {
						console.log('err',err)
						if (err.errMsg.includes('deny')||err.errMsg.includes('denied')) { // 用户选择拒绝 
							this.openSetting()
						} else if (err.errMsg.includes('fail cancel')) { // 用户在保存图片时 取消了
							uni.showToast({
								title: '已取消保存，无法保存至相册',
								mask: true,
								icon: 'none',
								duration: 2000
							})
							return
						}
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			/**
			 * 打开摄像头设置权限页面
			 */
			openSetting() {
				uni.showModal({
					title: '温馨提示',
					content: '保存图片至相册中，需要您同意添加访问相册权限',
					cancelText: '拒绝',
					confirmText: '同意',
					success: res => {
						if (res.confirm) {
							uni.openSetting({
								success: settingdata => {
									if (settingdata.authSetting['scope.writePhotosAlbum']) {
										console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
										uni.showToast({
											title: '授权成功，请再次点击保存',
											icon: 'none',
											duration: 2000,
										})
									} else {
										console.log('获取权限失败，给出不给权限就无法正常使用的提示')
										uni.showToast({
											title: '需要访问相册权限',
											icon: 'none',
											duration: 2000,
										})
									}
								},
								fail: (res) => {
									console.log('err', err)
								}
							})
						} else {
							uni.showToast({
								title: '已拒绝授权，无法保存至相册',
								mask: true,
								icon: 'none',
								duration: 2000
							})
							return
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
