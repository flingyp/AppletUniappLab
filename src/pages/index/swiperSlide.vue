<template>
	<view class="swiper-slide-box">
		<swiper previous-margin='30px' next-margin='30px' @change="change" class="swiper-box" :circular="true" autoplay :interval="2000">
			<block v-for="(item,index) in displayArticlesList" :key="index">
				<swiper-item>
					<view class="box" :animation="index == currentIndex?animationData:animationData2">
						<!-- 内容 -->
						<!-- 已图片为例 -->
						<image :src="item.image" class="imgcot"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	/**
	 * 用于解决需要渲染Swiper-item过渡导致卡顿问题 （还未研究）
	 * https://blog.csdn.net/whoami138/article/details/116246146
	 * [1,2,3,4,5,6,7,8,9,10]        [1,2,3]
	 * 向右滑动  [2,3,4]     => 向左滑动 [1,2,3]
	 * 向左滑动  [10, 1, 2]  => 向右滑动 [1,2,3]
	 */
	export default {
		name: 'swiperSlide',
		data() {
			return {
				currentIndex: 0, // 这是当前swiper-item在swiper中的索引
				index: 0, // 这是当前swiper-item在articlesList中的索引
				articlesList: [{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKWC4NoCIRKj7AAWFg8c9UZQAAP7rwODL64ABYWb088.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4NoCINRnlAAZG3Rp1bukAAP7rwN3X2wABkb1460.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4Nn-IIpWlAAbG4HgvbeUAAP7rwNqHv0ABsb4685.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKWC4NoKIed2hAAUldFdR8TwAAP7rwPS4k8ABSWM079.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKWC4NoGIMh8bAAT1DY_qk2IAAP7rwOttuYABPUl763.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4Nn-IXo0eAAgZOoCOJbUAAP7rwNbOvkACBlS138.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4NoGIBDxRAAdFGy1DuvcAAP7rwPGdGUAB0Uz741.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4NoGIbzIfAAVvnWUQAQsAAP7rwO4n2kABW-1522.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKmC4NoCIOhwKAAarwwaHZmIAAP7rwOgeVEABqvb240.jpg'
				},{
					image: 'https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g6/M00/0A/06/ChMkKWC4NoCIVqa1AAXDofuc10oAAP7rwOQwfoABcO5694.jpg'
				}],
				displayArticlesList: [], // 显示的文章
				animationData: {},
				animationData2: {}
			}
		},
		onLoad() {
			this.initialAnimation()
			this.upDateDisplayList()
		},
		methods: {
			change(e) {
				let current = e.detail.current
				if(this.currentIndex - current == 2 || this.currentIndex - current == -1) {
					this.index = this.index + 1 == this.articlesList.length ? 0 : this.index + 1
					this.currentIndex = this.currentIndex + 1 == 3 ? 0 : this.currentIndex + 1
					this.upDateDisplayList()
				} else if(this.currentIndex - current == -2 || this.currentIndex - current == 1){
					this.index = this.index - 1 == -1 ? this.articlesList.length - 1 : this.index - 1
					this.currentIndex = this.currentIndex - 1 == -1 ? 2 : this.currentIndex - 1
					this.upDateDisplayList()
				}
			},
			// 动画效果
			initialAnimation() {
				// 放大
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				animation.scale(1).step()
				this.animationData = animation.export()

				// 缩小
				var animation2 = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				animation2.scale(0.9).step()
				this.animationData2 = animation2.export()
			},
			// 更新 displayList
			upDateDisplayList() {
				let displayList = []
				displayList[this.currentIndex] = this.articlesList[this.index]
				displayList[this.currentIndex - 1 == -1 ? 2 : this.currentIndex - 1] = this.articlesList[this.index - 1 == -1 ?
					this.articlesList.length - 1 : this.index - 1]
				displayList[this.currentIndex + 1 == 3 ? 0 : this.currentIndex + 1] = this.articlesList[this.index + 1 == this.articlesList
					.length ? 0 : this.index + 1]
				this.displayArticlesList = displayList
			}
		}
	}
</script>

<style lang="scss">
	.swiper-slide-box {
		margin-top: 40rpx;
	}

	.swiper-box {
		height: 1000rpx;
	}
	
	.box {
		height: 100%;
	}

	.imgcot {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
