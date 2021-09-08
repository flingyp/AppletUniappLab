<template>
	<view class="time-picker-box" v-if="isDisplayPicker">
		<!-- 遮罩层 -->
		<view :class="['mask-box', maskClass]"></view>
		<!-- 选择器内容 -->
		<view :class="['picker-box', pickerClass]" :style="{height: height+'rpx'}">
			<view class="picker-header-box">
				<!-- 左侧关闭按钮 -->
				<view class="left-close-btn" v-if="isDisplayCloseBtn==='left'" @tap="close">
					<u-icon name="close" size="38"></u-icon>
				</view>
				<view class="picker-title">{{title}}</view>
				<!-- 右侧关闭按钮 -->
				<view class="right-close-btn" v-if="isDisplayCloseBtn==='right'" @tap="close">
					<u-icon name="close" size="38"></u-icon>
				</view>
			</view>
			<!-- 日期选择器 -->
			<picker-view :indicator-style="indicatorStyle" :value="pickerValueList_date" class="picker-view" v-if="isShowCurrentDate"
			 @change="pickerChange">
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
			<!-- 时间选择器 -->
			<picker-view :indicator-style="indicatorStyle" :value="pickerValueList_time" class="picker-view" v-if="!isShowCurrentDate"
			 @change="pickerChange">
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in times" :key="index">{{item}}时</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-view-item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
				</picker-view-column>
			</picker-view>
			<!-- <picker-view class="picker-select-box" :value="currentColumnIndex" :indicator-style="indicatorStyle" @change="oneColumnChange">
				<picker-view-column>
					<view v-for="(item, index) in columnArr" :key="index" class="one-column-item">{{item.text}}</view>
				</picker-view-column>
			</picker-view> -->
			<view class="picker-bottom-box">
				<view class="confirm-btn" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TimePickerCom3',
		props: {
			title: {
				type: String,
				default: ''
			},
			isDisplayCloseBtn: { // left 默认显示头部左侧关闭按钮  right显示右侧
				type: String,
				default: 'left'
			},
			columnArr: {
				type: Array,
				default: () => {
					return []
				}
			},
			height: {
				type: Number || String,
				default: 600
			},
			isShowCurrentDate: { // true代码选择日期 具体到day。 false代表选择时间 具体到 time
				type: Boolean,
				default: true
			},
			minYear: [Number, String],
			maxYear: [Number, String],
			maskClick: { // 禁用点击遮罩关闭
				type: Boolean,
				default: true
			},
			maxMonth: [Number, String],
			maxDay: [Number, String]
		},
		data() {
			/**
			 * 获取当前时间信息
			 */
			const getCurrentTimeInfo = () => {
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
			}
			/**
			 * 填充年份
			 * 1. 默认值： minYear为当前年份， maxYear为当前年份  [当前年份, 当前年份]
			 * 2. 用户传了 minYear 但是没有传 maxYear  年份范围为 [minYear, minYear]
			 * 3. 用户传了 maxYear 但是没有传 minYear  年份范围为 [当前年份, maxYaer]
			 * 4. 用户传了 minYear 和 maxYear 年份范围为 [minYear, maxYear]
			 * 注意： 如果传递的 maxYear <= minYear 使用 1
			 */
			const fillAllYears = () => {
				if (!this.minYear && !this.maxYear) { // 1
					years.push(currentTimeInfo.current_year)
				} else if (this.minYear && !this.maxYear) { // 2
					years.push(this.minYear)
				} else if (!this.minYear && this.maxYear) { // 3
					if (this.maxYear <= currentTimeInfo.current_year) {
						years.push(currentTimeInfo.current_year)
					} else {
						for (let i = currentTimeInfo.current_year; i < Number(this.maxYear) + 1; i++) {
							years.push(i)
						}
					}
				} else if (this.minYear && this.maxYear) { // 4
					if (this.minYear > this.maxYear) {
						years.push(currentTimeInfo.current_year)
					} else {
						for (let i = this.minYear; i < Number(this.maxYear) + 1; i++) {
							years.push(Number(i))
						}
					}
				}
			}
			/**
			 * 填充月份
			 * 1. 填充 [1-12]
			 */
			const fillAllMonths = () => {
				for (let i = 1; i <= 12; i++) {
					months.push(i < 10 ? '0' + i : i)
				}
			}
			/**
			 * 填充日
			 * 1. 默认填充当前月份的天数
			 * 2. 根据用户选择的月份显示对应该月的天数
			 */
			const fillAllDays = (year, month) => {
				//最后一个参数为0,意为获取year年month月一共多少天
				let theMonthNums = new Date(year, month, 0).getDate();
				for (let i = 1; i <= theMonthNums; i++) {
					days.push(i < 10 ? '0' + i : i)
				}
			}
			/**
			 * 填充小时
			 */
			const fillAllTimes = () => {
				for (let i = 1; i <= 24; i++) {
					times.push(i < 10 ? '0' + i : i)
				}
			}
			/**
			 * 填充分钟
			 */
			const filleAllMinutes = () => {
				for (let i = 1; i <= 60; i++) {
					minutes.push(i < 10 ? '0' + i : i)
				}
			}
			
			
			let years = [] // 年份
			let months = [] // 月份
			let days = [] // 日
			let times = [] // 小时
			let minutes = [] // 分钟
			let currentTimeInfo = getCurrentTimeInfo()
			let pickerValueList_date = [0, 0, 0]
			let pickerValueList_time = [0, 0, 0, 0, 0]
			fillAllYears()
			fillAllMonths()
			fillAllDays(currentTimeInfo.current_year, currentTimeInfo.current_month)
			fillAllTimes()
			filleAllMinutes()
			
			years.forEach((item, index) => {
				if (item == currentTimeInfo.current_year) {
					pickerValueList_date[0] = index
					pickerValueList_time[0] = index
				}
			})
			
			months.forEach((item, index) => {
				if (item == currentTimeInfo.current_month) {
					pickerValueList_date[1] = index
					pickerValueList_time[1] = index
				}
			})
			
			days.forEach((item, index) => {
				if (item == currentTimeInfo.current_day) {
					pickerValueList_date[2] = index
					pickerValueList_time[2] = index
				}
			})
			
			times.forEach((item, index) => {
				if (item == currentTimeInfo.current_hours) {
					pickerValueList_time[3] = index
				}
			})
			
			minutes.forEach((item, index) => {
				if (item == currentTimeInfo.current_minutes) {
					pickerValueList_time[4] = index
				}
			})
			
			return {
				isDisplayPicker: false,
				maskClass: 'mask-box-disable',
				pickerClass: 'picker-box-bottom-disable',
				currentColumnIndex: [0],
				indicatorStyle: `height: 60px`,
				currentTimeInfo,
				years,
				months,
				days,
				times,
				minutes,
				pickerValueList_date,
				pickerValueList_time,
				displayPickerView: true, // 控制选择器的显示与隐藏
				selectDateInfo: {},
				selectTimeInfo: {},
				isSelect: false, // 是否选择过
				formatDate: "",
				formatTime: ""
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
			},
			_minYear() {
				if (!this.minYear) {
					return Number(this.currentTimeInfo.current_year)
				} else {
					return Number(this.minYear)
				}
			},
			_maxYear() {
				if (!this.maxYear) {
					return Number(this.currentTimeInfo.current_year)
				} else {
					return Number(this.maxYear)
				}
			}
		},
		created() {
			if(this.maxMonth) {
				this.months = []
				for(let i=0; i<=this.maxMonth; i++) {
					this.months.push(i < 10 ? '0' + i : i)
				}
				this.months.forEach((item, index) => {
					if (item == this.currentTimeInfo.current_month) {
						this.pickerValueList_date[1] = index
						this.pickerValueList_time[1] = index
					}
				})
			}
			if(this.maxDay) {
				this.days = []
				for(let i=0; i<=this.maxDay; i++) {
					this.days.push(i < 10 ? '0' + i : i)
				}
				this.days.forEach((item, index) => {
					if (item == this.currentTimeInfo.current_day) {
						this.pickerValueList_date[2] = index
						this.pickerValueList_time[2] = index
					}
				})
			}
			// console.log('currentTimeInfo', this.currentTimeInfo)
			// console.log('minYear', this.minYear)
			// console.log('maxYear', this.maxYear)
			// console.log('_minYear', this._minYear)
			// console.log('_maxYear', this._maxYear)
			// console.log('years', this.years)
			// console.log('months', this.months)
			// console.log('days', this.days)
			// console.log('pickerValueList_date', this.pickerValueList_date)
			// console.log('times', this.times)
			// console.log('minutes', this.minutes)
		},
		methods: {
			open() {
				this.isDisplayPicker = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.maskClass = 'mask-box-display'
						this.pickerClass = 'picker-box-bottom-display'
					}, 30)
				})
			},
			close() {
				this.pickerClass = 'picker-box-bottom-disable'
				this.maskClass = 'mask-box-disable'
				this.$nextTick(() => {
					setTimeout(() => {
						this.isDisplayPicker = false
					}, 300)
				})
			},
			oneColumnChange(e) {
				const currentOneColumnIndex = e.detail.value[0]
				this.currentColumnIndex[0] = currentOneColumnIndex
			},
			/**
			 * 选择日期时会触发
			 */
			pickerChange(e) {
				if (e.detail.value[1] != this.pickerValueList_date[1]) { // 代表改动的月份
					this.days = []
					//最后一个参数为0,意为获取year年month月一共多少天
					let theMonthNums = new Date(this.years[e.detail.value[0]], this.months[e.detail.value[1]], 0).getDate();
					for (let i = 1; i <= theMonthNums; i++) {
						this.days.push(i < 10 ? '0' + i : i)
					}
					// 强制刷新页面 要根据月份去显示多少天的数量 30天 31天
					this.$forceUpdate()
				}
			
				let pickerListsIndex = e.detail.value
				if (this.isShowCurrentDate) { // 日期
					this.pickerValueList_date = e.detail.value
					let selectDateInfo = {
						select_year: this.years[pickerListsIndex[0]],
						select_month: this.months[pickerListsIndex[1]],
						select_day: this.days[pickerListsIndex[2]],
						format_date: `${this.years[pickerListsIndex[0]]}-${this.months[pickerListsIndex[1]]}-${this.days[pickerListsIndex[2]]}`
					}
					this.selectDateInfo = selectDateInfo
				} else { // 时间
					this.pickerValueList_time = e.detail.value
					let selectTimeInfo = {
						select_year: this.years[pickerListsIndex[0]],
						select_month: this.months[pickerListsIndex[1]],
						select_day: this.days[pickerListsIndex[2]],
						select_time: this.times[pickerListsIndex[3]],
						select_minutes: this.minutes[pickerListsIndex[4]],
						format_time: `${this.years[pickerListsIndex[0]]}-${this.months[pickerListsIndex[1]]}-${this.days[pickerListsIndex[2]]} ${this.times[pickerListsIndex[3]]}:${this.minutes[pickerListsIndex[4]]}`
					}
					this.selectTimeInfo = selectTimeInfo
				}
			},
			/**
			 * 点击确定时触发
			 */
			confirm() {
				this.isSelect = true
				if (this.isShowCurrentDate) {
					if (Object.keys(this.selectDateInfo).length == 0) {
						this.formatDate = this.formateCurrentDate
						let obj = {
							select_year: this.currentTimeInfo.current_year,
							select_month: this.currentTimeInfo.current_month,
							select_day: this.currentTimeInfo.current_day,
							format_date: this.formateCurrentDate
						}
						this.$emit('currentChange', obj)
					} else {
						this.formatDate = this.selectDateInfo.format_date
						this.$emit('currentChange', this.selectDateInfo)
					}
				} else {
					if (Object.keys(this.selectTimeInfo).length == 0) {
						this.formatTime = this.formateCurrentTime
						let obj = {
							select_year: this.currentTimeInfo.current_year,
							select_month: this.currentTimeInfo.current_month,
							select_day: this.currentTimeInfo.current_day,
							select_time: this.currentTimeInfo.current_hours,
							select_mintues: this.currentTimeInfo.current_minutes,
							format_date: this.formateCurrentTime
						}
						this.$emit('currentChange', obj)
					} else {
						this.formatTime = this.selectTimeInfo.format_time
						this.$emit('currentChange', this.selectTimeInfo)
					}
				}
				
				this.close()
			}
		}
	}
