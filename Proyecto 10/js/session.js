function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function closeSession() {
    setCookie('user_id', '', -1);
    document.location.href = "/";
}

let loginButton = $('#loginButton');
if (getCookie('user_id').length > 0) {
    loginButton.attr('href', '#');
    loginButton.empty();
    loginButton.append('<i class="fas fa-sign-out-alt"></i>');
    loginButton.attr('title', 'Close session');
    loginButton.on('click', closeSession);
} else {
    loginButton.attr('href', '/html/login.html');
}
