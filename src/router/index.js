import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Message from '@/components/Message/Message'
import PullRefresh from '@/components/PullRefresh/PullRefresh'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/message',
    	name: 'Message',
    	component: Message
    },
    {
    	path: '/contacts',
    	name: 'Contacts',
    	component: PullRefresh
    }
  ]
})
