<template>
	<div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<div v-for="(item, index) in msgList" :key='item.id' style="position:relative">
			<Row class="message-item" :class-name="item.isShowMsgTool ? 'msg-move' : 'msg-no-move'">
				<Col span="4" >
					<img :src="item.imgUrl" alt="" class="user-header">
				</Col>
				<Col span="17"> 
					<div class="message-part" @touchstart="touchstart($event,index)" @touchend="touchend">
						<div class="user-name">
							{{item.name}}
						</div>
						<div class="user-message">
							{{item.lastMessage}}
						</div>
					</div>
				</Col>
				<div class="message-time"><span >{{item.lastTime}}</span></div>
			</Row>
			<div class="qq-msg-tool" :class="item.isShowMsgTool ? 'tool-show' : 'tool-hide'">
					<span class="bg-org">置顶</span>
					<span class="bg-skyblu">未读</span>
				</div>
		</div>
      
    </mt-loadmore>
	</div>
</template>

<script>
import messageList from '@/data/messageList'
import { Loadmore } from 'mint-ui';
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore);
export default {
	data() {
		return {
			msgList: [],
			allLoaded: false,
			touchstartX: 0,
			touchstartY: 0,
			touchMoveDisX: 0,
			touchMoveDisY: 0,
			touchIndex: '' //点击的消息index
		}
	},
	mounted: function(){
		this.msgList = messageList
	},
	methods: {
		loadTop(){
			this.msgList[0].lastMessage = '到公司没有啊，再不来扣工资啊'
			this.$refs.loadmore.onTopLoaded();
		},
		loadBottom(){
			this.msgList.push({
				id: '000004',
				imgUrl: 'http://img1.imgtn.bdimg.com/it/u=4165490297,2822026681&fm=214&gp=0.jpg',
				name: '张三1',
				lastMessage: '阳光明媚，春光灿烂',
				lastTime: '2017-08-04'
			})
			//this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
		},
		touchstart(e,id){
			this.touchstartX = e.changedTouches[0].clientX;
			this.touchstartY = e.changedTouches[0].clientY;
			this.touchIndex = id
		},
		touchend(e){
			this.touchMoveDisX = e.changedTouches[0].clientX - this.touchstartX
      this.touchMoveDisY = e.changedTouches[0].clientY - this.touchstartY

      //左滑右滑超过一定距离后再开始显示或不显示
      if(this.touchMoveDisX > 30 && Math.abs(this.touchMoveDisX) > Math.abs(this.touchMoveDisY)){
        if(this.msgList[this.touchIndex].isShowMsgTool){
					this.msgList[this.touchIndex].isShowMsgTool = false
					e.stopPropagation()
        }
      }else if(this.touchMoveDisX < -30 && Math.abs(this.touchMoveDisX) > Math.abs(this.touchMoveDisY)){
      	 if(!this.msgList[this.touchIndex].isShowMsgTool){
						this.msgList[this.touchIndex].isShowMsgTool = true
						e.stopPropagation()
      	 }
      }

      for(let i=0 ; i< this.msgList.length; i ++){
      	if(i != this.touchIndex){
      		this.msgList[i].isShowMsgTool = false;
      	}
      }
		}
	}
}
</script>

<style scoped>
	@import './Message.css'
</style>