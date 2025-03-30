let e,t,o;const r="theme",n="dark-theme";function l(t){var r;e&&(r=t.currentTarget.dataset.modalType,o&&r&&("order"===r?(o.innerHTML=`
  <form name="order_form" autocomplete="on" class="order-form js-order-form" >
        <h2 id="form-title" class="order-form__title">Order now</h2>
        <div
          role="group"
          aria-labelledby="form-title"
          class="order-form__group"
        >
          <label class="order-form__label">
            <span class="order-form__label-text">Name</span>
            <input type="text" name="username" class="order-form__input" required />
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Phone number</span>
            <input type="tel" inputmode="tel" name="phone_number" class="order-form__input" required />
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Email</span>
            <input type="email" name="email" class="order-form__input" required />
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Comment</span>
            <textarea
              name="comments"
              rows="4"
              class="order-form__textarea"
            ></textarea>
          </label>
        </div>

        <button type="submit" class="order-form__submit-btn">Send</button>
      </form>
  `,function(){let e=document.querySelector(".js-order-form");e&&e.addEventListener("submit",function(e){e.preventDefault})}()):console.log("error")),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function a(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),o.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e){console.warn("Theme switcher not found: .js-theme-switcher__input");return}let t=localStorage.getItem(r),o=t===n;o&&(document.body.classList.add(n),e.checked=!0),e.addEventListener("change",()=>{let t=e.checked;document.body.classList.toggle(n,t),t?localStorage.setItem(r,n):localStorage.removeItem(r)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),t=document.querySelector(".js-close-btn"),o=document.querySelector(".js-mobile-menu"),r=document.querySelector("header"),n=document.querySelector(".js-theme-switcher");if(!e||!o||!r||!t){console.warn("Mobile menu: один или несколько элементов не найдены");return}function l(){o.classList.remove("open"),r.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",a)}function a(t){let r=o.contains(t.target),a=e.contains(t.target),s=n?.contains(t.target);r||a||s||l()}e.addEventListener("click",function(){o.classList.add("open"),r.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",a)}),t.addEventListener("click",l)}(),function(){if(e=document.querySelector(".modal"),t=document.querySelector(".modal-overlay"),o=document.querySelector(".modal-content"),!e||!t||!o){console.warn("Modal: one of the elements not found");return}document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",l)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",a)}),t&&t.addEventListener("click",e=>{e.target===t&&a()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e&&!e.classList.contains("is-hidden")&&a()})}()});
//# sourceMappingURL=index.0bfcce06.js.map
