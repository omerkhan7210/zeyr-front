/** Shopify CDN: Minification failed

Line 26:2 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 27:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 41:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 46:20 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 53:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 55:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 60:16 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 66:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 67:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 83:2 Transforming class syntax to the configured target environment ("es5") is not supported yet
... and 4 more hidden warnings

**/
(function() {
    var __sections__ = {};
    (function() {
        for (var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
            __sections__[s[i]] = true;
    })();
    (function() {
        if (!__sections__["footer"]) return;
        try {

            class LocalizationForm extends HTMLElement {
                constructor() {
                    super();
                    this.elements = {
                        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
                        button: this.querySelector('button'),
                        panel: this.querySelector('.disclosure__list'),
                    };
                    this.elements.button.addEventListener('click', this.openSelector.bind(this));
                    this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
                    this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

                    this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
                }

                hidePanel() {
                    this.elements.button.setAttribute('aria-expanded', 'false');
                    this.elements.panel.setAttribute('hidden', true);
                }

                onContainerKeyUp(event) {
                    if (event.code.toUpperCase() !== 'ESCAPE') return;

                    this.hidePanel();
                    this.elements.button.focus();
                }

                onItemClick(event) {
                    event.preventDefault();
                    const form = this.querySelector('form');
                    this.elements.input.value = event.currentTarget.dataset.value;
                    if (form) form.submit();
                }

                openSelector() {
                    this.elements.button.focus();
                    this.elements.panel.toggleAttribute('hidden');
                    this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
                }

                closeSelector(event) {
                    const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
                    if (event.relatedTarget === null || shouldClose) {
                        this.hidePanel();
                    }
                }
            }

            customElements.define('localization-form', LocalizationForm);

        } catch (e) {
            console.error(e);
        }
    })();

    (function() {
        if (!__sections__["product-recommendations"]) return;
        try {

            class ProductRecommendations extends HTMLElement {
                constructor() {
                    super();

                    const handleIntersection = (entries, observer) => {
                        if (!entries[0].isIntersecting) return;
                        observer.unobserve(this);

                        fetch(this.dataset.url)
                            .then(response => response.text())
                            .then(text => {
                                const html = document.createElement('div');
                                html.innerHTML = text;
                                const recommendations = html.querySelector('product-recommendations');

                                if (recommendations && recommendations.innerHTML.trim().length) {
                                    this.innerHTML = recommendations.innerHTML;
                                }

                                if (html.querySelector('.grid__item')) {
                                    this.classList.add('product-recommendations--loaded');
                                }
                            })
                            .catch(e => {
                                console.error(e);
                            });
                    }

                    new IntersectionObserver(handleIntersection.bind(this), {
                        rootMargin: '0px 0px 200px 0px'
                    }).observe(this);
                }
            }

            customElements.define('product-recommendations', ProductRecommendations);

        } catch (e) {
            console.error(e);
        }
    })();

})();