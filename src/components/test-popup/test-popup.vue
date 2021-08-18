<template>
	<view v-if="showHello" :class="['cover', ani]" @tap.stop="show(false)">
		<view :class="['bg', 'translateCenter', ani]" @tap.stop="clear">
			<view class="title">
				{{title}}
			</view>
			<view class="content">
				<slot />
			</view>
			<view class="btn" >
				<button class="btn-item" type="default" @tap="show(false)">取消</button>
				<button class="btn-item" type="primary" @tap="confirm">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "testPopup",
		props: {
			title: {
				type: String,
				default: 'title',
			},
		},
		watch: {
			title(newValue, oldValue) {
				console.log('title:', newValue, oldValue)
			},
		},
		created(e) {},
		data(){
			return {
				showHello: false,
				ani: '',
			}
		},
		methods: {
			show(b){
				if(b){
					this.showHello = true
					this.$nextTick(() => {
						setTimeout(() => {
							this.ani = 'ani'
						}, 30)
					})
				}else{
					this.ani = ''
					this.$nextTick(() => {
						setTimeout(() => {
							this.showHello = false
						}, 300)
					})
				}
			},
			clear(){},
			confirm(){
				this.$emit('confirm')
			},
		},
	}
</script>

<style>
@charset "UTF-8";

*{margin:0;padding:0}
.translateCenter{ position: absolute; left:50%; top:50%; transform:translate(-50%,-50%); }
.cover{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, .4);
	opacity: 0;
	transition: all 2s;
}
.cover.ani{
	opacity: 1;
}
.bg{
	max-height: 3%;
	width: 3%;
	opacity: 0;

	transition: all .3s;
}
.bg.ani{
	max-height: 80%;
	width: 80%;
	opacity: 1;

	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;

	border-radius: 16upx;
	padding: 24upx 24upx;
	overflow: hidden;
}
.content{
	width: 100%;
	max-height: 80%;
	overflow:auto;
}
.title{
	text-align: center;
	font-size: 38upx;
}
.btn{
	display: flex;
	flex-direction: row;
	justify-content: center;

	align-items: center;
	align-content: center;

	vertical-align: middle;
	margin-top: 40upx;
	margin-bottom: 20upx;
	/* background-color: #00CE47; */
}
.btn.btn-item{
	flex: auto;
	max-width: 40%;
}
</style>