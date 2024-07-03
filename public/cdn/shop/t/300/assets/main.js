/** Shopify CDN: Minification failed

Line 17:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 18:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 20:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 21:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 32:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 33:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 35:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 36:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 45:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 72:2 Transforming let to the configured target environment ("es5") is not supported yet
... and 83 more hidden warnings

**/
// Load css file
const loadCss = (fileName) => {
    const fileId = `${fileName.toUpperCase()?.replace('-', '')}CSS`
    if (!document.getElementById(fileId)) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = fileId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = document.getElementById('MainCssPath').href.replace('/assets/main.css', `/assets/${fileName}.css`);
        link.media = 'all';
        head.appendChild(link);
    }
}

// Load js file
const loadScript = (fileName) => {
    const fileId = `${fileName.toUpperCase()?.replace('-', '')}JS`
    if (!document.getElementById(fileId)) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.id = fileId;
        script.type = 'text/javascript';
        script.src = document.getElementById('MainJsPath').src.replace('/assets/main.js', `/assets/${fileName}.js`);
        head.appendChild(script);
    }
}

// Scroll animation observer
const scrollAnimationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animation--active');
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    }
);

document.querySelectorAll('.scroll-animation').forEach((el, i) => {
    scrollAnimationObserver.observe(el);
});

// Add helper class when announcement bar is enabled
window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.announcement-bar') != null) {
        document.body.classList.add('is-announcement-bar');
    }
});

// Helper functions
function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function fetchConfig(type = 'json') {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': `application/${type}`
        }
    };
}

function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe, .drawer"
        )
    );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container);
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
        if (
            event.target !== container &&
            event.target !== last &&
            event.target !== first
        )
            return;

        document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function() {
        document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function(event) {
        if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
        // On the last focusable element and tab forward, focus the first element.
        if (event.target === last && !event.shiftKey) {
            event.preventDefault();
            first.focus();
        }

        //  On the first focusable element and tab backward, focus the last element.
        if (
            (event.target === container || event.target === first) &&
            event.shiftKey
        ) {
            event.preventDefault();
            last.focus();
        }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();
}

function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    const summaryElement = openDetailsElement.querySelector('summary');
    openDetailsElement.removeAttribute('open');
    summaryElement.setAttribute('aria-expanded', false);
    if (document.body.classList.contains('mmenu--open')) {
        document.body.classList.remove('mmenu--open')
    }
    summaryElement.focus();
}

// Details animation
document.querySelectorAll('details summary').forEach((summary) => {
    summary.addEventListener('click', (event) => {
        event.preventDefault();
        const details = event.target.closest('details');
        event.currentTarget.setAttribute('aria-expanded', !details.hasAttribute('open'));

        if (details.hasAttribute('open')) {
            details.classList.remove('details--active');
            setTimeout(() => {
                details.removeAttribute('open')
            }, 500)
        } else {
            details.setAttribute('open', '')
            setTimeout(() => {
                details.classList.add('details--active');
            }, 250)
        }

        if (event.currentTarget.classList.contains('mmenu__hamburger')) {
            document.body.classList.toggle('mmenu--open')
            document.body.classList.toggle('body-overlay')
            summary.parentElement.addEventListener('keyup', onKeyUpEscape)
        }
    });

    // Disable details functionality on desktop
    const mobileOnlyDetails = (summary) => {
        const details = summary.closest('details');

        if (details.classList.contains('mobile--only')) {
            if (window.innerWidth < 769) {
                details.removeAttribute('open')
                details.classList.remove('details--active')
                summary.setAttribute('aria-expanded', false)
            } else {
                details.setAttribute('open', '')
                details.classList.add('details--active')
                summary.setAttribute('aria-expanded', true)
            }
        }
    }

    window.addEventListener('DOMContentLoaded', mobileOnlyDetails(summary))
    window.addEventListener('resize', () => {
        mobileOnlyDetails(summary)
    })
});
class VariantSelects extends HTMLElement {
    constructor() {
        super();
        this.onLoad()
        this.addEventListener('change', this.onVariantChange);
    }

    onVariantChange() {
        this.updateOptions();
        this.updateMasterId();
        this.toggleAddButton(true, '', false);
        this.updatePickupAvailability();
        this.removeErrorMessage();

        if (!this.currentVariant) {
            this.toggleAddButton(true, '', true);
            this.setUnavailable();
        } else {
            this.updateMedia();
            this.updateURL();
            this.updateVariantInput();
            this.renderProductInfo();
            this.updateShareUrl();
            this.updateUnavailableVariants()
            this.updateSelectedValues()
        }
    }

