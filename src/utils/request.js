import Vue from 'vue'

/**
 * ajax封装
 * 1. 根据微信小程序环境切换不同的接口地址
 * 2. 对请求成功数据进入拦截，统一进行一遍处理
 * 3. 对不同的请求 code 状态码做出响应
 * 4. 是否显示可控式请求 loading 动画，同时支持扩展自定义 loading 文字提示
 * 5. 是否携带 accessToken
 */

// 根据微信小程序环境切换不同的接口地址
// develop 开发版  trial 体验版 release 正式版
const currentAppVersion = () => {
	const accountInfo = uni.getAccountInfoSync();
	if (accountInfo.miniProgram.envVersion === 'develop') { // 开发版
		return 'develop'
	} else if (accountInfo.miniProgram.envVersion === 'trial') { // 体验版
		return 'trial'
	} else if (accountInfo.miniProgram.envVersion === 'release') { // 正式版
		return 'release'
	}
}

const appVersion = currentAppVersion()
let baseUrl = ''
if (appVersion === 'develop') { // 开发版
	baseUrl = 'https://api.github.com'
} else if (appVersion === 'trial') { // 体验版
	baseUrl = ''
} else if (appVersion === 'release') { // 正式版
	baseUrl = ''
} else { // 其它
	baseUrl = ''
}


/**
 * request 请求方法
 * @param {Object} 
 * 	url: '接口地址',
 *  method: '请求方法',
 *  data: '携带的参数',
 *  isLoading: '是否显示可控式请求 loading 动画',
 *  loadingTitle: '自定义 loading 文字提示',
 *  needToken: '是否需要携带accessToken',
 *  contentType
 */

// 对于 GET 方法，会将数据转换为 query string。例如 { name: 'name', age: 18 } 转换后的结果是 name=name&age=18。
// 对于 POST 方法且 header['content-type'] 为 application/json 的数据，会进行 JSON 序列化。
// 对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换为 query string。
const request = option => {
	const {
		url = '',
		method = 'GET',
		data = {},
		isLoading = false,
		loadingTitle = '加载中...',
		needToken = true,
		contentType = 'application/x-www-form-urlencoded'
	} = option
	// console.log('请求相关参数option->', option)
	
	// 处理 url
	let requestUrl = ''
	const httpExpressionExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
	if (url === '') { // 没有传 url
		uni.showToast({
			icon: 'none',
			title: '接口地址为空',
			mask: true
		})
		return
	} else if (httpExpressionExp.test(url)) { // url 传递的是一个完整的链接
		requestUrl = url
	} else { // 接口地址前缀 + 接口地址
		requestUrl = baseUrl + url
	}
	
    // 处理请求头
	let headers = {}
	let accessToken = uni.getStorageSync('accessToken')
	needToken ? headers['accessToken'] = accessToken : ''
	contentType ? headers['content-type'] = contentType : headers['content-type'] =
		'application/x-www-form-urlencoded'
		
	// 是否显示可控式请求 loading 动画
	if (isLoading) {
		uni.showLoading({
			title: loadingTitle || '加载中...',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: requestUrl,
			method: method,
			data: data,
			header: headers,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {
				setTimeout(() => {
					uni.hideLoading()
				},500)
			}
		})
	})
}

export {
	request
};
