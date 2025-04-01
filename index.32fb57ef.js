let e,t,o;const r="theme",n="dark-theme",a={username:{required:!0,errorMessage:"Please enter your name"},phone_number:{required:!0,pattern:/^[\d\s+()-]{7,20}$/,errorMessage:"Enter a valid phone number"},email:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Enter a valid email address"}};function l(t){var r;e&&(r=t.currentTarget.dataset.modalType,o&&r&&("order"===r?(o.innerHTML=`
  <form name="order_form" autocomplete="on" class="order-form js-order-form" novalidate>
        <h2 id="form-title" class="order-form__title">Order now</h2>
        <div
          role="group"
          aria-labelledby="form-title"
          class="order-form__group"
        >
          <label class="order-form__label">
            <span class="order-form__label-text">Name</span>
            <input type="text" name="username" class="order-form__input"  />
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Phone number</span>
            <input type="tel" inputmode="tel" name="phone_number" class="order-form__input" />
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Email</span>
            <input type="email" name="email" class="order-form__input"  />
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
  `,function(){let e=document.querySelector(".js-order-form");e&&e.addEventListener("submit",e=>{e.preventDefault(),function(e){[...e.elements].forEach(e=>{(function(e){let t=Object.keys(a);t.forEach(t=>{t===e.name&&console.log(a[t])})})(e)})}(e.currentTarget)})}()):console.log("error")),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function s(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),o.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e){console.warn("Theme switcher not found: .js-theme-switcher__input");return}let t=localStorage.getItem(r),o=t===n;o&&(document.body.classList.add(n),e.checked=!0),e.addEventListener("change",()=>{let t=e.checked;document.body.classList.toggle(n,t),t?localStorage.setItem(r,n):localStorage.removeItem(r)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),t=document.querySelector(".js-close-btn"),o=document.querySelector(".js-mobile-menu"),r=document.querySelector("header"),n=document.querySelector(".js-theme-switcher");if(!e||!o||!r||!t){console.warn("Mobile menu: один или несколько элементов не найдены");return}function a(){o.classList.remove("open"),r.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",l)}function l(t){let r=o.contains(t.target),l=e.contains(t.target),s=n?.contains(t.target);r||l||s||a()}e.addEventListener("click",function(){o.classList.add("open"),r.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",l)}),t.addEventListener("click",a)}(),function(){if(e=document.querySelector(".modal"),t=document.querySelector(".modal-overlay"),o=document.querySelector(".modal-content"),!e||!t||!o){console.warn("Modal: one of the elements not found");return}document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",l)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",s)}),t&&t.addEventListener("click",e=>{e.target===t&&s()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e&&!e.classList.contains("is-hidden")&&s()})}()});
//# sourceMappingURL=index.32fb57ef.js.map