    onLoad() {
        this.updateUnavailableVariants()
    }

    updateOptions() {
        this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
    }

    updateMasterId() {
        this.currentVariant = this.getVariantData().find((variant) => {
            return !variant.options.map((option, index) => {
                return this.options[index] === option;
            }).includes(false);
        });
    }

    updateMedia() {
        if (!this.currentVariant) return
        if (!this.currentVariant.featured_media) return

        const variantImage = this.currentVariant.featured_media.preview_image.src;

        if (this.closest('.product-card')) {
            const media = this.closest('.product-card').querySelector('.product-card__media .media--primary')
            media.innerHTML = `<img src="${variantImage}&width=1440">`
        } else {
            const carousel = document.querySelector('#main-carousel')
            if (!carousel) return
            const media = carousel.querySelector(`.splide__slide[data-media-position="${this.currentVariant.featured_media.position}"]`)
            const mediaContainer = carousel.querySelector('.splide__list')

            if (carousel.classList.contains('is-active')) {
                var Slides = main.Components.Slides.filter('.product__media-item');

                if (Slides[this.currentVariant.featured_media.position]) {
                    main.go(Slides[this.currentVariant.featured_media.position].index);
                }
            } else {
                mediaContainer.prepend(media)
            }
        }
    }

    updateURL() {
        if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
        window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }

    updateShareUrl() {
        const shareButton = document.getElementById(`Share-${this.dataset.section}`);
        if (!shareButton) return;
        const urlInput = shareButton.querySelector('input')
        let urlToShare = urlInput ? urlInput.value : document.location.href
        const url = `${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`
        urlToShare = url
        urlInput.value = url
    }

    updateVariantInput() {
        if (this.closest('.product-card')) {
            if (this.closest('form')) {
                const productCardInput = this.closest('form').querySelector('input[name="id"]');
                productCardInput.value = this.currentVariant.id;
                productCardInput.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
            }
        } else {
            const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
            productForms.forEach((productForm) => {
                const input = productForm.querySelector('input[name="id"]');
                input.value = this.currentVariant.id;
                input.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
            });
        }
    }

    updatePickupAvailability() {
        const pickUpAvailability = document.querySelector('pickup-availability');
        if (!pickUpAvailability) return;

        if (this.currentVariant && this.currentVariant.available) {
            pickUpAvailability.style.display = 'block';
        } else {
            pickUpAvailability.style.display = 'none';
        }
    }

    removeErrorMessage() {
        const section = this.closest('section');
        if (!section) return;

        const productForm = section.querySelector('product-form');
        if (productForm) productForm.handleErrorMessage();
    }

