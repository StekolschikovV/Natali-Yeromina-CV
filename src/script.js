let toggleModal = (page) => {

    let selector = document.querySelector(page)
    let isSelectorShow = selector.classList.contains('show')

    if(!selector.classList.contains('show')){
        selector.classList.toggle('display-block')
        setTimeout(()=>{
            selector.classList.toggle('show')
        },0)
    } else {
        selector.classList.toggle('show')
        setTimeout(()=>{
            selector.classList.toggle('display-block')
        },500)
    }
}

let titleText = (type, text) => {
    console.log(text)
    document.querySelector('.h1-title').innerHTML = text
    let textName = "I'm\n Natali Yeromina"
    // let textName = "ina"
    // let textWork = "gn"
    let textWork = "I'm\n Graphic Design"
    setTimeout(()=>{
        if(type == true && text.length < textName.length){
            titleText(true, text + textName[text.length])
        } else if(type == true && text.length >= textName.length){
            titleText(false, '')
        } else if(type == false && text.length < textWork.length){
            titleText(false, text + textWork[text.length])
        } else {
            titleText(true, '')
        }

    }, 300)
}

titleText(true, '')










