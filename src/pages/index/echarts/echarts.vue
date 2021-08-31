<template>
	<view class="echarts-box">
		<!-- <uni-nav-bar left-icon="back" left-text="返回"  title="导航栏组件" :shadow="true" :statusBar="true" :fixed="true"></uni-nav-bar> -->
		<u-navbar back-text="返回" title="图表!"></u-navbar>
		
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="780"></ProgressBar>
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="300"></ProgressBar>
		<ProgressBar :progressTitle="'进度条标题'" :progressTotalNum="1000" :progressActiveNum="500"></ProgressBar>

		<view class="echart-box">
			<ec-canvas style="height: 700rpx;" class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie"
				:ec="ec4"></ec-canvas>
		</view>

		<view class="echart-box">
			<ec-canvas style="height: 700rpx;" class="uni-ec-canvas" id="line-chart" canvas-id="multi-charts-line"
				:ec="ec"></ec-canvas>
		</view>

		<view class="echart-box">
			<ec-canvas style="height: 700rpx;" class="uni-ec-canvas" id="pie-chart" canvas-id="multi-charts-pie"
				:ec="ec2"></ec-canvas>
		</view>

		<view class="echart-box">
			<ec-canvas style="height: 700rpx;" class="uni-ec-canvas" id="line-chart" ref="canvas"
				canvas-id="lazy-load-chart" :ec="ec3">
			</ec-canvas>
		</view>


	</view>
</template>

<script>
	import uniEcCanvas from '@/components/ec-canvas/ec-canvas.vue'
	import * as echarts from '@/components/ec-canvas/echarts.js'
	let ec4_value = 0.54
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
				},
				ec4: {
					option: {
						backgroundColor: "#07182e",
						title: {
							text: '柱状图',
							subtext: '纯属虚构',
							left: 'center',
							top: '6%',
							textStyle: {
								color: '#FFF'
							}
						},
						grid: {
							right: '5%',
							left: '5%',
							top: '5%',
							bottom: '5%',
							borderWidth: 1
						},
						xAxis: {
							show: false,
							type: 'category',
							data: ['Mon']
						},
						yAxis: {
							show: false,
							type: 'value'
						},
						series: [{
								name: '压力',
								center: ['50%', '75%'],
								detail: {
									textStyle: {
										fontSize: 20
									}
								},
								type: "gauge",
								radius: '70%',
								min: 0,
								max: 100,
								splitNumber: 5,
								startAngle: 180,
								endAngle: 0,
								zlevel: 0,
								data: [{
									value: 80,
									name: '压力(Pa)',
									itemStyle: {
										color: '#fff'
									}
								}],
								legend: {
									padding: 0,
									margin: 0
								},
								pointer: {
									show: true,
									length: '70%',
									radius: '50%',
									width: 10, //指针粗细
								},
								title: { // 仪表盘标题。
									show: true, // 是否显示标题,默认 true。
									color: '#FFF',
									fontSize: 10
								},
								markLine: {
									precision: 2
								},
								axisTick: {
									show: false,
									splitNumber: 5,
									lineStyle: {
										width: 2,
									},
									length: -8
								}, //刻度样式
								splitLine: {
									show: true,
									length: -10,
									lineStyle: {
										color: '#233446', //用颜色渐变函数不起作用
									}
								}, //分隔线样式
								axisLabel: {
									show: true,
									distance: -20
								},
								axisLine: { // 坐标轴线  
									lineStyle: { // 属性lineStyle控制线条样式  
										width: 20, // 仪表盘宽度
										color: [
											[0.2, '#2ca1ff'],
											[0.8, '#0adbfa'],
											[1, '#eaba5f']
										]
									}
								},
							},
							{
								name: "小圆形",
								center: ['50%', '75%'],
								type: "pie",
								hoverAnimation: false,
								legendHoverLink: false,
								zlevel: 0,
								radius: ["0%", "5%"],
								tooltip: {
									show: false,
								},
								z: 10,
								label: {
									normal: {
										show: false,
										position: "center",
									},
									emphasis: {
										show: false,
									},
								},
								labelLine: {
									normal: {
										show: false,
									},
								},
								data: [{
									value: 100,
									name: "2",
									itemStyle: {
										normal: {
											color: "#fff",
										},
									},
								}, ],
							},
							{
								name: "小圆形",
								center: ['50%', '75%'],
								type: "pie",
								hoverAnimation: false,
								legendHoverLink: false,
								radius: ["5%", "6%"],
								tooltip: {
									show: false,
								},
								z: 10,
								label: {
									normal: {
										show: false,
										position: "center",
									},
									emphasis: {
										show: false,
									},
								},
								labelLine: {
									normal: {
										show: false,
									},
								},
								data: [{
									value: 100,
									name: "2",
									itemStyle: {
										normal: {
											color: "#08BBED",
										},
									},
								}, ],
							},
							{
								name: "小圆形",
								center: ['50%', '75%'],
								type: "pie",
								hoverAnimation: false,
								legendHoverLink: false,
								tooltip: {
									show: false,
								},
								radius: ["6%", "8%"],
								z: 10,
								label: {
									normal: {
										show: false,
										position: "center",
									},
									emphasis: {
										show: false,
									},
								},
								labelLine: {
									normal: {
										show: false,
									},
								},
								data: [{
										value: 0,
										name: "1",
										itemStyle: {
											normal: {
												color: "red",
											},
										},
									},
									{
										value: 100,
										name: "2",
										itemStyle: {
											normal: {
												color: "rgba(0,0,0,0)",
												borderColor: "red"
											},
										},
									},
								],
							},
						]
					}
				}
			}
		},
		onReady() {},
		methods: {
			_gopage(url) {
				this.gopage(url)
			}
		}
	}
</script>

<style lang="scss">
	.echarts-box {
		// padding: 0 20rpx;
	}

	.echart-box {
		width: 100%;
		margin: 10rpx 0 50rpx 0;
		display: inline-block;
	}

	.uni-ec-canvas {
		width: 100%;
		// height: 750rpx;
		display: block;
	}
</style>
