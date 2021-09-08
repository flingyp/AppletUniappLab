<template>
	<view>
		<!-- 第一版时间选择器 -->
		<view class="time-picker">
			<time-picker-com  @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
		<!-- 第一版时间选择器 -->
		<view class="time-picker">
			<time-picker-com :isShowCurrentDate="false" @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
		
		<button @tap="show" type="primary">测试底部弹窗</button>
	
		
		<view class="time-picker" @tap="openTimePickerCom2">
			打开单列选择器
		</view>
		
		<view class="time-picker" @tap="openAreaPickerCom">
			打开地区选择器
		</view>
		
		<view class="time-picker" @tap="openTimePickerCom3">
			打开日期选择器
		</view>
		
		<view class="time-picker" @tap="openTimePickerCom4">
			打开时间选择器
		</view>
		
		<ming-pickers @address="address" @close="close" :defaultAddress="defaultAddress">
			<view>我是ming-pickers地区选择器</view>
		</ming-pickers>
		
		<!-- 测试底部弹窗 -->
		<test-popup ref="fuck"></test-popup>
		
		<!-- 单列选择器 -->
		<time-picker-com2 ref="timePickerCom2" title="请选择职业类别" isDisplayCloseBtn="right" :columnArr="columnArr" height="700" @currentChange="change"></time-picker-com2>
		
		<!-- 地区选择器 -->
		<area-picker-com ref="areaPickerCom" title="请选择地区" isDisplayCloseBtn="right" :columnArr="columnArr" height="700" @currentChange="change" :defaultAddress="defaultAddress"></area-picker-com>
		
		<!-- 日期选择器、时间选择器 -->
		<time-picker-com3 ref="timePickerCom3" title="日期选择器" isDisplayCloseBtn="right" height="700" @currentChange="change" @selectTimeDate="selectTimeDate" :isShowCurrentDate="true"></time-picker-com3>
		<!-- 日期选择器、时间选择器 -->
		<time-picker-com3 ref="timePickerCom4" title="时间选择器" isDisplayCloseBtn="right"  height="700" @currentChange="change" @selectTimeDate="selectTimeDate" :isShowCurrentDate="false"></time-picker-com3>
	</view>
</template>

<script>
	import TimePickerCom from '@/components/TimePickerCom/TimePickerCom.vue'
	import TimePickerCom2 from '@/components/TimePickerCom2/TimePickerCom2.vue'
	import testPopup from '@/components/test-popup/test-popup.vue'
	import mingPickers from "@/components/ming-picker/ming-picker.vue"
	import areaPickerCom from '@/components/areaPickerCom/areaPickerCom.vue'
	import TimePickerCom3 from '@/components/TimePickerCom3/TimePickerCom3.vue'
	export default {
		name: 'timePicker',
		components: {
			TimePickerCom,
			TimePickerCom2,
			testPopup,
			mingPickers,
			areaPickerCom,
			TimePickerCom3
		},
		data() {
			return {
				columnArr: [{
					text: '党政机关人员',
					code: 'dzjgry'
				},{
					text: '企事业单位工作人员',
					code: 'qsydwgzry'
				},{
					text: '商业及服务业工作人员',
					code: 'syjfwygzry'
				},{
					text: '农林牧渔劳动者',
					code: 'nlmyrdz'
				},{
					text: '学生',
					code: 'xs'
				},{
					text: '军人',
					code: 'jr'
				},{
					text: '无业',
					code: 'wy'
				},{
					text: '其他',
					code: 'qt'
				}],
				defaultAddress: ["广东省", "广州市", "番禺区"]
			}
		},
		methods: {
			show() {
				this.$refs.fuck.open()
			},
			selectTimeDate(time) {
				console.log('time',time)
			},
			openTimePickerCom2() {
				this.$refs.timePickerCom2.open()
			},
			openTimePickerCom3() {
				this.$refs.timePickerCom3.open()
			},
			openTimePickerCom4() {
				this.$refs.timePickerCom4.open()
			},
			openAreaPickerCom() {
				this.$refs.areaPickerCom.open()
			},
			closeTimePickerCom2() {
				this.$refs.timePickerCom2.close()
			},
			change(data) {
				console.log('data',data)
			},
			address(e) {
				console.log('address:e',e)
			},
			close() {
				console.log('关闭')
			}
		}
	}
</script>

<style lang="scss">
	.time-picker {
		margin: 20rpx 0;
	}
</style>
