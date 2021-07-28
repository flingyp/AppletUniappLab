import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const gopage = (url, type) => {
	if (url) {
		if (type === "redirectTo") {
			uni.redirectTo({
				url: url
			});
		} else if (type === "reLaunch") {
			uni.reLaunch({
				url: url
			});
		} else if (type === "switchTab") {
			uni.switchTab({
				url: url
			});
		}else {
			uni.navigateTo({
				url: url
			});
		}
	} else {
		uni.showToast({
			title: '正在开发中',
			duration: 1000,
			icon: 'none'
		})
	}
}
Vue.prototype.gopage = gopage;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
