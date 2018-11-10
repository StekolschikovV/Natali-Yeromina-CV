'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var toggleModal = function toggleModal(page) {

    var selector = document.querySelector(page);
    var isSelectorShow = selector.classList.contains('show');

    navZIndex(isSelectorShow);

    if (!selector.classList.contains('show')) {
        selector.classList.toggle('display-block');
        setTimeout(function () {
            selector.classList.toggle('show');
        }, 0);
    } else {
        selector.classList.toggle('show');
        setTimeout(function () {
            selector.classList.toggle('display-block');
        }, 500);
    }
};

var navZIndex = function navZIndex(status) {
    document.querySelectorAll('nav a').forEach(function (e) {
        if (status) {

            setTimeout(function () {
                e.style.zIndex = 9;
                e.style.transition = '.5s';
            }, 500);
        } else {
            e.style.zIndex = 0;
            e.style.transition = '0s';
        }
    });
};

var titleText = function titleText(type, text) {
    document.querySelector('.h1-title').innerHTML = text;
    var textName = "I'm\n Natalia Yeromina";
    var textWork = "I'm\n Graphic Designer";
    setTimeout(function () {
        if (type == true && text.length < textName.length) {
            titleText(true, text + textName[text.length]);
        } else if (type == true && text.length >= textName.length) {
            titleText(false, '');
        } else if (type == false && text.length < textWork.length) {
            titleText(false, text + textWork[text.length]);
        } else {
            titleText(true, '');
        }
    }, 300);
};

titleText(true, '');

// toggleModal('.strength-p')

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

var portfolio = defaultDatabase.ref('portfolio');
portfolio.on('value', function (id) {

    var cont1 = document.createElement("div");
    cont1.classList.add('col-md-4');
    var cont2 = document.createElement("div");
    cont2.classList.add('col-md-4');
    var cont3 = document.createElement("div");
    cont3.classList.add('col-md-4');

    var lastId = 3;
    var index = 0;

    id.forEach(function (el) {

        var a = document.createElement("a");
        var span = document.createElement("span");
        a.classList.add('portfolio-el');
        a.dataset.index = index;

        if (el.val().src) a.href = el.val().src;
        if (el.val().title) span.innerText = el.val().title;
        if (el.val().tag) a.dataset.tag = el.val().tag;
        if (el.val().img) {
            var img = document.createElement("img");
            img.src = el.val().img;
            a.appendChild(img);
        }
        a.appendChild(span);
        if (lastId == 1) {
            cont1.appendChild(a);
            lastId = 2;
        } else if (lastId == 2) {
            cont2.appendChild(a);
            lastId = 3;
        } else if (lastId == 3) {
            cont3.appendChild(a);
            lastId = 1;
        }

        index++;
    });

    document.querySelector('.portfolio-p .content-block').appendChild(cont1);
    document.querySelector('.portfolio-p .content-block').appendChild(cont2);
    document.querySelector('.portfolio-p .content-block').appendChild(cont3);

    portfolioClass.loadMoreShowHide();
});

var portfolioTags = defaultDatabase.ref('portfolio-tags');
portfolioTags.on('value', function (id) {

    var portfolioTagsList = [];

    id.forEach(function (el) {
        portfolioTagsList.push([el.val(), el.key]);
    });

    portfolioClass.showTags(portfolioTagsList);
});

