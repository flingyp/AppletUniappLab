<template>
	<view>
		<button type="primary" @click="uniLogin">uni.login</button>

		<button type="primary" @click="getUserWxVersion">获取当前微信版本</button>

		<button type="primary" @click="uniUserInfo">获取用户信息getUserInfo</button>

		<button type="primary" @click="uniUserProfile">获取用户信息getUserProfile</button>

		<button type="primary" @click="uniUserInfo_all">用户信息兼容上面两个</button>

		<!-- open-data的使用 如果只是简单的展示用户信息可以使用 不可以给open-data设置样式 https://developers.weixin.qq.com/community/develop/article/doc/00088683b8c528815c59c62d656013 -->
		<open-data type="userNickName"></open-data>
		<view class="openDataAvatarUrl">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<open-data type="userGender" lang="zh_CN"></open-data>

		<test-popup ref="testPopup">
			<button type="primary" open-type="getUserInfo" @getuserinfo="setUserAuth">进行授权登录</button>
		</test-popup>

		<button type="primary" @click="getUserLocation">获取用户位置</button>
		<button type="primary" @click="selectLocation">选择位置</button>
	</view>
</template>

<script>
	import testPopup from '@/components/test-popup/test-popup.vue'
	export default {
		components: {
			testPopup
		},
		data() {
			return {
				SDKVersion: undefined
			}
		},
		methods: {
			async uniLogin() {
				let code = await this.getUserCode()
				console.log('用户登录凭证code:', code)
			},
			async uniUserInfo(language) {
				// 1. 验证用户有没有授权
				uni.getSetting({
					success: async res => {
						if (res.errMsg === "getSetting:ok") {
							if (res.authSetting['scope.userInfo']) { // 授权
								console.log('授权了')
								// 2. 授权了 就可以获取用户信息
								await this.getUserInfo(language)
							} else { // 没有授权
								console.log('没有授权')
								// 2. 没有授权 让用户授权 弹出 授权按钮
								this.$refs.testPopup.open()
							}
						}
					},
					fail: err => {
						console.log('uni.getSetting进入失败回到', err)
					}
				})
			},
			async uniUserProfile(language) {
				await this.getUserProfile(language)
			},
			async uniUserInfo_all() {
				const language = uni.getSystemInfoSync().language
				const SDKVersion = await this.getUserWxVersion()
				const compare_version = await this.compareVersion(SDKVersion, "2.10.4")
				console.log('compare_version:', compare_version)
				if (compare_version === 1 || compare_version === 0) { // >= 2.10.4 
					this.uniUserProfile(language)
				} else { // < 2.10.4
					this.uniUserInfo(language)
				}
			},
			async getUserWxVersion() {
				const SDKVersion = uni.getSystemInfoSync().SDKVersion;
				this.SDKVersion = SDKVersion
				console.log('SDKVersion:', SDKVersion)
				return SDKVersion
			},
			/**
			 * 获取 用户登录凭证code
			 */
			getUserCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						success: res => {
							if (res.errMsg === "login:ok") {
								resolve(res.code)
							} else {
								resolve('')
							}
						},
						fail: err => {
							console.log("uni.login() 进入fail回调")
							uni.showToast({
								title: '登录失败:',
								mask: true,
								icon: 'none'
							})
							reject(err)
						}
					})
				})
			},
			getUserInfo(language) {
				uni.getUserInfo({
					lang: language,
					success: res => {
						console.log('res', res)
					},
					fail: err => {
						console.log('进入uni.getUserInfo失败回调', err)
					}
				})
			},
			/**
			 * 通过 uni.getUserProfile 获取用户信息
			 */
			async getUserProfile(language) {
				uni.getUserProfile({
					desc: '获取用户基本信息',
					lang: language,
					success: res => {
						console.log('res', res)
					},
					fail: err => {
						console.log('err', err)
						if (err.errMsg === "getUserProfile:fail auth deny") {
							// 提醒用户 小程序需要用户授权
							uni.showToast({
								title: '提醒用户 小程序需要用户授权',
								icon: 'none',
								mask: true
							})
						}
					}
				})
			},
			/**
			 * @param {Object} v1
			 * @param {Object} v2
			 * @return -1 || 0 || 1
			 * 		-1 v1 < v2 （当前版本 < 你输入的版本）
			 * 		0  v1 = v2  (当前版本 = 你输入的版本)
			 * 		1  v1 > v2  (当前版本 > 你输入的版本)
			 */
			async compareVersion(v1, v2) {
				v1 = v1.split(".");
				v2 = v2.split(".");
				const len = Math.max(v1.length, v2.length);

				while (v1.length < len) {
					v1.push("0");
				}
				while (v2.length < len) {
					v2.push("0");
				}

				for (let i = 0; i < len; i++) {
					const num1 = parseInt(v1[i]);
					const num2 = parseInt(v2[i]);

					if (num1 > num2) {
						return 1;
					} else if (num1 < num2) {
						return -1;
					}
				}
				return 0;
			},
			async setUserAuth(res) {
				console.log('111111', res)
				let userInfo = {}
				if (res.detail.errMsg === "getUserInfo:ok") { // 允许授权
					userInfo = res.detail
				} else if (res.detail.errMsg === "getUserInfo:fail auth deny") { // 拒绝
					// 提醒用户 小程序需要用户授权
					uni.showToast({
						title: '提醒用户 小程序需要用户授权',
						icon: 'none',
						mask: true
					})
					userInfo = {}
				}
				this.$refs.testPopup.close()
				return userInfo
			},
			getUserLocation() {
				uni.getLocation({
					success: res => {
						console.log('uni.getLocation返回的结果：', res)
					}
				})
			},
			selectLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log('uni.getLocation返回的结果：', res)
						let {
							latitude,
							longitude
						} = res
						uni.chooseLocation({
							latitude,
							longitude,
							success: res => {
								console.log('uni.chooseLocation返回的结果：', res)
							},
							fail: err => {
								console.log('uni.chooseLocation失败的结果：', err)
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	button {
		width: 50%;
		margin-bottom: 20rpx;
	}

	.openDataAvatarUrl {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
