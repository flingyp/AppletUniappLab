<template>
	<view class="echarts-box">
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="780"></ProgressBar>
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="300"></ProgressBar>
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="500"></ProgressBar>
		
		<view class="echart-box">
			<uni-ec-canvas class="uni-ec-canvas" id="line-chart" canvas-id="multi-charts-line" :ec="ec"></uni-ec-canvas>
		</view>
		
		<view class="echart-box">
			<uni-ec-canvas class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie" :ec="ec2"></uni-ec-canvas>
		</view>
		
		<view class="echart-box">
			<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec3">
			</uni-ec-canvas>
		</view>
	</view>
</template>

<script>
	import uniEcCanvas from '@/components/uni-ec-canvas/uni-ec-canvas.vue'
	export default {
		components: {
			uniEcCanvas
		},
		data() {
			return {
				chartsDataColumn1: {},
				ec: {
					option: {
						tooltip: {},
						title: {
							text: '柱状图',
							subtext: '纯属虚构',
							left: 'center'
						},
						xAxis: {
							data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
						},
						yAxis: {},
						series: [{
							name: '销量',
							type: 'bar',
							data: [5, 20, 36, 10, 10, 20]
						}]
					}
				},
				ec2: {
					option: {
						title: {
							text: '南丁格尔玫瑰图',
							subtext: '纯属虚构',
							left: 'center'
						},
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
							left: 'center',
							top: 'bottom',
							data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
						},
						series: [{
							name: '半径模式',
							type: 'pie',
							radius: [20, 80],
							center: ['50%', '50%'],
							roseType: 'radius',
							itemStyle: {
								borderRadius: 5
							},
							label: {
								show: false
							},
							emphasis: {
								label: {
									show: true
								}
							},
							data: [{
									value: 40,
									name: 'rose 1'
								},
								{
									value: 33,
									name: 'rose 2'
								},
								{
									value: 28,
									name: 'rose 3'
								},
								{
									value: 22,
									name: 'rose 4'
								},
								{
									value: 20,
									name: 'rose 5'
								},
								{
									value: 15,
									name: 'rose 6'
								},
								{
									value: 12,
									name: 'rose 7'
								},
								{
									value: 10,
									name: 'rose 8'
								}
							]
						}]
					}
				},
				ec3: {
					option: {
						title: {
							text: '折线图',
							subtext: '纯属虚构',
							left: 'center'
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
							top: '16%',
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
								show: true
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
							data: [5, 10, 8, 12, 20, 22, 2]
						}]
					}
				}
			}
		},
		onReady() {
		},
		methods: {
			_gopage(url) {
				this.gopage(url)
			}
		}
	}
</script>

<style lang="scss">
	.echarts-box {
		padding: 0 20rpx;
	}
	
	.echart-box {
		width: 100%;
		margin: 10rpx 0;
		display: inline-block;
	}

	.uni-ec-canvas {
		width: 100%;
		height: 750rpx;
		display: block;
	}
</style>
