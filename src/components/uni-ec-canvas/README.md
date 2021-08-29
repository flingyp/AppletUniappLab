ECharts 提供了原生微信小程序的 使用ECharts的方法： https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts

但是没有提供uniapp的方法
 
可以拷贝 echarts官方提供的 echarts-for-weixin 代码看下可以看到 具体的就三个文件： echarts.js 、 wx-canvas.js 和 ec-canvs组件(js、json、wxml、wxss)， 我们可以把ec-canvs改成 ec-canvs.vue 组件 稍微调整下就可以在uniapp中使用

当然这个事情也有人做了 在 插件市场上：https://ext.dcloud.net.cn/plugin?id=1538  

拷贝这个插件的 ec-canvs.vue 和 wx-canvas.js文件

至于 echarts.js， 我们知道小程序上传发布版本 项目文件大小不能大于 2MB (2048KB)，但是一个 echarts.js可以就高于两MB了

方法一： 下载echarts.min.js 压缩版的

方法二（推荐）：[定制化](https://echarts.apache.org/zh/download.html) 选择在线定制。在手机上 我们能用到的图表不是很多，我们可以先定制我们需要用到的图表。这样文件的大小会比 压缩版的还小点