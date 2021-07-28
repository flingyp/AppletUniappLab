<template>
	<view class="time-picker-com-box">
		<view class="current-time-text" @click="openTimePickerPopup">
			<text>{{isShowCurrentDate?formateCurrentDate:formateCurrentTime}}</text>
		</view>

		<uni-popup ref="timePicerPopup" type="bottom">
			<view class="picker-view-box">
				<view class="picker-header-box">
					<view>取消</view>
					<view>标题</view>
					<view>确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="value" class="picker-view">
					<picker-view-column>
						<view class="picker-view-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-view-item" v-for="(item,index) in years" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-view-item" v-for="(item,index) in years" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: 'TimePickerCom',
		components: {
			uniPopup
		},
		props: {
			isShowCurrentDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				years: [1999, 2000, 2001, 2002, 2003, 2004],
				currentTimeInfo: {}
			}
		},
		computed: {
			// 当前日期: YYYY-MM-DD
			formateCurrentDate() {
				return `${this.currentTimeInfo.current_year}-${this.currentTimeInfo.current_month}-${this.currentTimeInfo.current_day}`
			},
			// 当前时间: YYYY-MM-DD HH:MM
			formateCurrentTime() {
				return `${this.currentTimeInfo.current_year}-${this.currentTimeInfo.current_month}-${this.currentTimeInfo.current_day} ${this.currentTimeInfo.current_hours}:${this.currentTimeInfo.current_minutes}`
			}
		},
		created() {
			this.currentTimeInfo = this.getCurrentTimeInfo()
			console.log('currentTimeInfo', this.currentTimeInfo)
		},
		methods: {
			/**
			 * 获取当前时间信息
			 */
			getCurrentTimeInfo() {
				let _currentDate = new Date()
				let _currentTimeInfo = {}
				_currentTimeInfo['current_year'] = _currentDate.getFullYear()
				_currentTimeInfo['current_month'] = (_currentDate.getMonth() + 1) < 10 ? '0' + (_currentDate.getMonth() + 1) : (
					_currentDate.getMonth() + 1)
				_currentTimeInfo['current_day'] = _currentDate.getDate() < 10 ? '0' + _currentDate.getDate() : _currentDate.getDate()
				_currentTimeInfo['current_hours'] = _currentDate.getHours() < 10 ? '0' + _currentDate.getHours() : _currentDate.getHours()
				_currentTimeInfo['current_minutes'] = _currentDate.getMinutes() < 10 ? '0' + _currentDate.getMinutes() :
					_currentDate.getMinutes()
				return _currentTimeInfo
			},
			/**
			 * 打开选择器弹出层
			 */
			openTimePickerPopup() {
				this.$refs.timePicerPopup.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.time-picker-com-box {}
	
	.current-time-text {
		color: rgb(96, 98, 102);
		font-size: 30rpx;
	}
	
	.picker-view-box {
		background: #FFF;
		
		& > .picker-view {
			height: 480rpx;
		}
	}
	
	.picker-header-box {
		min-height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 50rpx;
		border-bottom: 1px solid rgba(0,0,0,.1);
		
		& > view:nth-of-type(1) {
			color: #dd524d;
		}
		& > view:nth-of-type(2) {
			color: #000;
			font-weight: bold;
		}
		& > view:nth-of-type(3) {
			color: #007aff;
		}
	}
	
	.picker-view-item {
		text-align: center;
	}
</style>


