const e=document.querySelector(".js-theme-switcher__input"),t="dark-theme",o="theme";(function(){try{let t=localStorage.getItem(o);if(!t)return;document.body.classList.add(t),e.checked=!0}catch(e){console.error("ERROR! Can not find saved theme in local storage",e)}})(),e.addEventListener("change",function(){document.body.classList.toggle(t),document.body.classList.contains(t)?localStorage.setItem(o,t):localStorage.removeItem(o)});const n=document.querySelector(".js-mobile-menu-btn"),c=document.querySelector(".js-mobile-menu"),s=document.querySelector("header"),d=document.querySelector(".js-close-btn");n.addEventListener("click",function(){c.classList.add("open"),s.classList.add("menu-opened")}),d.addEventListener("click",function(){c.classList.remove("open"),s.classList.remove("menu-opened")});
//# sourceMappingURL=index.193ea582.js.map
