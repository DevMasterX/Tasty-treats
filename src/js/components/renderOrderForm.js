function renderOrderForm(modalContentElement) {
  const formMarkup = `
  <form name="order_form"  class="order-form js-order-form" novalidate>
        <h2 id="form-title" class="order-form__title">Order now</h2>
        <div
          role="group"
          aria-labelledby="form-title"
          class="order-form__group"
        >
          <label class="order-form__label">
          <span class="order-form__label-text">Name</span>
          <input type="text" name="username" class="order-form__input"  autocomplete="name"/>
          <span class="order-form__error-message"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Phone number</span>
            <input type="tel" inputmode="tel" name="phone_number" class="order-form__input" autocomplete="tel"/>
            <span class="order-form__error-message"></span>
          </label>

          <label class="order-form__label">
            <span class="order-form__label-text">Email</span>
            <input type="email" name="email" class="order-form__input" autocomplete="email" />
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
  `;

  modalContentElement.innerHTML = formMarkup;
}

export { renderOrderForm };
