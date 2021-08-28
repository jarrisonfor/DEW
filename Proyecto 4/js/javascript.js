let keydown = (e) => {
    e.preventDefault();
    key = (e.keyCode) ? e.keyCode : e.which;
    console.log(key)
    $('.key.c' + key).addClass('keydown');
};

let keyup = (e) => {
    e.preventDefault();
    key = (e.keyCode) ? e.keyCode : e.which;
    console.log(key)
    $('.key.c' + key).removeClass('keydown');
}

document.onkeyup = keyup;
document.onkeydown = keydown;

document.querySelectorAll('.key').forEach((buttonKey) => {
    // buttonKey.addEventListener('mousedown', keydown) no sirve, sale que hace click en el raton
    // buttonKey.addEventListener('mouseup', keyup) no sirve, sale que hace click en el raton
})