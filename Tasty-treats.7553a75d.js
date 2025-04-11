let e,t,r;const o="theme",n="dark-theme",s="order-form-data",a={username:{required:!0,errorMessage:"Please enter your name"},phone_number:{required:!0,pattern:/^[\d\s+()-]{7,20}$/,errorMessage:"Enter a valid phone number"},email:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Enter a valid email address"}};function l(e){var t,r;let o=a[e.name];if(!o)return;let{required:n,pattern:s,errorMessage:l}=o,c=e.value.trim(),i=d(e);n&&""===c||s&&!s.test(c)?function(e,t,r){e&&r&&(e.textContent!==t&&(e.textContent=t),r.classList.add("is-invalid"),r.classList.remove("is-valid"))}(i,l,e):(t=e,r=i,t.classList.remove("is-invalid"),t.classList.add("is-valid"),r&&(r.textContent=""))}function d(e){return e.closest("label")?.querySelector(".order-form__error-message")}function c(t){e&&(function(e){if(r&&e)if("order"===e){var t;r.innerHTML=`
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
          <span class="order-form__error-message"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Phone number</span>
            <input type="tel" inputmode="tel" name="phone_number" class="order-form__input" />
            <span class="order-form__error-message"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Email</span>
            <input type="email" name="email" class="order-form__input"  />
            <span class="order-form__error-message"></span>
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
  `;let e=document.querySelector(".js-order-form");(function(e){let t=JSON.parse(localStorage.getItem(s));console.log("\uD83D\uDE80 formData:",t)})(0),(t=e)&&t.addEventListener("focusout",e=>{if(!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement))return;let t=e.target.name,r=e.target.value;if(!t)return;let o=JSON.parse(localStorage.getItem(s)||"{}");console.log(o),o[t]=r,localStorage.setItem(s,JSON.stringify(o))}),e&&e.addEventListener("submit",t=>{t.preventDefault(),[...e.elements].forEach(e=>{var t;l(e),(t=e).name&&!t.dataset.listenerAdded&&a[t.name]&&(t.addEventListener("input",()=>{l(t)}),t.dataset.listenerAdded="true")}),function(e){let t=[...e.elements].find(e=>e.classList.contains("is-invalid"));if(t)return t.focus();[...e.elements].forEach(e=>{e.classList.remove("is-valid","is-invalid"),delete e.dataset.listenerAdded;let t=d(e);t&&(t.textContent="")}),i()}(e),function(e){e.reset(),localStorage.removeItem(s),console.log("success")}(e)})}else console.log("error")}(t.currentTarget.dataset.modalType),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function i(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),r.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e)return console.warn("Theme switcher not found: .js-theme-switcher__input");localStorage.getItem(o)===n&&(document.body.classList.add(n),e.checked=!0),e.addEventListener("change",()=>{let t=e.checked;document.body.classList.toggle(n,t),t?localStorage.setItem(o,n):localStorage.removeItem(o)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),t=document.querySelector(".js-close-btn"),r=document.querySelector(".js-mobile-menu"),o=document.querySelector("header"),n=document.querySelector(".js-theme-switcher");if(!e||!r||!o||!t)return console.warn("Mobile menu: один или несколько элементов не найдены");function s(){r.classList.remove("open"),o.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",a)}function a(t){let o=r.contains(t.target),a=e.contains(t.target),l=n?.contains(t.target);o||a||l||s()}e.addEventListener("click",function(){r.classList.add("open"),o.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",a)}),t.addEventListener("click",s)}(),function(){if(e=document.querySelector(".modal"),t=document.querySelector(".modal-overlay"),r=document.querySelector(".modal-content"),!e||!t||!r)return console.warn("Modal: one of the elements not found");document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",c)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",i)}),t&&t.addEventListener("click",e=>{e.target===t&&i()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e&&!e.classList.contains("is-hidden")&&i()})}()});
//# sourceMappingURL=Tasty-treats.7553a75d.js.map
