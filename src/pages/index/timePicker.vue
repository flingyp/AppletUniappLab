<template>
	<view>
		<view class="time-picker">
			<time-picker-com  @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
		<view class="time-picker">
			<time-picker-com :isShowCurrentDate="false" @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
		
		<button @tap="show" type="primary">测试底部弹窗</button>
	
		
		<view class="time-picker" @tap="openTimePickerCom2">
			打开单列选择器
		</view>
		
		<test-popup ref="fuck"></test-popup>
		
		<time-picker-com2 ref="timePickerCom2" title="请选择职业类别" isDisplayCloseBtn="right" :columnArr="columnArr" height="700" @currentChange="change"></time-picker-com2>
	</view>
</template>

<script>
	import TimePickerCom from '@/components/TimePickerCom/TimePickerCom.vue'
	import TimePickerCom2 from '@/components/TimePickerCom2/TimePickerCom2.vue'
	import testPopup from '@/components/test-popup/test-popup.vue'
	export default {
		name: 'timePicker',
		components: {
			TimePickerCom,
			TimePickerCom2,
			testPopup
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
				}]
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
			closeTimePickerCom2() {
				this.$refs.timePickerCom2.close()
			},
			change(data) {
				console.log('data',data)
			}
		}
	}
</script>

<style lang="scss">
	.time-picker {
		margin: 20rpx 0;
	}
</style>
