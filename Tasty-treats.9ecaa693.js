let e,t,r;const n="theme",o="dark-theme",s={username:{required:!0,errorMessage:"Please enter your name"},phone_number:{required:!0,pattern:/^[\d\s+()-]{7,20}$/,errorMessage:"Enter a valid phone number"},email:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Enter a valid email address"}};function a(e){var t,r;let n=s[e.name];if(!n)return;let{required:o,pattern:a,errorMessage:d}=n,c=e.value.trim(),i=l(e);o&&""===c||a&&!a.test(c)?function(e,t,r){e&&r&&(e.textContent!==t&&(e.textContent=t),r.classList.add("is-invalid"),r.classList.remove("is-valid"))}(i,d,e):(t=e,r=i,t.classList.remove("is-invalid"),t.classList.add("is-valid"),r&&(r.textContent=""))}function l(e){return e.closest("label")?.querySelector(".order-form__error-message")}function d(t){e&&(function(e){if(r&&e)if("order"===e){r.innerHTML=`
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
  `,function(e){if(!e)return;let t="order-form-data";e.addEventListener("focusout",e=>{if(!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement))return;let r=e.target.name,n=e.target.value;if(!r)return;let o=JSON.parse(localStorage.getItem(t||"{}"));o[r]=n,localStorage.setItem(t,JSON.stringify(o))})}(document.querySelector(".js-order-form"));let e=document.querySelector(".js-order-form");e&&e.addEventListener("submit",t=>{t.preventDefault(),[...e.elements].forEach(e=>{var t;a(e),(t=e).name&&!t.dataset.listenerAdded&&s[t.name]&&(t.addEventListener("input",()=>{a(t)}),t.dataset.listenerAdded="true")}),function(e){let t=[...e.elements].find(e=>e.classList.contains("is-invalid"));if(t)return t.focus();[...e.elements].forEach(e=>{e.classList.remove("is-valid","is-invalid"),delete e.dataset.listenerAdded;let t=l(e);t&&(t.textContent="")}),e.reset(),c(),console.log("success")}(e)})}else console.log("error")}(t.currentTarget.dataset.modalType),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function c(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),r.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e)return console.warn("Theme switcher not found: .js-theme-switcher__input");localStorage.getItem(n)===o&&(document.body.classList.add(o),e.checked=!0),e.addEventListener("change",()=>{let t=e.checked;document.body.classList.toggle(o,t),t?localStorage.setItem(n,o):localStorage.removeItem(n)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),t=document.querySelector(".js-close-btn"),r=document.querySelector(".js-mobile-menu"),n=document.querySelector("header"),o=document.querySelector(".js-theme-switcher");if(!e||!r||!n||!t)return console.warn("Mobile menu: один или несколько элементов не найдены");function s(){r.classList.remove("open"),n.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",a)}function a(t){let n=r.contains(t.target),a=e.contains(t.target),l=o?.contains(t.target);n||a||l||s()}e.addEventListener("click",function(){r.classList.add("open"),n.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",a)}),t.addEventListener("click",s)}(),function(){if(e=document.querySelector(".modal"),t=document.querySelector(".modal-overlay"),r=document.querySelector(".modal-content"),!e||!t||!r)return console.warn("Modal: one of the elements not found");document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",d)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",c)}),t&&t.addEventListener("click",e=>{e.target===t&&c()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e&&!e.classList.contains("is-hidden")&&c()})}()});
//# sourceMappingURL=Tasty-treats.9ecaa693.js.map
