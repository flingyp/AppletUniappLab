<template>
	<view>
		<view class="chart_box">
			<ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
			</ec-canvas>
		</view>
	</view>
</template>

<script>
	import uniEcCanvas from '@/components/ec-canvas/ec-canvas'
	export default {
		data() {
			return {
				ec: {
					option: {
						title: {
							text: ''
						},
						tooltip: {
							trigger: 'axis',
							formatter: '{b}\r\n{c0}人',
							axisPointer: {
								type: 'line',
								axis: 'x',
								label: {
									backgroundColor: '#000000'
								}
							}
						},
						grid: {
							left: '6%',
							right: '6%',
							top: '6%',
							bottom: '6%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2-12', '2-14', '2-16', '2-10', '2-12', '2-22', '2-12'],
							axisLine: {
								// y轴
								show: false
							},
							axisTick: {
								// y轴刻度线
								show: false
							},
							splitLine: {
								// 网格线
								show: false
							}
						},
						yAxis: {
							type: 'value',
							axisLine: {
								// y轴
								show: false
							},
							axisTick: {
								// y轴刻度线
								show: false
							},
							splitLine: {
								// 网格线
								show: false
							}
						},
						series: [{
							name: '浏览量',
							type: 'line',
							smooth: true,
							lineStyle: {
								color: '#EF5959'
							},
							data: [1, 2, 3, 0, 3, 6, 4]
						}]
					}
				}
			}
		},
		onReady() {
			setTimeout(() => {
				console.log(this)
				console.log(this.$refs)
				this.$refs['canvas'].init()
				console.log('延迟加载了')
			}, 1000) // 两秒之后延迟加载

			setTimeout(() => {
				this.ec.option.series[0].data = [1, 2, 3, 0, 3, 6, 4]
				// 如果是data数组内的数据 记得用$set
				console.log('数据更改了')
			}, 2000)
		},
		components: {
			uniEcCanvas
		}
	}
</script>
<style scoped>
	.chart_box {
		width: 90%;
		height: 1000rpx;
		margin: 0 auto;
	}
	
	.uni-ec-canvas {
		width: 100%;
		height: 100%;
		display: inline-block;
	}
</style>
