"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),toggleModal=function(e){var t=document.querySelector(e),a=t.classList.contains("show");navZIndex(a),t.classList.contains("show")?(t.classList.toggle("show"),setTimeout(function(){t.classList.toggle("display-block")},500)):(t.classList.toggle("display-block"),setTimeout(function(){t.classList.toggle("show")},0))},navZIndex=function(e){document.querySelectorAll("nav a").forEach(function(t){e?setTimeout(function(){t.style.zIndex=9,t.style.transition=".5s"},500):(t.style.zIndex=0,t.style.transition="0s")})},titleText=function e(t,a){document.querySelector(".h1-title").innerHTML=a;var s="I'm\n Natali Yeromina",o="I'm\n Graphic Design";setTimeout(function(){1==t&&a.length<s.length?e(!0,a+s[a.length]):1==t&&a.length>=s.length?e(!1,""):0==t&&a.length<o.length?e(!1,a+o[a.length]):e(!0,"")},300)};titleText(!0,""),toggleModal(".contact-p");var config={apiKey:"AIzaSyA8bpN-HWexiOfk6uXYi3OLMnahw7xFE88",authDomain:"natali-yeromina.firebaseapp.com",databaseURL:"https://natali-yeromina.firebaseio.com",projectId:"natali-yeromina",storageBucket:"",messagingSenderId:"545859286062"};firebase.initializeApp(config);var defaultDatabase=firebase.database(),portfolio=defaultDatabase.ref("portfolio");portfolio.on("value",function(e){e.forEach(function(e){var t=document.createElement("div");t.classList.add("col-md-4");var a=document.createElement("a");a.classList.add("portfolio-el"),e.val().src&&(a.href=e.val().src),e.val().img&&(a.style.backgroundImage="url('"+e.val().img+"')"),e.val().title&&(a.innerText=e.val().title),e.val().tag&&(a.dataset.tag=e.val().tag),t.appendChild(a),document.querySelector(".portfolio-p .content-block").appendChild(t)})});var portfolioTags=defaultDatabase.ref("portfolio-tags");portfolioTags.on("value",function(e){var t=[];e.forEach(function(e){t.push([e.val(),e.key])}),portfolioClass.showTags(t)});var Portfolio=function(){function e(){_classCallCheck(this,e),this.selected=[]}return _createClass(e,[{key:"showTags",value:function(e){e.forEach(function(e,t){var a=document.createElement("button");a.classList.add("btn"),a.setAttribute("type","button"),a.innerText=e[0],a.dataset.tag=e[1],a.addEventListener("click",function(){portfolioClass.click(e[0],e[1])}),document.querySelector("#tags").appendChild(a)})}},{key:"click",value:function(e,t){this.selected.includes(t)?this.selected=this.selected.filter(function(e){return e!==t}):this.selected.push(t),this.hideShowEl(),this.tagsIndicate()}},{key:"hideShowEl",value:function(){var e=this,t=document.querySelectorAll(".portfolio-el");t.forEach(function(t,a){e.selected.includes(t.dataset.tag)?t.classList.contains("hide")&&(t.classList.add("show"),setTimeout(function(){t.classList.remove("hide"),t.classList.remove("display-none")},500)):(t.classList.remove("show"),t.classList.add("hide"),setTimeout(function(){t.classList.add("display-none")},500)),0==e.selected.length&&(t.classList.add("show"),setTimeout(function(){t.classList.remove("hide"),t.classList.remove("display-none")},500))})}},{key:"tagsIndicate",value:function(){var e=this,t=document.querySelectorAll("#tags button");t.forEach(function(t,a){e.selected.includes(t.dataset.tag)?t.classList.add("selected"):t.classList.remove("selected")})}}]),e}(),portfolioClass=new Portfolio;