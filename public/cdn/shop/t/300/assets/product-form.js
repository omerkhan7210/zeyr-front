/** Shopify CDN: Minification failed

Line 16:40 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 17:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 35:19 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 45:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 49:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 57:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 57:30 Transforming array spread to the configured target environment ("es5") is not supported yet
Line 65:12 Transforming const to the configured target environment ("es5") is not supported yet
Line 92:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 92:36 Transforming default arguments to the configured target environment ("es5") is not supported yet

**/
if (!customElements.get('product-form')) {
    customElements.define('product-form', class ProductForm extends HTMLElement {
        constructor() {
            super();

            this.form = this.querySelector('form');
            this.form.querySelector('[name=id]').disabled = false;
            this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
            this.sizeSwatch = this.querySelectorAll('input[data-quick-add="true"]');
            this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
            this.submitButton = this.querySelector('[type="submit"]');
            if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

            if (this.sizeSwatch) {
                this.sizeSwatch.forEach(el => {
                    el.addEventListener('click', () => setTimeout(() => this.submitButton.click(), 1000));
                })
            }
        }

        onSubmitHandler(evt) {
            evt.preventDefault();
            if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

            this.handleErrorMessage();

            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButton.classList.add('loading');
            this.querySelector('.loading-overlay__spinner').removeAttribute('hidden');

            const config = fetchConfig('javascript');
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            delete config.headers['Content-Type'];

            const formData = new FormData(this.form);
            if (this.cart) {
                formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
                formData.append('sections_url', window.location.pathname);
                this.cart.setActiveElement(document.activeElement);
            }
            config.body = formData;

            const formDataValues = [...formData.entries()];

            fetch(`${routes.cart_add_url}`, config)
                .then((response) => response.json())
                .then((response) => {
                    if (response.status) {
                        this.handleErrorMessage(response.description);

                        const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
                        if (!soldOutMessage) return;
                        this.submitButton.setAttribute('aria-disabled', true);
                        this.submitButton.querySelector('span').classList.add('hidden');
                        soldOutMessage.classList.remove('hidden');
                        this.error = true;
                        return;
                    } else if (!this.cart) {
                        window.location = window.routes.cart_url;
                        return;
                    }

                    this.error = false;
                    this.cart.renderContents(response);
                    console.log(response)
                })
                .catch((e) => {
                    console.error(e);
                })
                .finally(() => {
                    this.submitButton.classList.remove('loading');
                    if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
                    if (!this.error) this.submitButton.removeAttribute('aria-disabled');
                    this.querySelector('.loading-overlay__spinner').setAttribute('hidden', '');
                });
        }

        handleErrorMessage(errorMessage = false) {
            this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
            if (!this.errorMessageWrapper) return;
            this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

            this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

            if (errorMessage) {
                this.errorMessage.textContent = errorMessage;
            }
        }
    });
}