</script>


<style lang="scss" scoped>
	.time-picker-box {
		// 遮罩层
		.mask-box {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
		}
		.mask-box-disable {
			opacity: 0;
			transition: all 0.2s linear;
		}	
		.mask-box-display {
			opacity: 1;
			transition: all 0.2s linear;
		}
		// 弹出层
		.picker-box {
			box-sizing: border-box;
			width: 100%;
			min-height: 600rpx;
			background: #FFFFFF;
			position: absolute;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			padding: 60rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.picker-box-bottom-disable {
			bottom: 0;
			opacity: 0;
			transform: translateY(100%);
			transition: all 0.2s linear;
		}

		.picker-box-bottom-display {
			bottom: 0;
			opacity: 1;
			transform: translateY(0%);
			transition: all 0.2s linear;
		}
	}
	
	.picker-header-box {
		position: relative;
		width: 100%;
		min-height: 50rpx;
		line-height: 50rpx;
		
		.left-close-btn {
			position: absolute;
			min-width: 40rpx;
			left: 0;
		}
		.right-close-btn {
			position: absolute;
			min-width: 40rpx;
			right: 0;
		}
		.picker-title {
			position: absolute;
			font-size: 34rpx;
			font-weight: bold;
			left:50%;
			transform: translateX(-50%);
		}
	}
	
	.picker-bottom-box {
		display: flex;
		align-items: center;
		justify-content: center;
			
		.confirm-btn {
			width: 260rpx;
			min-height: 80rpx;
			background: linear-gradient(to right, #54FF9F,#4EEE94);
			border-radius: 10rpx;
			border: 0;
			color: #FFF;
			letter-spacing: 2rpx;
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.picker-select-box {
		flex: 1;
		
		.one-column-item {
			text-align: center;
			line-height: 60px;
		}
	}
</style>
<style lang="scss" scoped>
	.time-picker-com-box {}


	.picker-view {
		height: 500rpx;
		flex: 1;
	}
	
	.picker-view-item {
		text-align: center;
		line-height: 60px;
		font-size: 16px;
	}
</style>