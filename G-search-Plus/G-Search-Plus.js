const url = window.location.href;
const reg = new RegExp("^https://www.google.");

if (reg.test(url)) {
    browser.storage.sync.get(["settings"], function (value) {
        const settings = value.settings;
        const observer = new MutationObserver((records, observer) => records.forEach(record => {
            showLinks(record.addedNodes[0], settings, observer);
        }));
        observer.observe(document.getElementById('lb'), { childList: true });
    });
}

function showLinks(container, settings, observer) {
    if (container && container.matches('div[jsowner]:not([jsowner="ab_options"])')) {
        
        const searchWord = document.getElementById('lst-ib').value;
        for (let i of settings) {
            const tittle = i.tittle;
            const url = i.fUrl + encodeURIComponent(searchWord) + i.sUrl;
            showLink(container, tittle, url);
        }
        
        observer.disconnect();
    }
}

function showLink(moreContainer, title, url) {
    const manuItem = moreContainer.children[0];
    const element = document.createElement('a');

    const attributes = ['class', 'role', 'tabindex', 'jsaction', 'data-rtid', 'jsl'];
    for (let attribute of attributes) {
        element.setAttribute(attribute, manuItem.getAttribute(attribute));
    }
    element.setAttribute('href', url);
    element.innerText = title;

    moreContainer.appendChild(element);
}