var Portfolio = (function () {
    function Portfolio() {
        _classCallCheck(this, Portfolio);

        this.loadMoreCount = 6;
        this.selected = [];
        this.loadMoreShowHide();
    }

    _createClass(Portfolio, [{
        key: 'showTags',
        value: function showTags(tags) {
            tags.forEach(function (e, i) {
                var btn = document.createElement("button");
                btn.classList.add('btn');

                btn.setAttribute("type", "button");
                btn.innerText = e[0];
                btn.dataset.tag = e[1];
                btn.addEventListener('click', function () {
                    portfolioClass.click(e[0], e[1]);
                });
                document.querySelector('#tags').appendChild(btn);
            });
        }
    }, {
        key: 'click',
        value: function click(text, tag) {
            if (!this.selected.includes(tag)) this.selected.push(tag);else this.selected = this.selected.filter(function (e) {
                return e !== tag;
            });
            this.hideShowEl();
            this.tagsIndicate();
        }
    }, {
        key: 'hideShowEl',
        value: function hideShowEl() {
            var _this = this;

            var portfolioEl = document.querySelectorAll('.portfolio-el');
            var timeOutSec = 100;
            var loadMoreLocConut = 0;

            portfolioEl.forEach(function (e, i) {
                if (_this.selected.length == 0) {
                    e.classList.add('show');
                    setTimeout(function () {
                        e.classList.remove('hide');
                        e.classList.remove('display-none');
                    }, timeOutSec);
                    loadMoreLocConut++;
                } else {
                    if (!_this.selected.includes(e.dataset.tag)) {
                        e.classList.remove('show');
                        e.classList.add('hide');
                        setTimeout(function () {
                            e.classList.add('display-none');
                        }, timeOutSec);
                    } else {
                        if (e.classList.contains("hide")) {
                            e.classList.add('show');
                            setTimeout(function () {
                                e.classList.remove('hide');
                                e.classList.remove('display-none');
                            }, timeOutSec);
                        }
                    }
                }
            });

            setTimeout(function () {
                var portfolioElsConts = document.querySelectorAll('.portfolio-p .content-block .col-md-4');
                for (var i = 0; i < portfolioElsConts.length; i++) {
                    var childNodes = portfolioElsConts[i].childNodes;
                    var needHideCol = true;
                    childNodes.forEach(function (e) {
                        if (!e.classList.contains("hide")) needHideCol = false;
                    });
                    if (needHideCol) portfolioElsConts[i].classList.add('display-none');else portfolioElsConts[i].classList.remove('display-none');
                }
            }, timeOutSec * 2);
            this.loadMoreCount = 6;
            this.loadMoreShowHide();
        }
    }, {
        key: 'tagsIndicate',
        value: function tagsIndicate() {
            var _this2 = this;

            var btn = document.querySelectorAll('#tags button');
            btn.forEach(function (e, i) {
                if (_this2.selected.includes(e.dataset.tag)) e.classList.add('selected');else e.classList.remove('selected');
            });
        }
    }, {
        key: 'loadMoreShowHide',
        value: function loadMoreShowHide() {
            var _this3 = this;

            var portfolioEl = document.querySelectorAll('.portfolio-el');
            portfolioEl.forEach(function (e) {
                if (e.dataset.index > _this3.loadMoreCount) {
                    e.classList.add('loadMore-display-none');
                } else {
                    e.classList.remove('loadMore-display-none');
                }
            });
            if (portfolioEl.length > 0 && portfolioEl.length <= this.loadMoreCount) document.querySelector('#loadMoreBtn').style.display = 'none';
        }
    }, {
        key: 'loadMore',
        value: function loadMore() {
            this.loadMoreCount += 6;
            this.loadMoreShowHide();
        }
    }]);

    return Portfolio;
})();

var portfolioClass = new Portfolio();

var setValue = function setValue(el, from, to, speed, x) {
    if (from <= to) {
        setTimeout(function () {
            el.innerHTML = from;
            from++;
            speed /= 1.01 * x;
            setValue(el, from, to, speed);
            x++;
        }, speed);
    }
};

var isStart = false;
document.querySelector('.strength-p').onscroll = function (e) {

    var cont = document.querySelector('.strength-p').scrollTop;
    var el = document.querySelector('#client-int').getBoundingClientRect();

    if (el.top < window.innerHeight && !isStart) {
        isStart = true;
        var elH1 = document.querySelector('#client-int .left h1');
        setValue(elH1, 0, 95, 400, 0);
        var elH2 = document.querySelector('#client-int .right h1');
        setValue(elH2, 0, 164, 400, 0);
    }
};

var skillsSliderImg = document.querySelectorAll('.skills-slider img');
var skillsSliderAnim = function skillsSliderAnim(index) {
    skillsSliderImg.forEach(function (e) {
        e.classList.remove('anim');
    });
    skillsSliderImg[index].classList.add('anim');
    setTimeout(function () {
        index++;
        if (index + 2 > skillsSliderImg.length) {
            skillsSliderAnim(0);
        } else {
            skillsSliderAnim(index);
        }
    }, 10000);
};
skillsSliderAnim(0);


// document.addEventListener('DOMContentLoaded', function() {
    window.onload = () => {
    setTimeout(function(){
        document.querySelector('.preloader').style.display = 'none'
    }, 3000);

}
// , true);