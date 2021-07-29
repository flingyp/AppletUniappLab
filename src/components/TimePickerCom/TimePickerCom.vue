<template>
	<view class="time-picker-com-box">
		<view class="current-time-text" @click="openDatePickerPopup">
			<text v-if="!isSelect">{{isShowCurrentDate?formateCurrentDate:formateCurrentTime}}</text>
			<text v-if="isSelect">{{isShowCurrentDate?formatDate:formatTime}}</text>
		</view>

		<uni-popup ref="timePicerPopup" type="bottom" :maskClick="maskClick">
			<view class="picker-view-box">
				<view class="picker-header-box">
					<view @click.stop="cancelDatePicerPopup">取消</view>
					<view>{{isShowCurrentDate?'选择日期': '选择时间'}}</view>
					<view @click.stop="confirmDate">确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="pickerValueList" class="picker-view" v-if="displayPickerView" @change="pickerChange">
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
			isShowCurrentDate: { // true代码选择日期 具体到day。 false代表选择时间 具体到 time
				type: Boolean,
				default: true
			},
			minYear: [Number, String],
			maxYear: [Number, String],
			maskClick: { // 禁用点击遮罩关闭
				type: Boolean,
				default: true
			}
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

			let years = []
			let months = []
			let days = []
			let currentTimeInfo = getCurrentTimeInfo()
			let pickerValueList = [0, 0, 0]
			fillAllYears()
			fillAllMonths()
			fillAllDays(currentTimeInfo.current_year, currentTimeInfo.current_month)
			
			years.forEach((item, index) => {
				if(item == currentTimeInfo.current_year) {
					pickerValueList[0] = index
				}
			})
			
			months.forEach((item, index) => {
				if(item == currentTimeInfo.current_month) {
					pickerValueList[1] = index
				}
			})
			
			days.forEach((item, index) => {
				if(item == currentTimeInfo.current_day) {
					pickerValueList[2] = index
				}
			})
			
			return {
				indicatorStyle: `height: 50px;`,
				currentTimeInfo,
				years,
				months,
				days,
				pickerValueList,
				displayPickerView: false,
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
			console.log('currentTimeInfo', this.currentTimeInfo)
			console.log('minYear', this.minYear)
			console.log('maxYear', this.maxYear)
			console.log('_minYear', this._minYear)
			console.log('_maxYear', this._maxYear)
			console.log('years', this.years)
			console.log('months', this.months)
			console.log('days', this.days)
			console.log('pickerValueList', this.pickerValueList)
		},
		mounted() {
		
		},
		methods: {
			/**
			 * 打开选择器弹出层
			 */
			openDatePickerPopup() {
				this.$refs.timePicerPopup.open()
				this.displayPickerView = true
			},
			/**
			 * 关闭选择器弹出层
			 */
			cancelDatePicerPopup() {
				this.$refs.timePicerPopup.close()
				setTimeout(() => {
					this.displayPickerView = false
				}, 500)
			},
			/**
			 * 选择日期时会触发
			 */
			pickerChange(e) {
				if(e.detail.value[1] != this.pickerValueList[1]) { // 代表改动的月份
					this.days = []
					//最后一个参数为0,意为获取year年month月一共多少天
					let theMonthNums = new Date(this.years[e.detail.value[0]], this.months[e.detail.value[1]], 0).getDate();	
					for (let i = 1; i <= theMonthNums; i++) {
						this.days.push(i < 10 ? '0' + i : i)
					}
					// 强制刷新页面 要根据月份去显示多少天的数量 30天 31天
					this.$forceUpdate()
				}
				this.pickerValueList = e.detail.value
				let pickerListsIndex = e.detail.value
				let selectDateInfo = {
					select_year: this.years[pickerListsIndex[0]],
					select_month: this.months[pickerListsIndex[1]],
					select_day: this.days[pickerListsIndex[2]],
					format_date: `${this.years[pickerListsIndex[0]]}-${this.months[pickerListsIndex[1]]}-${this.days[pickerListsIndex[2]]}`
				}
				this.selectDateInfo = selectDateInfo
			},
			/**
			 * 点击确定时触发
			 */
			confirmDate() {
				this.cancelDatePicerPopup()
				this.isSelect = true
				console.log('this.selectDateInfo',this.selectDateInfo)
				this.formatDate = this.selectDateInfo.format_date 
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

		&>.picker-view {
			height: 600rpx;
		}
	}

	.picker-header-box {
		min-height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 50rpx;
		border-bottom: 1px solid rgba(0, 0, 0, .1);

		&>view:nth-of-type(1) {
			color: #007aff;
		}

		&>view:nth-of-type(2) {
			color: rgba(0, 0, 0, .8);
		}

		&>view:nth-of-type(3) {
			color: #007aff;
		}
	}

	.picker-view-item {
		text-align: center;
		line-height: 50px;
	}
</style>
