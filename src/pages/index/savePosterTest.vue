<template>
	<view>
		<view class="savePosterItem">
			<image v-show="tempFilePath" :src="tempFilePath"></image>
			<save-poster-com v-show="!tempFilePath" ref="savePoster" :canvasInfo="canvasInfo"></save-poster-com>
		</view>
		
		
		<button class="savePosterBtn" type="primary" @click="saveBtnFun">保存海报</button>
	</view>
</template>

<script>
	import SavePosterCom from '@/components/SavePosterCom/SavePosterCom.vue'
	export default {
		components: {
			SavePosterCom
		},
		data() {
			return {
				canvasInfo: {
					canvasWidth: 620,
					canvasHeight: 950,
					canvasId: 'save-poster'
				},
				tempFilePath: '',
				canvasBgUrl: 'https://images.pexels.com/photos/4065617/pexels-photo-4065617.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
				avatarUrl: 'https://p9-passport.byteacctimg.com/img/user-avatar/4dbf31fa6dec9c65b78a70d28d843c04~300x300.image'
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
						7, 70)
					
					let promise_3 = drawText({
						context: context,
						text: '皮皮虾仁',
						dx: (canvasWH.canvasWidth / 2) + 60,
						dy: canvasWH.canvasHeight / 4,
						fontSize: 30,
						fontColor: '#5D4037'
					})
					
					let promise_4 = drawCanvasImage(context, this.avatarUrl, 150, 150, (canvasWH.canvasWidth / 2) + 85, (canvasWH.canvasHeight -
						165))
					 
					this.$refs.savePoster.startDrawToImage(context, [promise_1,promise_2,promise_4], (tempFilePath) => {
						this.tempFilePath = tempFilePath
					})
				})
			})
		},
		methods: {
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
	.savePosterItem {
		text-align: center;
	}
	.savePosterItem > image {
		width: 620rpx;
		height: 950rpx;
	}
	
	.savePosterBtn {
		margin-top: 40rpx;
		width: 80%;
	}
</style>
