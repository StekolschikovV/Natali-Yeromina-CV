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


toggleModal('.portfolio-p')


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

    let lastId = 3;
    id.forEach((el) => {

        // let cont = document.createElement("div")
        // cont.classList.add('col-md-4')

        let a = document.createElement("a")
        a.classList.add('portfolio-el')
        if (el.val().src)
            a.href = el.val().src
        if (el.val().title)
            a.innerText = el.val().title;
        if (el.val().tag)
            a.dataset.tag = el.val().tag
        if (el.val().img) {
            let img = document.createElement("img")
            img.src = el.val().img
            a.appendChild(img)
        }


        if(lastId == 1){
            cont1.appendChild(a)
            lastId = 2
        } else if(lastId == 2){
            cont2.appendChild(a)
            lastId = 3 
        } else if(lastId == 3){
            cont3.appendChild(a)
            lastId = 1 
        }
           
            
        // document.querySelector('.portfolio-p .content-block').appendChild(cont)

    });

    document.querySelector('.portfolio-p .content-block').appendChild(cont1)
    document.querySelector('.portfolio-p .content-block').appendChild(cont2)
    document.querySelector('.portfolio-p .content-block').appendChild(cont3)
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
        this.selected = []
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
        portfolioEl.forEach((e, i) => {
            if (this.selected.length == 0) {
                e.parentNode.classList.add('show')
                setTimeout(() => {
                    e.parentNode.classList.remove('hide')
                    e.parentNode.classList.remove('display-none')
                }, 500)
            } else {
                if (!this.selected.includes(e.dataset.tag)) {
                    e.parentNode.classList.remove('show')
                    e.parentNode.classList.add('hide')
                    setTimeout(() => {
                        e.parentNode.classList.add('display-none')
                    }, 500)
                } else {
                    if (e.parentNode.classList.contains("hide")) {
                        e.parentNode.classList.add('show')
                        setTimeout(() => {
                            e.parentNode.classList.remove('hide')
                            e.parentNode.classList.remove('display-none')
                        }, 500)
                    }
                }
            }
        })
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
}

let portfolioClass = new Portfolio()