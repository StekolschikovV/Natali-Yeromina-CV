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










