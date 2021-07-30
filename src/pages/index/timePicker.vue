<template>
	<view>
		<view class="time-picker">
			<time-picker-com  @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
		<view class="time-picker">
			<time-picker-com :isShowCurrentDate="false" @selectTimeDate="selectTimeDate"></time-picker-com>
		</view>
	</view>
</template>

<script>
	import TimePickerCom from '@/components/TimePickerCom/TimePickerCom.vue'
	export default {
		name: 'timePicker',
		components: {
			TimePickerCom
		},
		methods: {
			selectTimeDate(time) {
				console.log('time',time)
			}
		}
	}
</script>

<style lang="scss">
	.time-picker {
		margin: 20rpx 0;
	}
</style>
