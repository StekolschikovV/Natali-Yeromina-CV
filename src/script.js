let toggleModal = (page) => {

    let selector = document.querySelector(page)
    let isSelectorShow = selector.classList.contains('show')

    navZIndex(isSelectorShow)

    if (!selector.classList.contains('show')) {
        selector.classList.toggle('display-block')
        setTimeout(() => {
            selector.classList.toggle('show')
        }, 0)
    } else {
        selector.classList.toggle('show')
        setTimeout(() => {
            selector.classList.toggle('display-block')
        }, 500)
    }

}

let navZIndex = (status) => {
    document.querySelectorAll('nav a').forEach((e) => {
        if (status) {

            setTimeout(() => {
                e.style.zIndex = 9
                e.style.transition = '.5s'
            }, 500)
        }
        else {
            e.style.zIndex = 0
            e.style.transition = '0s'
        }
    })
}

let titleText = (type, text) => {
    document.querySelector('.h1-title').innerHTML = text
    let textName = "I'm\n Natali Yeromina"
    let textWork = "I'm\n Graphic Design"
    setTimeout(() => {
        if (type == true && text.length < textName.length) {
            titleText(true, text + textName[text.length])
        } else if (type == true && text.length >= textName.length) {
            titleText(false, '')
        } else if (type == false && text.length < textWork.length) {
            titleText(false, text + textWork[text.length])
        } else {
            titleText(true, '')
        }

    }, 300)
}

titleText(true, '')


toggleModal('.strength-p')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA8bpN-HWexiOfk6uXYi3OLMnahw7xFE88",
    authDomain: "natali-yeromina.firebaseapp.com",
    databaseURL: "https://natali-yeromina.firebaseio.com",
    projectId: "natali-yeromina",
    storageBucket: "",
    messagingSenderId: "545859286062"
};
firebase.initializeApp(config);
var defaultDatabase = firebase.database();


let portfolio = defaultDatabase.ref('portfolio')
portfolio.on('value', function (id) {

    let cont1 = document.createElement("div")
    cont1.classList.add('col-md-4')
    let cont2 = document.createElement("div")
    cont2.classList.add('col-md-4')
    let cont3 = document.createElement("div")
    cont3.classList.add('col-md-4')

    let lastId = 3
    let index = 0

    id.forEach((el) => {

        let a = document.createElement("a")
        let span = document.createElement("span")
        a.classList.add('portfolio-el')
        a.dataset.index = index

        if (el.val().src)
            a.href = el.val().src
        if (el.val().title)
            span.innerText = el.val().title;
        if (el.val().tag)
            a.dataset.tag = el.val().tag
        if (el.val().img) {
            let img = document.createElement("img")
            img.src = el.val().img
            a.appendChild(img)
        }
        a.appendChild(span)
        if (lastId == 1) {
            cont1.appendChild(a)
            lastId = 2
        } else if (lastId == 2) {
            cont2.appendChild(a)
            lastId = 3
        } else if (lastId == 3) {
            cont3.appendChild(a)
            lastId = 1
        }

        index++

    });

    document.querySelector('.portfolio-p .content-block').appendChild(cont1)
    document.querySelector('.portfolio-p .content-block').appendChild(cont2)
    document.querySelector('.portfolio-p .content-block').appendChild(cont3)

    portfolioClass.loadMoreShowHide()

})


let portfolioTags = defaultDatabase.ref('portfolio-tags')
portfolioTags.on('value', function (id) {

    let portfolioTagsList = []

    id.forEach((el) => {
        portfolioTagsList.push([el.val(), el.key])
    });

    portfolioClass.showTags(portfolioTagsList)

})

class Portfolio {

    constructor() {
        this.loadMoreCount = 6
        this.selected = []
        this.loadMoreShowHide()
    }

    showTags(tags) {
        tags.forEach((e, i) => {
            let btn = document.createElement("button")
            btn.classList.add('btn')

            btn.setAttribute("type", "button");
            btn.innerText = e[0]
            btn.dataset.tag = e[1]
            btn.addEventListener('click', () => {
                portfolioClass.click(e[0], e[1])
            })
            document.querySelector('#tags').appendChild(btn)
        })
    }

