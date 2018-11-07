
class vSlider {

    constructor(pram) {
        if(this.parameterCheck(pram)){

        }
    }

    parameterCheck(pram){
        let res = true
        if(!pram.selector){
            this.log(0)
            res = false
        } else if(document.querySelectorAll(pram.selector).length == 0){
            this.log(1)
            res = false
        }
            
        return res
    }

    log(code){
        if(code == 0){
            console.error('vSlider error: Missing parameter selector!')
        } else if(code == 1) {
            console.error('vSlider error: Elements do not exist!')
        }
    }

}
new vSlider({ 
    selector: '.strength-p .skills-slider img',
    param1: 70, 
    param2: 175
})