<template>
  <div id="app" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <section class="side-section" :class="isSideShow ? 'side-show' : 'side-hide'">
      <SideBar></SideBar>
    </section>
    <section class="main-section" :class="isSideShow ? 'main-move' : 'main-no-move'">
      <header>
        <div class="header-img" @click="toggleSide">
          <img src="http://img2.imgtn.bdimg.com/it/u=639952571,3333566630&fm=214&gp=0.jpg" alt="">
        </div>
        <div>
         <span>{{this.$store.state.mainRoute.title}}</span> 
        </div>
        <div>
          <span><Icon type="plus-round"></Icon></span>
        </div>
      </header>
      <div class="main-view">
        <router-view></router-view>
      </div>
      <footer class="footer">
        <ul>
          <li :class="{selected: this.$store.state.mainRoute.curPage === 'message'}" @click="changePage('message','消息')"> 
            <div>
              <Icon type="chatbubbles" size='30'></Icon>
            </div> 
            <span>消息</span>
          </li>
          <li :class="{selected: this.$store.state.mainRoute.curPage === 'contacts'}" @click="changePage('contacts', '联系人')">
            <div>
              <Icon type="person-stalker" size='30'></Icon>
            </div>
            <span>联系人</span></li>
          <li :class="{selected: this.$store.state.mainRoute.curPage === 'info'}" @click="changePage('info', '动态')">
            <div>
              <Icon type="android-star" size='30'></Icon>
            </div>
            <span>动态</span>
          </li>
        </ul>
      </footer>
    </section>
    <section class="modal" v-show="isSideShow">
      
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'Vuex'
import SideBar from '@/components/SideBar/SideBar.vue'

export default {
  name: 'app',
  data(){
    return {
      isSideShow: false,
      touchMoveDisX: 0,
      touchMoveDisY: 0,
      touchstartX: 0,
      touchstartY: 0,
    }
  },
  methods: {
    ...mapMutations([
      'switchPage'
    ]),
    changePage: function(newPage,title){
      this.$router.replace(newPage)
      this.switchPage({
        name: newPage,
        title: title
      })
    },
    toggleSide: function(){
      this.isSideShow = !this.isSideShow
    },
    touchstart: function(e){
      this.touchstartX = e.changedTouches[0].clientX
      this.touchstartY = e.changedTouches[0].clientY
    },
    touchmove: function(e){
    },
    touchend: function(e){
      this.touchMoveDisX = e.changedTouches[0].clientX - this.touchstartX
      this.touchMoveDisY = e.changedTouches[0].clientY - this.touchstartY
      //左滑右滑超过一定距离后再开始显示或不显示
      if(this.touchMoveDisX > 30 && Math.abs(this.touchMoveDisX) > Math.abs(this.touchMoveDisY)){
        this.isSideShow = true
      }else if(this.touchMoveDisX < -30 && Math.abs(this.touchMoveDisX) > Math.abs(this.touchMoveDisY)){
         this.isSideShow = false
      }
    }
  },
  mounted: function(){
    this.changePage('message','消息')
  },
  components: {
    SideBar
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.side-section{
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 80%;
  background: grey;
}
ul, li {
  list-style: none;
}
.footer{
  position: fixed;
  height: 60px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  padding-top: 8px;
}
.footer ul{
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  text-align: center;
}
.footer ul li.selected{
  color: deepskyblue;
}
.main-view{
  position: absolute;
  top: 60px;
  bottom: 60px;
  overflow: auto;
  width: 100%;
}
.mint-loadmore-top{
  margin-top: -16px;
}
header{
  background-color: #2d78f4;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 10px;
}
header span{
  line-height: 60px;
  color: #fff;
  font-size: 18px;
}
.header-img img{
  width: 50px;
  padding-top: 5px;
  border-radius: 50% 50%;
  overflow: hidden;
}

.main-section{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.side-hide{
  animation: side-hide 0.5s;
  animation-fill-mode: forwards;
}
.side-show{
  animation: side-show 0.5s;
  animation-fill-mode: forwards;
}
.main-move{
  animation: main-move 0.5s;
  animation-fill-mode: forwards;
}
.main-no-move{
  animation: main-no-move 0.5s;
  animation-fill-mode: forwards;
}
@keyframes side-hide{
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes side-show{
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes main-move{
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(80%);
    opacity: 0.5;
  }
}
@keyframes main-no-move{
  from {
    transform: translateX(80%);
  }
  to {
    transform: translateX(0%);
  }
}
.modal{
  position: absolute;
  top: 0;
  bottom: 0;
  left:0;
  right: 0;
  z-index: 1;
  background-color: rgba(128, 128, 128 , 0.5);
}
</style>