    click(text, tag) {
        if (!this.selected.includes(tag))
            this.selected.push(tag)
        else
            this.selected = this.selected.filter(function (e) { return e !== tag })
        this.hideShowEl()
        this.tagsIndicate()
    }

    hideShowEl() {

        let portfolioEl = document.querySelectorAll('.portfolio-el')
        let timeOutSec = 100
        let loadMoreLocConut = 0

        portfolioEl.forEach((e, i) => {
            if (this.selected.length == 0) {
                    e.classList.add('show')
                    setTimeout(() => {
                        e.classList.remove('hide')
                        e.classList.remove('display-none')
                    }, timeOutSec)
                    loadMoreLocConut++
                
            } else {
                if (!this.selected.includes(e.dataset.tag)) {
                    e.classList.remove('show')
                    e.classList.add('hide')
                    setTimeout(() => {
                        e.classList.add('display-none')
                    }, timeOutSec)
                } else {
                    if (e.classList.contains("hide")) {
                        e.classList.add('show')
                        setTimeout(() => {
                            e.classList.remove('hide')
                            e.classList.remove('display-none')
                        }, timeOutSec)
                    }
                }
            }
        })

        setTimeout(() => {
            let portfolioElsConts = document.querySelectorAll('.portfolio-p .content-block .col-md-4')
            for (let i = 0; i < portfolioElsConts.length; i++) {
                let childNodes = portfolioElsConts[i].childNodes
                let needHideCol = true
                childNodes.forEach((e) => {
                    if (!e.classList.contains("hide")) 
                        needHideCol = false  
                })
                if (needHideCol)
                    portfolioElsConts[i].classList.add('display-none')
                else
                    portfolioElsConts[i].classList.remove('display-none')
            }
        }, timeOutSec * 2)
        this.loadMoreCount = 6
        this.loadMoreShowHide()
    }

    tagsIndicate() {
        let btn = document.querySelectorAll('#tags button')
        btn.forEach((e, i) => {
            if (this.selected.includes(e.dataset.tag))
                e.classList.add('selected')
            else
                e.classList.remove('selected')
        })
    }

    loadMoreShowHide() {
        let portfolioEl = document.querySelectorAll('.portfolio-el')
        portfolioEl.forEach((e) => {
            if (e.dataset.index > this.loadMoreCount) {
                e.classList.add('loadMore-display-none')
            } else {
                e.classList.remove('loadMore-display-none')
            }
        })
        if(portfolioEl.length > 0 && portfolioEl.length <= this.loadMoreCount )
            document.querySelector('#loadMoreBtn').style.display = 'none'
    }

    loadMore() {
        this.loadMoreCount += 6
        this.loadMoreShowHide()
    }
}

let portfolioClass = new Portfolio()


var setValue = (el, from, to, speed, x) =>{
    if(from <= to){
        setTimeout(()=>{
            el.innerHTML = from;
            from++
            speed /= 1.01 * x
            setValue(el, from, to, speed)
            x++
        }, speed)
    }
};


let isStart = false
document.querySelector('.strength-p').onscroll =  (e) => { 

    let cont = document.querySelector('.strength-p').scrollTop
    let el = document.querySelector('#client-int').getBoundingClientRect()

    if(el.top < window.innerHeight && !isStart){
        isStart = true
        var elH1 = document.querySelector('#client-int .left h1');
        setValue(elH1, 0, 95, 400, 0)
        var elH2 = document.querySelector('#client-int .right h1');
        setValue(elH2, 0, 164, 400, 0)
    }

 }



let skillsSliderImg = document.querySelectorAll('.skills-slider img')
let skillsSliderAnim = (index) => {
    skillsSliderImg.forEach((e)=>{
        e.classList.remove('anim')
    })
    skillsSliderImg[index].classList.add('anim')
    setTimeout(()=>{
        index++
        if(index + 2 > skillsSliderImg.length){
            skillsSliderAnim(0)
        } else{
            skillsSliderAnim(index)
        }
    }, 10000)
}


window.onload = () => {
    document.querySelector('.preloader').style.display = 'none'

    $('#Carousel').carousel({
        interval: 5000
    })

    skillsSliderAnim(0)
}
