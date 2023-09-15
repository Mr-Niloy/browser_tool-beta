const speak = (p, voice = getVoice('Michelle')) => {
    if (p != '') {
        p.split('\n').forEach(text => {
            const ssu = new SpeechSynthesisUtterance(text);
            ssu.lang = 'en-US';
            ssu.voice = voice;
            speechSynthesis.speak(ssu);
            ssu.onend = () => btst.style.display = 'none'
        });
    }
};
speechSynthesis.cancel()
let voices = [];
const getVoice = voiceURI => {
    const voice = voices.find(voice => voice.voiceURI.includes(voiceURI));
    return voice;
};

const voicesChanged = () => {
    voices = speechSynthesis.getVoices();
};
voicesChanged();
speechSynthesis.addEventListener('voiceschanged', voicesChanged);

// hightlight
function getSelectionText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    }
}
// convart $ to ₹
function convartToinr(input) {
    fetch('https://v6.exchangerate-api.com/v6/5f84f4ead48925ef39fb2b37/latest/USD')
        .then((res) => res.json())
        .then(function (data) {
            var txt = input.replaceAll(' ', '').replaceAll(',', '').replaceAll('-', '')
            if (txt.includes('k') || txt.includes('K')) txt = String(parseFloat(txt) * 1000)
            if (txt.includes('m') || txt.includes('M')) txt = String(parseFloat(txt) * 1000000)
            if (txt.includes('b') || txt.includes('B')) txt = String(parseFloat(txt) * 1000000000)
            var inr = String(parseFloat(txt) * data.conversion_rates.INR)
            var log = dom.addOpt(dom.log(inr))
            setTimeout(() => {
                log.remove()
            }, inr.length * 800);
        });
}
function translate(txt) {
    open(`https://translate.google.com/?sl=auto&tl=bn&text=${txt.replaceAll(' ', '+')}&op=translate`)
}
function search(txt) {
    open(`https://www.google.com/search?q=${txt.replaceAll(' ', '+')}`)
}
function searchyt(txt) {
    open(`https://www.youtube.com/results?search_query=${txt.replaceAll(' ', '+')}`)
}
function amazon(txt) {
    open(`https://www.amazon.in/s?k=${txt.replaceAll(' ', '+')}`)
}
//startup
const dom = {
    option: function (name, txt) {
        var elm = document.createElement('button')
        elm.id = 'btb-' + name
        elm.classList.add('btb-opt')
        elm.innerHTML += txt ? `<p class="menu-item-p">${txt}</p>` : ''
        elm.innerHTML += this.icon[name]
        return elm
    },
    log: function (txt) {
        var p = document.createElement('p')
        p.innerText = txt
        p.classList.add('btb-log')
        return p
    },
    icon: {
        'stop': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle"
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />
                </svg>`,
        'spacker': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                    <path
                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                    <path
                        d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
                </svg>`,
        'translate': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate"
                        viewBox="0 0 16 16">
                        <path
                            d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                        <path
                            d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                    </svg>`,
        'dtoinr': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                   </svg>`,
        'yt': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>`,
        'google': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>`,
        'shop': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                </svg>`
    },
    addOpt: function (elm) { dBox.append(elm); return elm },
    togle: function (elm) {
        if (elm.style.display == 'none') elm.style.display = 'flex'
        else elm.style.display = 'none'
        return elm
    }
}
const dBox = document.createElement('div')
dBox.id = 'btb-menu'
dBox.innerHTML += `
<style>
    #btb-menu {
        position: fixed;
        display: flex;
        z-index: 9999999999;
        border: none;
        border-radius: 7px;
        padding: 7px 3px;
        backdrop-filter: blur(5px);
        box-shadow: 4px 5px 7px #0000008a;
        background : #2d2d2d96;
    }
    #btb-menu p{
        width: fit-content;
        height: fit-content;
        margin: auto 1em;
        color: white;
        text-align: center;
        font-size: 1em !important;
    }
    .menu-item-p{
        margin: auto !important;
    }
    .btb-opt{
        display: flex;
        text-transform: uppercase;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        margin: auto .5em;
        border: none;
        outline: none;
        border-radius: 5px;
        background: #2a2929ed;
        color: white;
        font-size: .9em !important;
        padding: 7px;
    }
    .btb-opt svg{
        width: fit-content;
        height: fit-content;
        margin: auto 6px;
        transform: scale(1.1);
    }
</style>`
dom.togle(dBox)
document.body.append(dBox)
var bts = dom.addOpt(dom.option('spacker', 'say'))
var btst = dom.addOpt(dom.togle(dom.option('stop', 'stop')))
var btt = dom.addOpt(dom.option('translate', 'translate'))
var btr = dom.addOpt(dom.option('dtoinr', 'to INR'))
dom.addOpt(dom.option('google', 'search')).onclick = () => search(getSelectionText())
dom.addOpt(dom.option('yt', 'youtube')).onclick = () => searchyt(getSelectionText())
dom.addOpt(dom.option('shop', 'amazon')).onclick = () => amazon(getSelectionText())

bts.onclick = () => {
    var selection = getSelectionText()
    speak(selection);
    btst.style.display = 'block'
}
btt.onclick = () => translate(getSelectionText())
btr.onclick = () => convartToinr(getSelectionText())
btst.onclick = () => { speechSynthesis.cancel(); btst.style.display = 'none'}

function hide(e) {
    if (e.target.tagName !== 'BUTTON') {
        dBox.style.display = 'none'
        document.removeEventListener('selectionchange', hide)
    }
}
function text(t) {
    dBox.querySelectorAll('.menu-item-p').forEach(e => e.style.display = t)
}
document.addEventListener('contextmenu', function (e) {
    if (getSelectionText()) {
        e.preventDefault()
        dBox.style.display = 'flex'
        dBox.style.top = e.y - 50 + 'px'
        {
            if (innerWidth - e.x < dBox.offsetWidth + 20) text('none')
            else text('block')
        }
        dBox.style.left = (e.x - (innerWidth - e.x < dBox.offsetWidth + 20 ? dBox.offsetWidth : 0)) + 'px'
        document.addEventListener('selectionchange', hide)
    }
})