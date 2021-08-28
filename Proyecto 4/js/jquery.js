$(window).on('keydown', function(e) {
    e.preventDefault();
    key = (e.keyCode) ? e.keyCode : e.which;
    $('.key.c' + key).addClass('keydown');
});

$(window).on('keyup', function(e) {
    e.preventDefault();
    key = (e.keyCode) ? e.keyCode : e.which;
    $('.key.c' + key).removeClass('keydown');
});

/* jQuery("#btn").on('click', function() {
    var $txt = jQuery("#screen");
    var caretPos = $txt[0].selectionStart;
    var textAreaTxt = $txt.val();
    var txtToAdd = "stuff";
    $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
}); */