    renderProductInfo() {
        fetch(`${this.dataset.url.split('?')[0]}.json`)
            .then((response) => response.json())
            .then((data) => {
                const variant = data.product.variants.filter(v => {
                    return v.id === this.currentVariant.id
                })

                // const symbol = document.querySelectorAll('.price-item')[0].innerHTML.charAt(0)
                // let currency = document.querySelectorAll('.price-item')[0].innerHTML.split(' ')[1]	
                // if(currency == undefined) currency = ''	
                // let price, compare_price, badge, sticky_price
                // let compare_at_price = variant[0].compare_at_price
                // if(compare_at_price != '') {
                //   compare_at_price = symbol + variant[0].compare_at_price + ' ' + currency  
                // }        

                // if(this.closest('.product-card')) {                
                //   price = this.closest('.product-card').querySelector('.price-item--regular')
                //   compare_price = this.closest('.product-card').querySelector('.price-item--compare')          
                //   badge = this.closest('.product-card').querySelector('.badge--sale')
                // } else {
                //   price = this.closest('.product__info').querySelector('.price-item--regular') 
                //   sticky_price = this.closest('.product-wrapper').querySelector('.sticky-atc .price-item--regular')     
                //   compare_price = this.closest('.product__info').querySelector('.price-item--compare')                    
                //   badge = this.closest('.product__info').querySelector('.badge--sale')
                // }

                // if(price.closest('.price').querySelector('.price-varies__label')) {
                //   price.closest('.price').querySelector('.price-varies__label').remove()  
                // }

                // if(sticky_price.closest('.price').querySelector('.price-varies__label')) {
                //   sticky_price.closest('.price').querySelector('.price-varies__label').remove()  
                // }

                // price.innerHTML = symbol + variant[0].price + ' ' + currency                  
                // sticky_price.innerHTML = symbol + variant[0].price + ' ' + currency 

                // if(compare_price != undefined || compare_price != null) {          	
                //   compare_price.innerHTML = compare_at_price	
                //   if(compare_at_price != '') {            	
                //     if(badge) badge.classList.remove('visually-hidden')            	
                //   } else {	
                //     if(badge) badge.classList.add('visually-hidden')            	
                //   }	

                // } else {	
                //   if(compare_at_price != ''){	
                //     const compare_price_new = document.createElement('div')	
                //     compare_price_new.classList.add('price-item')	
                //     if(this.closest('.product-card')) {	
                //       compare_price_new.innerHTML = `<s class="price-item price-item--compare">${compare_at_price}</s>`	
                //     } else {	
                //       compare_price_new.innerHTML = `<s class="price-item price-item--compare">${compare_at_price}</s><span class="badge badge--sale">Sale</span>`	
                //     }                    	

                //     price.closest('.price-item--regular').parentNode.insertBefore(compare_price_new, price.closest('.price-item--regular').nextSibling);          	
                //   } 
                // }

                if (document.getElementById('VariantSku')) {
                    document.getElementById('VariantSku').textContent = this.currentVariant.sku
                }

                this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
            })
    }

    toggleAddButton(disable = true, text, modifyClass = true) {
        let productForm;

        if (this.closest('.product-card')) {
            productForm = this.closest('form')
        } else {
            productForm = document.querySelector(`.single-product--form`);
        }

        if (!productForm) return;
        const addButton = productForm.querySelector('[name="add"]');
        const addButtonText = productForm.querySelector('[name="add"] > span');
        if (!addButton) return;

        if (disable) {
            addButton.setAttribute('disabled', 'disabled');
            if (text) addButtonText.textContent = text;

            addButton.style.display = 'none';
        } else {
            addButton.removeAttribute('disabled');
            addButtonText.textContent = window.variantStrings.addToCart;

            addButton.style.display = 'flex';
        }

        if (!modifyClass) return;
    }

    setUnavailable() {
        let productForm
        if (this.closest('.product-card')) {
            productForm = this.closest('form')
        } else {
            productForm = document.querySelector(`.single-product--form`);
        }

        const addButton = productForm.querySelector('[name="add"]');
        const addButtonText = productForm.querySelector('[name="add"] > span');

        if (addButton) {
            addButtonText.textContent = window.variantStrings.unavailable;
        }

        if (addButton.hasAttribute('hidden')) {
            addButton.removeAttribute('hidden')
            setTimeout(() => addButton.setAttribute('hidden', ''), 3000)
        } else {

        }
    }

    getVariantData() {
        this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
        return this.variantData;
    }

    getSelectedOption(i) {
        if (this.dataset.type == 'select') {
            return this.querySelectorAll('.product-form__input')[i].querySelector('select').value;
        } else {
            let selectedOption = null;
            this.querySelectorAll('.product-form__input')[i].querySelectorAll('input').forEach(elm => {
                if (elm.checked) selectedOption = elm.value
            });
            return selectedOption;
        }
    }

    setDisabledOption(i, option) {
        if (this.dataset.type == 'select') {
            //this.querySelectorAll('.product-form__input')[i].querySelector(`.variant-option[value="${option}"]`).setAttribute('disabled', '')
            this.querySelectorAll('.product-form__input')[i].querySelector(`.variant-option[value="${option}"]`).classList.add('sold-out')
        } else {
            this.querySelectorAll('.product-form__input')[i].querySelector(`.variant-option[value="${option}"]`).classList.add('sold-out')
        }
    }

    resetDisabledOption(i) {
        this.querySelectorAll('.product-form__input')[i].querySelectorAll('.variant-option').forEach((elm) => {
            if (this.dataset.type == 'select') {
                elm.removeAttribute('disabled');
            } else {
                elm.classList.remove('sold-out');
            }
        })
    }

