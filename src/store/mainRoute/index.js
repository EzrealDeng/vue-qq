const mainRoute = {
	state: {
		curPage : 'message',
		title: '消息'
	},
	mutations: {
		switchPage(state, newPage){
			state.curPage = newPage.name,
			state.title = newPage.title
		}
	}
}

export default mainRoute