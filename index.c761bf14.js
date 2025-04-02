!function(){let e,t,r;let o="theme",n="dark-theme",s={username:{required:!0,errorMessage:"Please enter your name"},phone_number:{required:!0,pattern:/^[\d\s+()-]{7,20}$/,errorMessage:"Enter a valid phone number"},email:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Enter a valid email address"}};function a(e,t,r){e&&r&&(e.textContent!==t&&(e.textContent=t),r.classList.add("is-invalid"))}function l(t){var o;e&&(o=t.currentTarget.dataset.modalType,r&&o&&("order"===o?(r.innerHTML=`
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
          <span class="order-form__error-essage"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Phone number</span>
            <input type="tel" inputmode="tel" name="phone_number" class="order-form__input" />
            <span class="order-form__error-essage"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Email</span>
            <input type="email" name="email" class="order-form__input"  />
            <span class="order-form__error-essage"></span>
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
  `,function(){let e=document.querySelector(".js-order-form");e&&e.addEventListener("submit",t=>{t.preventDefault(),function(e){[...e.elements].forEach(e=>{(function(e){let t=Object.keys(s);t.forEach(t=>{if(t===e.name){let r=s[t].required,o=s[t].pattern,n=s[t].errorMessage,l=e.closest("label")?.querySelector(".order-form__error-essage");r&&""===e.value.trim()?a(l,n,e):o&&!o.test(e.value.trim())&&a(l,n,e)}})})(e)})}(e)})}()):console.log("error")),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function c(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),r.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e){console.warn("Theme switcher not found: .js-theme-switcher__input");return}let t=localStorage.getItem(o),r=t===n;r&&(document.body.classList.add(n),e.checked=!0),e.addEventListener("change",()=>{let t=e.checked;document.body.classList.toggle(n,t),t?localStorage.setItem(o,n):localStorage.removeItem(o)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),t=document.querySelector(".js-close-btn"),r=document.querySelector(".js-mobile-menu"),o=document.querySelector("header"),n=document.querySelector(".js-theme-switcher");if(!e||!r||!o||!t){console.warn("Mobile menu: один или несколько элементов не найдены");return}function s(){r.classList.remove("open"),o.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",a)}function a(t){let o=r.contains(t.target),a=e.contains(t.target),l=n?.contains(t.target);o||a||l||s()}e.addEventListener("click",function(){r.classList.add("open"),o.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",a)}),t.addEventListener("click",s)}(),function(){if(e=document.querySelector(".modal"),t=document.querySelector(".modal-overlay"),r=document.querySelector(".modal-content"),!e||!t||!r){console.warn("Modal: one of the elements not found");return}document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",l)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",c)}),t&&t.addEventListener("click",e=>{e.target===t&&c()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e&&!e.classList.contains("is-hidden")&&c()})}()})}();
//# sourceMappingURL=index.c761bf14.js.map
