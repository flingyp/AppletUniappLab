<template>
	<view class="progressBarBox">
		<view class="progressTitle">{{ progressTitle }}</view>
		<view class="barBox" :style="{ height: progressBarHeight + 'rpx' }">
			<view class="progressBarActive" :style="{width: barActiveStyle.width, backgroundColor: barActiveStyle.backgroundColor}" ref="progressBarActive"></view>
			<view class="progressBarTotal" ref="progressBarTotal">
				<text class="activeNumber">{{ progressActiveNum }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ProgressBar",
		data() {
			return {
				barActiveStyle: {},
			};
		},
		props: {
			// 选择的进度条部分的颜色
			activeBgColor: {
				type: String,
				default: "#277AFF",
			},
			// 进度条高度
			progressBarHeight: {
				type: String,
				default: "30",
			},
			// 进度条title
			progressTitle: {
				require: true,
				type: String,
				default: "进度条",
			},
			// 进度条总值
			progressTotalNum: {
				type: Number,
				default: 1000,
			},
			// 进度条值
			progressActiveNum: {
				type: Number,
				require: true,
				default: 0,
			},
		},
		mounted() {
			// 求 选择的进度条部分所占百分比
			let progressActiveNum = Number(this.progressActiveNum);
			let progressTotalNum = Number(this.progressTotalNum);
			if (progressActiveNum < 0) {
				// 进度条值 < 0 默认 等于 0
				progressActiveNum = 0;
			}
			if (progressActiveNum > progressTotalNum) {
				// 如果这个进度条数量 > 总数量 默认为总数量
				progressActiveNum = this.progressTotalNum;
			}
			// 进度所占百分比
			let progressPercentage = (progressActiveNum / progressTotalNum) * 100 + "%";

			this.barActiveStyle = {
				backgroundColor: this.activeBgColor,
				// height: this.progressBarHeight + "rpx",
				width: "0%",
			};
			
			setTimeout(() => {
				this.barActiveStyle.width = progressPercentage;
			}, 100);
		},
	};
</script>

<style lang="scss" scoped>
	.progressBarBox {
		width: 100%;
		height: 100%;
		margin: 20rpx 0;
		position: relative;

		.progressTitle {
			font-size: 20rpx;
			font-weight: 500;
			color: #576783;
			margin: 20rpx 0;
		}

		.barBox {
			width: 95%;
			position: relative;

			.progressBarActive {
				height: 100%;
				height: 100%;
				border-radius: 20rpx;
				position: absolute;
				transition: all 0.6s ease;
			}

			.progressBarTotal {
				width: 100%;
				height: 100%;
				background: #eeeeee;
				border-radius: 20rpx;

				.activeNumber {
					display: inline-block;
					font-size: 18rpx;
					font-weight: 500;
					color: #576783;
					opacity: 0.6;
					position: absolute;
					right: -7%;
				}
			}
		}
	}
</style>