    updateUnavailableVariants() {
        if (this.dataset.hideVariants == 'true') {
            let options1 = {},
                options2 = {},
                options3 = {},

                option1Selected = null,
                option2Selected = null;

            if (this.dataset.variants > 1) {
                option1Selected = this.getSelectedOption(0);
                this.resetDisabledOption(1);
            }
            if (this.dataset.variants > 2) {
                option2Selected = this.getSelectedOption(1);
                this.resetDisabledOption(2);
            }

            this.getVariantData().forEach((el) => {
                if (this.dataset.variants > 0) {
                    if (!options1[el.option1]) {
                        options1[el.option1] = [];
                    }
                    options1[el.option1].push(String(el.available));
                }
                if (this.dataset.variants > 1) {
                    if (!options2[el.option2]) {
                        options2[el.option2] = [];
                    }
                    options2[el.option2].push(String(el.available));
                }
                if (this.dataset.variants == 1) {
                    if (!el.available) {
                        this.setDisabledOption(0, el.option1);
                    }
                }
                if (this.dataset.variants == 2) {
                    if (el.option1 == option1Selected) {
                        if (!el.available) this.setDisabledOption(1, el.option2);
                    }
                }
                if (this.dataset.variants > 2) {
                    if (!options3[el.option3]) {
                        options3[el.option3] = [];
                    }
                    options3[el.option3].push(String(el.available));
                    if (el.option2 == option2Selected && el.option1 == option1Selected && !el.available) {
                        this.setDisabledOption(2, el.option3);
                        this.querySelectorAll('.product-form__input')[2].querySelector(`.variant-option[value="${el.option3}"] + label .variant-option-labels__sold-out`).style.display = 'flex';
                    }

                    if (el.inventory_quantity == 6) {
                        this.querySelectorAll('.product-form__input')[2].querySelector(`.variant-option[value="${el.option3}"] + label .variant-option-labels__last-item`).style.display = 'block';
                    }
                }
            });
        }
    }

    updateSelectedValues() {
        if (this.dataset.variants > 2) {
            this.querySelectorAll('.product-form__input')[0].querySelector('#selectedOption').textContent = this.getSelectedOption(0)
            this.querySelectorAll('.product-form__input')[1].querySelector('#selectedOption').textContent = this.getSelectedOption(1)
            this.querySelectorAll('.product-form__input')[2].querySelector('#selectedOption').textContent = this.getSelectedOption(2)
        } else if (this.dataset.variants > 1) {
            this.querySelectorAll('.product-form__input')[0].querySelector('#selectedOption').textContent = this.getSelectedOption(0)
            this.querySelectorAll('.product-form__input')[1].querySelector('#selectedOption').textContent = this.getSelectedOption(1)
        } else {
            this.querySelector('.product-form__input').querySelector('#selectedOption').textContent = this.getSelectedOption(0)
        }
    }
}
customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
    constructor() {
        super();
    }

    updateOptions() {
        const fieldsets = Array.from(this.querySelectorAll('fieldset'));
        this.options = fieldsets.map((fieldset) => {
            return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
        });
    }
}
customElements.define('variant-radios', VariantRadios);

if (!customElements.get('modal-dialog')) {
    customElements.define('modal-dialog', class ModalDialog extends HTMLElement {
        constructor() {
            super();
            this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.hide());
            this.querySelector('#ModalOverlay').addEventListener('click', () => this.hide());
            this.querySelector('#ModalClose').addEventListener('click', (e) => {
                e.preventDefault()
                this.hide()
            });
            this.querySelectorAll('#ModalTrigger').forEach(el => el.addEventListener('click', (e) => {
                e.preventDefault()
                this.show()
            }));
        }

        hide() {
            this.querySelector('dialog').removeAttribute('open');
            this.querySelector('.modal').classList.toggle('modal--active');
            document.body.classList.remove('modal--open');
            removeTrapFocus(this.querySelector('dialog').focusElement);
        }

        show(focusElement) {
            this.querySelector('dialog').focusElement = focusElement;
            this.querySelector('dialog').setAttribute('open', '');
            this.querySelector('.modal').classList.toggle('modal--active');
            document.body.classList.add('modal--open');
            trapFocus(this);
        }
    });
}

