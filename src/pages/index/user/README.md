## 用户登录

1. 获取 用户登录凭证code
2. 后台需要在开发者服务器后台，通过使用前端 code 换取 openid 和 session_key 等信息 封装用户accessToken 返回至前端
3. 前端需要 保存用户的openid、accessToken等（后台可以获取到的相关信息）	

## 获取用户信息

**uni.getUserInfo(OBJECT)**

注意： 微信小程序端，在用户未授权过的情况下调用此接口，不会出现授权弹窗，会直接进入 fail 回调（详见《微信小程序公告》）
在用户已授权的情况下调用此接口，可成功获取用户信息。

**微信基础库2.10.4版本**对用户信息相关接口进行了调整，使用 uni.getUserInfo 获取得到的 **userInfo 为匿名数据，**
**建议使用 uni.getUserProfile 获取用户信息。**


**uni.getUserProfile(OBJECT)**

获取用户信息。每次请求都会弹出授权窗口，用户同意后返回 userInfo

注意： 该API仅支持微信小程序端，微信小程序调整了相关接口（详见《小程序登录、用户信息相关接口调整说明》）。
**每次触发 uni.getUserProfile 均会弹出授权窗口，用户授权后可成功获取用户信息。**
该API暂不支持在事件中使用异步操作，否则会触发错误：{errMsg: "getUserProfile:fail can only be invoked by user TAP gesture."}

```
新增getUserProfile接口

若开发者需要获取用户的个人信息（头像、昵称、性别与地区），可以通过wx.getUserProfile接口进行获取，
该接口从基础库2.10.4版本开始支持，该接口只返回用户个人信息，不包含用户身份标识符。该接口中desc属性（声明获取用户个人信息后的用途）后续会展示在弹窗中，请开发者谨慎填写。
开发者每次通过该接口获取用户个人信息均需用户确认，请开发者妥善保管用户快速填写的头像昵称，避免重复弹窗。
```

最佳实践
调整后，开发者如需获取用户身份标识符只需要调用wx.login接口即可。

开发者若需要在界面中展示用户的头像昵称信息，可以通过<open-data>组件进行渲染，该组件无需用户确认，可以在界面中直接展示。

在部分场景（如社交类小程序）中，开发者需要在获取用户的头像昵称信息，可调用wx.getUserProfile接口，开发者每次通过该接口均需用户确认，请开发者妥善处理调用接口的时机，避免过度弹出弹窗骚扰用户。
​	
**2.10.4 之后的版本uni.getUserInfo(OBJECT)默认是授权的可以直接调通，2.10.4之前的版本 依然是需要授权的，才可以调通。但是获取到的不是匿名信息**
**2.10.4 之后的版本才支持 uni.getUserProfile(OBJECT)， 2.10.4之前的版本 没有该方法 会报错**
​	

## 通过 open-data 展示用户基本信息

```
<!-- open-data的使用 如果只是简单的展示用户信息可以使用 不可以给open-data设置样式 https://developers.weixin.qq.com/community/develop/article/doc/00088683b8c528815c59c62d656013 -->
<open-data type="userNickName"></open-data>
<view class="openDataAvatarUrl">
	<open-data type="userAvatarUrl"></open-data>
</view>
<open-data type="userGender" lang="zh_CN"></open-data>
```