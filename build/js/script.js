"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var l=t[o];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,o,l){return o&&e(t.prototype,o),l&&e(t,l),t}}(),toggleModal=function(e){var t=document.querySelector(e),o=t.classList.contains("show");navZIndex(o),t.classList.contains("show")?(t.classList.toggle("show"),setTimeout(function(){t.classList.toggle("display-block")},500)):(t.classList.toggle("display-block"),setTimeout(function(){t.classList.toggle("show")},0))},navZIndex=function(e){document.querySelectorAll("nav a").forEach(function(t){e?setTimeout(function(){t.style.zIndex=9,t.style.transition=".5s"},500):(t.style.zIndex=0,t.style.transition="0s")})},titleText=function e(t,o){document.querySelector(".h1-title").innerHTML=o;var l="I'm\n Natali Yeromina",n="I'm\n Graphic Design";setTimeout(function(){1==t&&o.length<l.length?e(!0,o+l[o.length]):1==t&&o.length>=l.length?e(!1,""):0==t&&o.length<n.length?e(!1,o+n[o.length]):e(!0,"")},300)};titleText(!0,""),toggleModal(".portfolio-p");var config={apiKey:"AIzaSyA8bpN-HWexiOfk6uXYi3OLMnahw7xFE88",authDomain:"natali-yeromina.firebaseapp.com",databaseURL:"https://natali-yeromina.firebaseio.com",projectId:"natali-yeromina",storageBucket:"",messagingSenderId:"545859286062"};firebase.initializeApp(config);var defaultDatabase=firebase.database(),portfolio=defaultDatabase.ref("portfolio");portfolio.on("value",function(e){var t=document.createElement("div");t.classList.add("col-md-4");var o=document.createElement("div");o.classList.add("col-md-4");var l=document.createElement("div");l.classList.add("col-md-4");var n=3,a=0;e.forEach(function(e){var i=document.createElement("a"),s=document.createElement("span");if(i.classList.add("portfolio-el"),i.dataset.index=a,e.val().src&&(i.href=e.val().src),e.val().title&&(s.innerText=e.val().title),e.val().tag&&(i.dataset.tag=e.val().tag),e.val().img){var c=document.createElement("img");c.src=e.val().img,i.appendChild(c)}i.appendChild(s),1==n?(t.appendChild(i),n=2):2==n?(o.appendChild(i),n=3):3==n&&(l.appendChild(i),n=1),a++}),document.querySelector(".portfolio-p .content-block").appendChild(t),document.querySelector(".portfolio-p .content-block").appendChild(o),document.querySelector(".portfolio-p .content-block").appendChild(l),portfolioClass.loadMoreShowHide()});var portfolioTags=defaultDatabase.ref("portfolio-tags");portfolioTags.on("value",function(e){var t=[];e.forEach(function(e){t.push([e.val(),e.key])}),portfolioClass.showTags(t)});var Portfolio=function(){function e(){_classCallCheck(this,e),this.loadMoreCount=6,this.selected=[],this.loadMoreShowHide()}return _createClass(e,[{key:"showTags",value:function(e){e.forEach(function(e,t){var o=document.createElement("button");o.classList.add("btn"),o.setAttribute("type","button"),o.innerText=e[0],o.dataset.tag=e[1],o.addEventListener("click",function(){portfolioClass.click(e[0],e[1])}),document.querySelector("#tags").appendChild(o)})}},{key:"click",value:function(e,t){var o=document.querySelectorAll(".portfolio-el");this.loadMoreCount=o.length+1,this.loadMore(),this.selected.includes(t)?this.selected=this.selected.filter(function(e){return e!==t}):this.selected.push(t),this.hideShowEl(),this.tagsIndicate()}},{key:"hideShowEl",value:function(){var e=this,t=document.querySelectorAll(".portfolio-el"),o=100,l=0;t.forEach(function(t,n){0==e.selected.length?(t.classList.add("show"),setTimeout(function(){t.classList.remove("hide"),t.classList.remove("display-none")},o),l++):e.selected.includes(t.dataset.tag)?t.classList.contains("hide")&&(t.classList.add("show"),setTimeout(function(){t.classList.remove("hide"),t.classList.remove("display-none")},o)):(t.classList.remove("show"),t.classList.add("hide"),setTimeout(function(){t.classList.add("display-none")},o))}),setTimeout(function(){for(var e=document.querySelectorAll(".portfolio-p .content-block .col-md-4"),t=0;t<e.length;t++){var o=e[t].childNodes,l=!0;o.forEach(function(e){e.classList.contains("hide")||(l=!1)}),l?e[t].classList.add("display-none"):e[t].classList.remove("display-none")}},2*o),this.loadMoreCount=6,this.loadMoreShowHide()}},{key:"tagsIndicate",value:function(){var e=this,t=document.querySelectorAll("#tags button");t.forEach(function(t,o){e.selected.includes(t.dataset.tag)?t.classList.add("selected"):t.classList.remove("selected")})}},{key:"loadMoreShowHide",value:function(){var e=this,t=document.querySelectorAll(".portfolio-el");t.forEach(function(t){t.dataset.index>e.loadMoreCount?t.classList.add("loadMore-display-none"):t.classList.remove("loadMore-display-none")}),t.length>0&&t.length-1<=this.loadMoreCount&&(document.querySelector("#loadMoreBtn").style.display="none")}},{key:"loadMore",value:function(){this.loadMoreCount+=6,this.loadMoreShowHide()}}]),e}(),portfolioClass=new Portfolio,setValue=function t(e,o,l,n,a){l>=o&&setTimeout(function(){e.innerHTML=o,o++,n/=1.01*a,t(e,o,l,n),a++},n)},isStart=!1;document.querySelector(".strength-p").onscroll=function(e){var t=(document.querySelector(".strength-p").scrollTop,document.querySelector("#client-int").getBoundingClientRect());if(t.top<window.innerHeight&&!isStart){isStart=!0;var o=document.querySelector("#client-int .left h1");setValue(o,0,95,400,0);var l=document.querySelector("#client-int .right h1");setValue(l,0,164,400,0)}};var skillsSliderImg=document.querySelectorAll(".skills-slider img"),skillsSliderAnim=function o(e){skillsSliderImg.forEach(function(e){e.classList.remove("anim")}),skillsSliderImg[e].classList.add("anim"),setTimeout(function(){e++,o(e+2>skillsSliderImg.length?0:e)},1e4)};window.onload=function(){document.querySelector(".preloader").style.display="none",$("#Carousel").carousel({interval:5e3}),skillsSliderAnim(0)};