if (!customElements.get('drawer-dialog')) {
    customElements.define('drawer-dialog', class DrawerDialog extends HTMLElement {
        constructor() {
            super();
            this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.hide());
            this.querySelector('#drawerOverlay').addEventListener('click', () => this.hide());
            this.querySelector('#drawerClose').addEventListener('click', (e) => {
                e.preventDefault()
                if (this.querySelector('#drawerClose').classList.contains('drawer__close-container-only')) {
                    this.hideContainer()
                } else {
                    this.hide()
                }

            });
            this.querySelectorAll('#drawerTrigger').forEach(el => el.addEventListener('click', (e) => {
                e.preventDefault()
                this.show()
            }));
        }

        hide() {

            this.querySelector('.drawer').classList.toggle('drawer--active');
            document.body.classList.remove('drawer--open');
            removeTrapFocus(this.querySelector('dialog').focusElement);

            setTimeout(() => {
                this.querySelector('dialog').removeAttribute('open');
            }, 250)
        }

        hideContainer() {
            this.querySelector('.drawer').classList.toggle('drawer--active');
            removeTrapFocus(this.querySelector('dialog').focusElement);

            setTimeout(() => {
                this.querySelector('dialog').removeAttribute('open');

                if (document.querySelectorAll('drawer-dialog dialog[open]').length == 0) {
                    document.body.classList.remove('drawer--open');
                }
            }, 250)
        }

        show(focusElement) {
            this.querySelector('dialog').setAttribute('open', '');

            setTimeout(() => {
                this.querySelector('.drawer').classList.toggle('drawer--active');
                document.body.classList.add('drawer--open');
                const containerToTrapFocusOn = this
                const focusElement = this.querySelector('.drawer__container')
                trapFocus(containerToTrapFocusOn, focusElement);
            }, 250)
        }
    });
}

class MainDrawer extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.closeDrawer());
        this.querySelector('.drawer--overlay').addEventListener('click', () => this.closeDrawer());
    }

    openDrawer() {
        this.focus()
        this.classList.add('drawer--active');
        document.body.classList.add('drawer--open');
    }

    closeDrawer() {
        this.classList.remove('drawer--active');
        setTimeout(() => {
            document.body.classList.remove('drawer--open');
        }, 500)
        document.activeElement.blur()
    }
}
customElements.define('main-drawer', MainDrawer);

class MenuDrawer extends HTMLElement {
    constructor() {
        super()

        this.bindEvents()
    }

    bindEvents() {
        this.querySelectorAll('.submenu__trigger').forEach(trigger => {
            trigger.addEventListener('click', (el) => {
                el.target.closest('li').querySelector('.menu-drawer__content').classList.add('submenu--active')
                document.querySelector('.mmenu-drawer .drawer__container').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    document.querySelector('.mmenu-drawer .drawer__container').classList.add('submenu--showing')
                }, 500)
            })
        })

        this.querySelectorAll('#MenuBreadcrumb0').forEach(el => {
            el.addEventListener('click', () => {
                if (el.closest('#MenuLevel2') && el.closest('#MenuLevel2').classList.contains('submenu--active')) {
                    el.closest('#MenuLevel2').classList.remove('submenu--active')
                }

                el.closest('#MenuLevel1').classList.remove('submenu--active')
                document.querySelector('.mmenu-drawer .drawer__container').classList.remove('submenu--showing')
            })
        })


        this.querySelectorAll('#MenuBreadcrumb1').forEach(el => {
            el.addEventListener('click', () => {
                el.closest('#MenuLevel2').classList.remove('submenu--active')
            })
        })
    }
}

customElements.define('menu-drawer', MenuDrawer);

if (!customElements.get('search-drawer')) {
    customElements.define('search-drawer', class SearchDrawer extends HTMLElement {
        constructor() {
            super();
            document.querySelectorAll('.search-trigger').forEach(el => el.addEventListener('click', () => this.show()));
            this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.hide());
            this.querySelector('#DrawerOverlay').addEventListener('click', () => this.hide());
            this.querySelector('#DrawerClose').addEventListener('click', () => this.hide());
        }

        hide() {
            this.classList.remove('drawer--active');
            document.body.classList.remove('drawer--open');
            removeTrapFocus(this.focusElement);
        }

        show(focusElement) {
            this.focusElement = focusElement;
            this.classList.add('drawer--active');
            document.body.classList.add('drawer--open');
            trapFocus(this);
            setTimeout(() => {
                this.querySelector('#SearchInput').focus();
            }, 250)
        }
    });
}