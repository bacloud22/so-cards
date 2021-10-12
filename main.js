String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return "" + hash;
};

// A verified version of btoa
function btoaVerified(s) {
    return btoa(s) + "@" + btoa(s).hashCode()
}

const domain = "https://so-c.me/card.html?";
// This is for version 2, data is not sent to server to assure user privacy
const domain2 = "https://so-c.me/card.html#";
const version = 2
var shortestString
// When necessary create a new implementation for URL codification.
// Anyway, it must be of form /card.html?{.*}|/d
function codify(formJSON) {
    switch (version) {
        case 0:
            shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain + btoa(shortestString) + `|${version}`   // version 0 
        case 1:
            shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain + btoaVerified(shortestString) + `%${version}`    // version 1 
        case 2:
            shortestString = /*domain +*/ Object.values(formJSON).join(",")
            return domain2 + btoaVerified(shortestString) + `%${version}`    // version 2 
        default:
            break;
    }
}

var formData
var limit = 181;
// Manipulate dom on key strokes
function handleFormKeyStrokes(event) {
    formData = new FormData(document.querySelector('.form1'));
    const formJSON = Object.fromEntries(formData.entries());
    const encodedString = codify(formJSON)
    var percentage = (encodedString.length / limit) * 100;
    setTimeout(() => changeProgress(percentage), 1000);
    console.log(encodedString.length);
}

// Manipulate dom on form submit
function handleFormSubmit(event) {
    event.preventDefault();
    formData = new FormData(document.querySelector('.form1'));
    differForConn()
}

// Attach handleFormKeyStrokes
const form = document.querySelector('.contact-form');
form.addEventListener('keyup', handleFormKeyStrokes);
form.addEventListener('submit', handleFormSubmit);
// Language selector.
function langChange(el) {
    document.documentElement.setAttribute('lang', el.value);
}

window.addEventListener('DOMContentLoaded', e => {
    let langOptions = Array.from(document.querySelector("#lang-select").options);
    let defaultLang = langOptions.filter(option => option.defaultSelected == true)[0];
    langChange(defaultLang);
});

function copyLink() {
    /* Get the text field */
    var copyText = document.getElementById("to_copy");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
}

function handleDom() {
    // for multi-selects, we need special handling
    const formJSON = Object.fromEntries(formData.entries());
    const encodedString = codify(formJSON)
    _id = (Math.random().toString(36).substr(4))
    // mcastUrl = "https://demo.httprelay.io/mcast/" + _id
    // const hotLink = encodedString + '===' + _id
    // console.log(hotLink)

    // const simpleURL = new URLSearchParams(formJSON).toString()
    new QRCode(document.getElementById("qrcode"), encodedString);
    var canvas = document.getElementById('qrcode').querySelector('canvas');
    var dataURL = canvas.toDataURL();
    var a = document.createElement('a');
    var linkText = document.createTextNode("Share my link");
    a.appendChild(linkText);
    a.title = "My link";
    a.href = encodedString;
    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><a download='my_qr_code.png' href='" + dataURL + "'>Download QR code</a> | ");
    document.querySelector('#link').appendChild(a);
    document.querySelector('#link').insertAdjacentHTML('beforeend', "<br><div style='display:flex'><input type='text' value='" + encodedString + "' id='to_copy' readonly><i class='fa fa-copy icon' onclick='copyLink()'></i></div>");
    console.log(encodedString);
}

const progressbar = document.querySelector(".progress");
const error = document.querySelector(".error");
const changeProgress = (progress) => {
    progressbar.style.width = `${progress}%`;
    if (progress > 100) {
        progressbar.style.width = `100%`;
        progressbar.style.backgroundColor = `black`;
        document.getElementById('submit').disabled = true;
        error.innerHTML= "You acceded text limit!";
    }else{
        progressbar.style.backgroundColor = `#47ff8d`;
        document.getElementById('submit').disabled = false;
        error.innerHTML= "";
    }
};

function differForConn() {
    setTimeout(
        function () {
            handleDom();
            // subscribe();
        }, 1000);
}
var _id;
var mcastUrl;

// $.ajaxSetup({ xhrFields: { withCredentials: true } });	// For cookies with SeqId

// var receive = function () {
//     $.get(mcastUrl)
//         .done(function (data) {
//             console.log(data);
//         }).always(function () {
//             receive();
//         })
// }
// async function subscribe() {
//     let response = await fetch(mcastUrl);
//     if (response.status == 502) {
//         // Status 502 is a connection timeout error,
//         // may happen when the connection was pending for too long,
//         // and the remote server or a proxy closed it
//         // let's reconnect
//         await new Promise(resolve => setTimeout(resolve, 10000));
//         await subscribe();
//     } else if (response.status != 200) {
//         // An error - let's show it
//         console.log(response.statusText);
//         // Reconnect in one second
//         await new Promise(resolve => setTimeout(resolve, 10000));
//         await subscribe();
//     } else {
//         // Get and show the message
//         let message = await response.text();
//         console.log(message);
//         // Call subscribe() again to get the next message
//         await new Promise(resolve => setTimeout(resolve, 10000));
//         await subscribe();
//     }
// }
// receive();