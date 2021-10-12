String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return "" + hash;
};

// A verified version of atob
function atobVerified(s) {
    [data, hash] = s.split("@")
    if (data.hashCode() === hash)
        return atob(data)
    else
        return ""
}

var version

// Gets URL encoding version 
// and extracts values based on that version
function reverse(url) {
    // Get and Substract version
    // [url, _id] = url.split('===')
    // mcastUrl = "https://demo.httprelay.io/mcast/" + _id
    version = parseInt(url.charAt(url.length - 1))
    url = url.substring(0, url.length - 2)
        // Implement incremental versions
    var url_
    switch (version) {
        case 0:
            url_ = atob(url.substring(1))
            return url_.split(",")
        case 1:
            url_ = atobVerified(url.substring(1))
            return url_.split(",")
        case 2:
            url_ = atobVerified(url.substring(1))
            return url_.split(",")
        default:
            break;
    }
}

var bugous = false
var url = window.location.href;
// get part after card.html in link
var vals = reverse(url.split('card.html')[1]);
if (typeof(vals) === 'undefined' || vals.length === 1) {
    bugous = true
}
var keys = ["user", "instagram", "youtube", "facebook", "twitter", "snapchat", "envelope", "phone"]
var colors = ["", "#c32aa3;", "#d71e18;", "#1877f2;", "#1da1f2;", "#fffc00;", "", ""]
const form = document.querySelector('.form1');

let _isMobile = false
    // device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    _isMobile = true
}
// Language selector.
function langChange(el) {
    document.documentElement.setAttribute('lang', el.value);
}

window.addEventListener('DOMContentLoaded', e => {
    let langOptions = Array.from(document.querySelector("#lang-select").options);
    let defaultLang = langOptions.filter(option => option.defaultSelected == true)[0];
    langChange(defaultLang);
});

// Manipulate dom based on values from URL
keys.forEach(function(key, i) {
    try {
        if (key === "envelope") {
            form.insertAdjacentHTML('beforeend', `&nbsp;<a href="mailto:${vals[i]}">${vals[i]}</a>`)
            return
        }
        if (key === "phone") {
            form.insertAdjacentHTML('beforeend', `<br>&nbsp;<a href="tel:${vals[i]}">${vals[i]}</a><br>`)
            return
        }
        if (key === "user") {
            document.querySelectorAll('.user').forEach(node => { node.innerHTML = vals[i] })
        }
        var x = document.createElement("I");
        x.setAttribute("class", `fa fa-${key} icon`);
        form.appendChild(x)

        var y = document.createElement("INPUT");
        y.setAttribute("class", "input-field");
        y.setAttribute("value", vals[i]);
        y.setAttribute("type", "text");
        y.setAttribute("style", `background-color: ${colors[i]}`)
        y.setAttribute("readonly", "readonly");
        form.appendChild(y)

    } catch (error) {
        bugous = true
    }
})

// Generate some art
if (!_isMobile && !bugous) {
    form.insertAdjacentHTML('afterend', generateSvg())
}

if (bugous) {
    // rollback
    form.innerHTML = ""
    var img = document.createElement('img');
    img.src = 'giphy.gif';
    form.appendChild(img);
    var p = document.createElement('p');
    p.innerText = "QR code or URL is probably wrong"
    form.appendChild(p);
}

// Just a simple generative art 
function getRandomItem(list) {
    var random_index = Math.floor(Math.random() * list.length);
    return list[random_index];
}

function generateSvg() {
    var svg = '';
    var width = 50;
    var height = 50;
    var width_choices = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
    var fill_choices = ['gray', 'gray', 'maroon', 'maroon', 'maroon', 'maroon', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'];
    var stroke_choices = [1, 3, 5];

    for (var index_x = 0; index_x < 7; index_x++) {
        for (var index_y = 0; index_y < 7; index_y++) {
            var rectangle_width = getRandomItem(width_choices);
            var rectangle_height = getRandomItem(width_choices);
            var random_fill_color = getRandomItem(fill_choices);
            var random_stroke_width = getRandomItem(stroke_choices);
            svg = svg + '<rect x="' + index_x * width + '" y="' + index_y * height +
                '" width="' + rectangle_width + '" height="' + rectangle_height +
                '" stroke="black" fill="' + random_fill_color + '" stroke-width="' + random_stroke_width + '"/>';
        }
    }
    return '<div id="art"> <svg width="400" height="400">' + svg + '</svg> </div>';
}

// var _id;
// var mcastUrl;
// $.ajaxSetup({ xhrFields: { withCredentials: true } });	// For cookies with SeqId
// $.post(mcastUrl, "holla");