"use strict";var toggleModal=function(t){{var s=document.querySelector(t);s.classList.contains("show")}s.classList.contains("show")?(s.classList.toggle("show"),setTimeout(function(){s.classList.toggle("display-block")},500)):(s.classList.toggle("display-block"),setTimeout(function(){s.classList.toggle("show")},0))};document.addEventListener("touchmove",function(t){t.preventDefault()}),window.addEventListener("load",function(){window.scrollTo(0,0)}),alert(1);