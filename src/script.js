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
    document.querySelector('.h1-title').innerHTML = text
    let textName = "I'm\n Natali Yeromina"
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
  
  
  var feed = defaultDatabase.ref('portfolio')


feed.on('value', function (id) {
    id.forEach(function (el) {

        // for(let i = 0; i < 10; i++){

     
        let cont = document.createElement("div")
        cont.classList.add('col-md-4')

        let a = document.createElement("a")
        if(el.val().src)
            a.href = el.val().src
        if(el.val().img)
            a.style.backgroundImage = `url('${el.val().img}')`;
        if(el.val().title)
            a.innerText = el.val().title;  

        cont.appendChild(a)
        document.querySelector('.portfolio-p .content-block').appendChild(cont)
    // }
    });
})




