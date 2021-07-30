<template>
	<view class="swiper-slide-box">
		<swiper previous-margin='40px' next-margin='40px' @change="change" class="swiper-box">
			<block v-for="(item,index) in swiperList" :key="index">
				<swiper-item>
					<view class="box" :animation="index == currentIndex?animationData:animationData2">
						<!-- 内容 -->
						<!-- 已图片为例 -->
						<view class="imgcot">
							<image :src="item.image" mode="widthFix"></image>
						</view>
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
	 */
	export default {
		name: 'swiperSlide',
		data() {
			return {
				swiperList: [{
					image: 'https://img2.baidu.com/it/u=2504128217,427863609&fm=26&fmt=auto&gp=0.jpg'
				}, {
					image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57beb9d1185cb.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630221964&t=5ad4e9726ab1807543381d2d0a93d473',
				}, {
					image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F58a5087da2b5f.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630221964&t=f5b62cc08212ad43b152ac31bacb508e',
				}],
				currentIndex: 0,
				animationData: {},
				animationData2: {}
			}
		},
		onLoad() {
			this.initialAnimation()
		},
		methods: {
			change(e) {
				this.currentIndex = e.detail.current
			},
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
				animation2.scale(0.88).step()
				this.animationData2 = animation2.export()
			}
		}
	}
</script>

<style lang="scss">
	.swiper-slide-box {
		margin-top: 100rpx;
	}

	.swiper-box {}

	.imgcot {
		image {
			border-radius: 20rpx;
		}
	}
</style>
