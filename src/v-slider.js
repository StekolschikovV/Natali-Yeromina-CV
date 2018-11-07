
  

class vSlider {

    constructor(param) {
        window.onload =()=>{
            this.paddingLeftDef = 10
            this.paddingTopDef = 10
       
            this.animateListIndex = 0
    
            this.imgs
            this.parent
    
            this.param = param
    
            if(this.parameterCheck()){
    
           
    
                this.getSelectors()
                this.setSizeAndPosition()
                this.animate(this.imgs[this.imgs.length - 1], 150, 10, 90)
    
                console.log(this.imgs[this.imgs.length - 1].clientWidth)
                this.animateList = [
                    {
                        selector: this.imgs[this.imgs.length - 1],
                        posLeft: this.imgs[this.imgs.length - 1].clientWidth,
                        posTop: 10,
                        posY: 100,
                        zIndex: this.imgs.length
                    },

                    {
                        selector: this.imgs[this.imgs.length - 1],
                        posLeft: this.imgs[this.imgs.length - 1].clientWidth,
                        posTop: 10,
                        posY: 100,
                        zIndex: 0
                    },
                    {
                        selector: this.imgs[this.imgs.length - 1],
                        posLeft: 0,
                        posTop: 10,
                        posY: 180,
                        zIndex: 0
                    },
                    {
                        selector: this.imgs[this.imgs.length - 1],
                        posLeft: `-${this.imgs[this.imgs.length - 1].clientWidth}`,
                        posTop: 10,
                        posY: 180,
                        zIndex: 0
                    },
                    {
                        selector: this.imgs[this.imgs.length - 1],
                        posLeft: `-${this.imgs[this.imgs.length - 1].clientWidth}`,
                        posTop: 10,
                        posY: 180,
                        zIndex: this.imgs.length
                    },
                ]
    
                  this.lineAnimate()
            }
        }

    }

    lineAnimate(){
        let step = this.animateList[this.animateListIndex]
        console.log(this.animateListIndex)
        this.animate(step.selector, step.posLeft, step.posTop, step.posY, step.zIndex)
        setTimeout(()=>{
            this.lineAnimate()
            this.animateListIndex++
            if(this.animateListIndex > this.imgs.length - 1){
                this.animateListIndex = 0
            }
        },1000)
    }

    animate(el, posLeft, posTop, posY, zIndex){
        // console.log(zIndex)
        el.style.left = `${posLeft}px`
        el.style.top = `${posTop}px`
        el.style.zIndex = zIndex
        el.style.transform = `rotateY(${posY}deg)`
    }

    setSizeAndPosition(){
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
            this.imgs[i].style.transition = '1s'
            this.imgs[i].style.zIndex = i
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