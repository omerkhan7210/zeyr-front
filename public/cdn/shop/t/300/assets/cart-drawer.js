
class CartDrawer extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.closeDrawer());
        this.querySelector('#CartDrawer--overlay').addEventListener('click', () => this.closeDrawer());
        document.querySelector('#cart-icon-bubble').addEventListener('click', (e) => {
            e.preventDefault()
            this.openDrawer()
        });
    }

    openDrawer() {
        //document.activeElement.blur()         
        //document.querySelector('.drawer__container').focus()    
        if (!document.getElementById('CARTDRAWER')) {
            //loadCss('cart-drawer');

            setTimeout(() => {
                document.querySelector('cart-drawer').classList.add('drawer--active');
                document.body.classList.add('drawer--open');
            }, 250)
        } else {
            document.querySelector('cart-drawer').classList.add('drawer--active');
            document.body.classList.add('drawer--open');
        }

        if (document.querySelectorAll('drawer-dialog dialog[open]').length > 0) {
            document.querySelectorAll('drawer-dialog dialog[open]').forEach((e) => {
                e.closest('drawer-dialog').hide();
            });
        }

        setTimeout(() => {
            const containerToTrapFocusOn = this
            const focusElement = this.querySelector('.drawer__container')
            trapFocus(containerToTrapFocusOn, focusElement);
        }, 500)

    }

    closeDrawer() {

        if (document.querySelectorAll('drawer-dialog .drawer__container[open]').length == 0) {
            document.querySelector('cart-drawer').classList.remove('drawer--active');
            document.body.classList.remove('drawer--open');
        } else {
            document.querySelector('cart-drawer').classList.remove('drawer--active');
        }

        removeTrapFocus(this);
    }

    renderContents(parsedState) {
        this.productId = parsedState.id;
        this.getSectionsToRender().forEach((section => {
            const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
            sectionElement.innerHTML =
                this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
        }));

        this.openDrawer();
    }

    getSectionInnerHTML(html, selector = '.shopify-section') {
        return new DOMParser()
            .parseFromString(html, 'text/html')
            .querySelector(selector).innerHTML;
    }

    getSectionsToRender() {
        return [{
                id: 'cart-drawer',
                selector: '#CartDrawer'
            },
            {
                id: 'cart-icon-bubble'
            }
        ];
    }

    getSectionDOM(html, selector = '.shopify-section') {
        return new DOMParser()
            .parseFromString(html, 'text/html')
            .querySelector(selector);
    }

    setActiveElement(element) {
        this.activeElement = element;
    }
}
customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
    getSectionsToRender() {
        return [{
                id: 'CartDrawer',
                section: 'cart-drawer',
                selector: '.drawer__container'
            },
            {
                id: 'cart-icon-bubble',
                section: 'cart-icon-bubble',
                selector: '.shopify-section'
            }
        ];
    }
}
customElements.define('cart-drawer-items', CartDrawerItems);