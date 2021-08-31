<template>
	<view>
		<uni-nav-bar left-icon="back" left-text="返回" title="导航栏组件" :shadow="false" :statusBar="true" :fixed="true"
			:backgroundColor="`rgba(255,255,255,${backgroundOpacity})`" :color="headerTitleColor" style="width: 100%; position: absolute;">
		</uni-nav-bar>
		<!-- <u-navbar back-text="返回" title="剑未配妥，出门已是江湖" :border-bottom="false" :background="background"></u-navbar> -->

		<image src="https://st-gdx.dancf.com/gaodingx/0/uxms/design/20200714-160553-746b.png"
			style="width: 100%; height: 937px;"></image>

		<view class="test-box"></view>
		<view class="test-box"></view>
		<!-- <view class="test-box"></view> -->




		<!-- <uni-load-more status="loading"></uni-load-more>
		<button @click="open">打开弹窗</button>
		
		
		
		<uni-popup ref="popup" type="center" background-color="#fff">
			<text>Popup</text>
			<button @click="close">关闭</button>
		</uni-popup> -->

	</view>
</template>

<script>
	export default {
		name: 'headerNavbar',
		data() {
			return {
				background: {
					backgroundColor: 'rgba(255,255,255,0)',
				},
				backgroundOpacity: 0,
				headerTitleColor: 'rgba(255,255,255,1)'
			}
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		},
		// 监听页面滚动
		onPageScroll(e) {
			// console.log('e',e)
			const zeroBound = 140
			if (e.scrollTop === 0) {
				this.backgroundOpacity = 0
				this.headerBgColor = 'rgba(255,255,255,0)'
				this.headerTitleColor = 'rgba(255,255,255,1)'
				return
			}

			if (e.scrollTop < zeroBound) {
				this.backgroundOpacity = e.scrollTop / zeroBound
			} else {
				this.backgroundOpacity = 1
			}
			this.headerBgColor = `rgba(255,255,255,${this.backgroundOpacity})`
			this.headerTitleColor = `rgba(0,0,0,${this.backgroundOpacity})`
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-navbar .uni-navbar--border {
		border: 0;
	}

	.test-box {
		width: 100%;
		height: 500rpx;
		margin: 40px 0;
		border-bottom: 1px solid #0000FE;
	}
</style>
