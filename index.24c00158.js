let e,r,t;const o="theme",n="dark-theme",s={username:{required:!0,errorMessage:"Please enter your name"},phone_number:{required:!0,pattern:/^[\d\s+()-]{7,20}$/,errorMessage:"Enter a valid phone number"},email:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,errorMessage:"Enter a valid email address"}};function a(e,r,t){e&&t&&(e.textContent!==r&&(e.textContent=r),t.classList.add("is-invalid"))}function l(r){var o;e&&(o=r.currentTarget.dataset.modalType,t&&o&&("order"===o?(t.innerHTML=`
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
  `,function(){let e=document.querySelector(".js-order-form");e&&e.addEventListener("submit",r=>{r.preventDefault(),function(e){[...e.elements].forEach(e=>{(function(e){let r=s[e.name];if(console.log("\uD83D\uDE80 config:",r),!r)return;let t=Object.keys(s);t.forEach(r=>{if(r===e.name){let t=s[r].required,o=s[r].pattern,n=s[r].errorMessage,l=e.closest("label")?.querySelector(".order-form__error-essage");t&&""===e.value.trim()?a(l,n,e):o&&!o.test(e.value.trim())&&a(l,n,e)}})})(e)})}(e)})}()):console.log("error")),e.classList.remove("is-hidden"),document.body.classList.add("no-scroll"))}function c(){e&&(e.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),t.innerHTML="")}document.addEventListener("DOMContentLoaded",async()=>{!function(){let e=document.querySelector(".js-theme-switcher__input");if(!e){console.warn("Theme switcher not found: .js-theme-switcher__input");return}let r=localStorage.getItem(o),t=r===n;t&&(document.body.classList.add(n),e.checked=!0),e.addEventListener("change",()=>{let r=e.checked;document.body.classList.toggle(n,r),r?localStorage.setItem(o,n):localStorage.removeItem(o)})}(),function(){let e=document.querySelector(".js-mobile-menu-btn"),r=document.querySelector(".js-close-btn"),t=document.querySelector(".js-mobile-menu"),o=document.querySelector("header"),n=document.querySelector(".js-theme-switcher");if(!e||!t||!o||!r){console.warn("Mobile menu: один или несколько элементов не найдены");return}function s(){t.classList.remove("open"),o.classList.remove("menu-opened"),document.body.classList.remove("no-scroll"),document.removeEventListener("click",a)}function a(r){let o=t.contains(r.target),a=e.contains(r.target),l=n?.contains(r.target);o||a||l||s()}e.addEventListener("click",function(){t.classList.add("open"),o.classList.add("menu-opened"),document.body.classList.add("no-scroll"),document.addEventListener("click",a)}),r.addEventListener("click",s)}(),function(){if(e=document.querySelector(".modal"),r=document.querySelector(".modal-overlay"),t=document.querySelector(".modal-content"),!e||!r||!t){console.warn("Modal: one of the elements not found");return}document.querySelectorAll("[data-modal-open]").forEach(e=>{e.addEventListener("click",l)}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",c)}),r&&r.addEventListener("click",e=>{e.target===r&&c()}),document.addEventListener("keydown",r=>{"Escape"===r.key&&e&&!e.classList.contains("is-hidden")&&c()})}()});
//# sourceMappingURL=index.24c00158.js.map
