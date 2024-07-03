/** Shopify CDN: Minification failed

Line 8:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 9:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 10:2 Transforming let to the configured target environment ("es5") is not supported yet

**/
const getStoredCookie = name => {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getStoredCookie('cookies-popup') === undefined || getStoredCookie('cookies-popup') !== 'closed') {
    document.querySelector('.cookies-popup').style.display = 'block'
}

document.getElementById('cookiesTrigger').addEventListener('click', () => {
    document.querySelector('.cookies-popup').style.display = 'none'
    document.cookie = `cookies-popup=closed; path=/; max-age=${60 * 60 * 24 * document.querySelector('.cookies-popup').dataset.cookies}`;
})