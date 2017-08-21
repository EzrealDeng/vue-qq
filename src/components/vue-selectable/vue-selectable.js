export default (Vue, options = {}) =>{
	const listener = (ele, binding) =>{
		let reactArea = {
			startX: 0,
			startY: 0,
			endX: 0,
			endY: 0
		}
		//是否一直按下鼠标
		let isMouseDown = false
		let areaSelect = {}
		//将元素定位改为relative
		ele.style.position = 'relative'
		ele.addEventListener('mousedown', function(e) {
			reactArea.startX = e.layerX;
			reactArea.startY = e.layerY;
			isMouseDown = true
		})

		ele.addEventListener('mousemove', function(e) {
		 	if(isMouseDown){
		 		let preArea = ele.getElementsByClassName('v-selected-area')
				if(preArea.length){
					ele.removeChild(preArea[0])
				}
				reactArea.endX = e.layerX
				reactArea.endY = e.layerY
				let leftValue = 0
				let topValue = 0
				let widthValue = Math.abs(reactArea.startX - reactArea.endX)
				let heightValue =  Math.abs(reactArea.startY - reactArea.endY)

				if(reactArea.startX >= reactArea.endX){
					leftValue = reactArea.endX
				}else{
					leftValue = reactArea.startX
				}
				if(reactArea.startY > reactArea.endY ){
					topValue = reactArea.endY
				}else{
					topValue = reactArea.startY
				}

				//判断同时有宽高才开始画虚线框
				if(reactArea.startX != reactArea.endX && reactArea.startY !=reactArea.endY){
					areaSelect = document.createElement('div')
					areaSelect.classList.add("v-selected-area")
					areaSelect.style.position = "absolute";
					areaSelect.style.left = leftValue + 'px'
					areaSelect.style.top = topValue + 'px'
					areaSelect.style.width = widthValue + 'px'
					areaSelect.style.height = heightValue + 'px'
					areaSelect.style.border = "1px dashed grey"
					ele.append(areaSelect)
				}

				let children = ele.getElementsByTagName('li')
				for(let i =0 ; i < children.length ; i ++ ){
					let childrenHeight = children[i].getBoundingClientRect().height
					let childrenWidth = children[i].getBoundingClientRect().width
					//每个li元素的位置
					let offsetLeft = children[i].offsetLeft
					let offsetTop = children[i].offsetTop
					//每个li元素的宽高
					let endPositionH = childrenHeight + offsetTop
					let endPositionW = childrenWidth + offsetLeft
					//五个条件满足一个就可以判断被选择
					//一是右下角在选择区域内
					let require1 = endPositionH > topValue && endPositionW > leftValue && endPositionH < topValue + heightValue && endPositionW < leftValue + widthValue
					//二是左上角在选择区域内
					let require2 = offsetTop > topValue && offsetLeft > leftValue && offsetTop < topValue + heightValue && offsetLeft < leftValue + widthValue
					//三是右上角在选择区域内
					let require3 = offsetTop > topValue && offsetLeft + childrenWidth > leftValue && offsetTop < topValue + heightValue && offsetLeft + childrenWidth< leftValue + widthValue
					//四是左下角在选择区域内
					let require4 = offsetTop + childrenHeight > topValue && offsetLeft > leftValue && offsetTop + childrenHeight < topValue + heightValue && offsetLeft < leftValue + widthValue
					//五选择区域在元素体内
					let require5 = offsetTop < topValue && offsetLeft < leftValue && offsetTop + childrenHeight > topValue + heightValue && offsetLeft + childrenWidth > leftValue + widthValue

					if(require1 || require2 || require3 || require4 || require5){
						children[i].classList.add('active')
					}else{
						children[i].classList.remove('active')
					}
				}
		 	}
		})

		ele.addEventListener('mouseup', function(e) {
			isMouseDown = false
			if(areaSelect && areaSelect.childNodes && ele.contains(areaSelect)){
				ele.removeChild(areaSelect)
			}
			areaSelect = null
		})
	}

	 Vue.directive('selectable',{
        inserted:listener,
        updated:listener
    })
}