
class vSlider {

    constructor(param) {
        this.paddingLeftDef = 10
        this.paddingTopDef = 10

        this.imgs
        this.parent

        this.param = param

        if(this.parameterCheck()){
            this.getSelectors()
            this.setSizeAndPosition()
        }
    }

    setSizeAndPosition(){
        console.log(this.parent.offsetWidth)
        console.log(this.parent.offsetHeight)
     
        let imgWidth = 0
        for(let i = 0; i < this.imgs.length; i++){
            let parentWidth = this.parent.offsetWidth
            let imgClientWidth = this.imgs[i].clientWidth
            if(imgClientWidth > 0)
                imgWidth = imgClientWidth
            this.imgs[i].style.width = parentWidth - (this.param.paddingLeft * this.imgs.length)
            this.imgs[i].style.left = `${(this.param.paddingLeft * i) + (imgWidth > 0 ? (parentWidth - imgWidth) / 2 : 0) }px`
            this.imgs[i].style.bottom = `${this.param.paddingLeft * i}px`
            this.imgs[i].style.position = 'absolute'
            console.log(this.param.paddingLeft * i)
        }
        this.parent.style.position = 'relative'
        this.parent.style.height = `${this.imgs[0].offsetHeight + (this.param.paddingLeft * (this.imgs.length - 1))}px`

        this.parent.style.background = 'red'
    }

    getSelectors(){
        this.imgs = document.querySelectorAll(this.param.selector)
        this.parent = document.querySelector(this.param.selector).parentNode
    }

    parameterCheck(){
        let res = true
        if(!this.param.selector){
            this.log(0)
            res = false
        } 
        if(document.querySelectorAll(this.param.selector).length == 0){
            this.log(1)
            res = false
        }

        if(this.param.debugger){
          
            if(!this.param.paddingTop){
                this.log(101)
                this.param.paddingTop = this.paddingTopDef
            } 
            if (!this.param.paddingLeft){
                this.log(102)
                this.param.paddingLeft = this.paddingLeftDef
            }
        }
            
        return res
    }

    log(code){
        if(code == 0){
            console.error('vSlider error: Missing parameter selector!')
        }  
        if(code == 1) {
            console.error('vSlider error: Elements do not exist!')
        }

        if(code == '101' || code == '102'){
            console.warn('vSlider error: Not indented. This will set the default indent.')
        }
    }

}
new vSlider({ 
    selector: '.strength-p .skills-slider img',
    debugger: true, 
    paddingTop: 10,
    paddingLeft: 10,
  
})