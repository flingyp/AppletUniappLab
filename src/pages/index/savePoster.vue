<template>
	<view>
		<scroll-view scroll-x="true" class="savePoster" :scroll-with-animation="true" @scroll="scroll">
			<view class="savePosterItem">
				<image v-show="tempFilePath" :src="tempFilePath"></image>
				<save-poster-com v-show="!tempFilePath" ref="savePoster" :canvasInfo="canvasInfo"></save-poster-com>
			</view>

			<view class="savePosterItem">
				<image v-show="tempFilePath" :src="tempFilePath"></image>
				<save-poster-com v-show="!tempFilePath" ref="savePoster" :canvasInfo="canvasInfo"></save-poster-com>
			</view>
			
			<view class="savePosterItem">
				<image v-show="tempFilePath" :src="tempFilePath"></image>
				<save-poster-com v-show="!tempFilePath" ref="savePoster" :canvasInfo="canvasInfo"></save-poster-com>
			</view>

			<view class="savePosterItem">
				<image v-show="tempFilePath" :src="tempFilePath"></image>
				<save-poster-com v-show="!tempFilePath" ref="savePoster" :canvasInfo="canvasInfo"></save-poster-com>
			</view>
		</scroll-view>
		
		<button class="savePosterBtn" type="primary" @click="saveBtnFun">保存海报</button>
	</view>
</template>

<script>
	import SavePosterCom from '@/components/SavePosterCom/SavePosterCom.vue'
	export default {
		name: 'savePosterTwo',
		components: {
			SavePosterCom
		},
		data() {
			return {
				canvasInfo: {
					canvasWidth: 350,
					canvasHeight: 550,
					canvasId: 'save-poster'
				},
				canvasBgUrl: 'https://img0.baidu.com/it/u=3057618655,2802941403&fm=26&fmt=auto&gp=0.jpg',
				avatarUrl: 'https://img0.baidu.com/it/u=1680160535,2861893475&fm=26&fmt=auto&gp=0.jpg',
				qrCodeUrl: 'https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
				tempFilePath: ''
			}
		},
		onLoad() {
			let {
				drawCanvasImage,
				drawCircularAvatar,
				drawText
			} = this.$refs.savePoster.$options.methods
			this.$refs.savePoster.canvasInit(({
				context,
				comThis
			}) => {
				// 获取画布宽高
				let canvasWH = comThis.canvasWH
				// 绘制海报背景图
				let promise_1 = drawCanvasImage(context, this.canvasBgUrl, canvasWH.canvasWidth, canvasWH.canvasHeight)
				// 必须先绘制玩海报背景图 再去操作其他绘制内容
				promise_1.then(res => {
					let promise_2 = drawCircularAvatar(context, this.avatarUrl, canvasWH.canvasWidth / 2, canvasWH.canvasHeight /
						7, 40)

					let promise_3 = drawText({
						context: context,
						text: '岳云鹏',
						dx: (canvasWH.canvasWidth / 2) + 30,
						dy: canvasWH.canvasHeight / 3.6,
						fontSize: 20,
						fontColor: 'red'
					})

					let promise_4 = drawCanvasImage(context, this.qrCodeUrl, 100, 100, (canvasWH.canvasWidth / 2) + 50, (canvasWH.canvasHeight -
						100))

					this.$refs.savePoster.startDrawToImage(context, [promise_1, promise_2, promise_3, promise_4], (tempFilePath) => {
						this.tempFilePath = tempFilePath
					})
				})
			})
		},
		methods: {
			scroll(e) {
				let scrollWidth = e.detail.scrollWidth
				let scrollLeft = e.detail.scrollLeft
				let scale = (scrollLeft / scrollWidth).toFixed(2)
				console.log('scale',scale)
			},
			saveBtnFun() {
				uni.showModal({
					title: '保存海报',
					content: '海报将被保存至相册中',
					confirmText: '保存',
					success: (res) => {
						if(res.confirm) {
							this.$refs.savePoster.posterToPhotosAlbum(this.tempFilePath)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.savePoster {
		width: 100%;
		overflow: hidden;
		white-space: nowrap; // 滚动必须加的属性
	}
	.savePosterItem {
		display: inline-block;
		width: 80%;
		height: 1000rpx;
		margin: 0 20rpx;
		text-align: center;
		/* border: 1rpx solid #007AFF; */
	}
	.savePosterItem > image {
		width: 100%;
		height: 100%;
	}
	
	.savePosterItem:first-of-type {
		margin-left: 40rpx;
	}
	
	.savePosterItem:last-of-type {
		margin-right: 40rpx;
	}
	
	.savePosterBtn {
		margin-top: 40rpx;
		width: 80%;
	}
</style>
