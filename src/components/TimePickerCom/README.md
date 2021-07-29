1. 获取当前相关时间信息

```javascript
currentTimeInfo: {
	current_year: "年",
	current_month: "月",
	current_day: "日",
	current_hours: "小时",
	current_minutes: "分钟"
}
```

2. 引入该组件的，默认显示当前日期 年-月-日 (可以通过传递参数 :isShowCurrentDate="false" 来显示当前时间)

3. 使用uniPopup组件

4. 选择年份应该是要有范围的 [minYear最小年份, maxYear最大年份]                  
	1. 默认值： minYear为当前年份， maxYear为当前年份
	2. 传了 minYear 但是没有传 maxYear  年份范围为 [minYear, minYear]
	3. 传了 maxYear 但是没有传 minYear  年份范围为 [当前年份, maxYaer]
	4. 传了 minYear 和 maxYear 年份范围为 [minYear, maxYear]
	5. 注意： 如果传递的 maxYear <= minYear 使用 1

(uniapp的 picker-view组件设置 value的初始值有问题 暂时不能根据 minYear， maxYear 来选定默认的年份) [文章](https://www.cnblogs.com/ishoulgodo/p/13669685.html)

解决方法： 根据v-if改变dom结构的特性，手动使 picker-view组件 重新创建

5. 选择月份 [01, 12] 没有限制范围

6. 选择日 要根据月份去显示多少天的数量 30天 31天

7. 点击事件选择器的确定返回相关数据内容

```javascript
selectDateInfo: {
	select_year: "年",
	select_month: "月"，
	select_day: "日",
	format_date: `YYYY-DD-MM` 
}
```

```javascript
selectTimeInfo: {
	select_year: "年",
	select_month: "月"，
	select_day: "日",
	format_time: `YYYY-DD-MM` 
}
```
