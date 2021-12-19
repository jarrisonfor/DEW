class FileSystem {

    init = () => { // All corresponding events are added (if there was a predefined structure)
        $('#search').on('keyup', this._search);
        $("li>span:first-child").each((i, toggler) => {
            $(toggler).on("click", (e) => this._toggle(toggler));
        });
        $("button.btn.btn-primary").each((i, toggler) => {
            $(toggler).on("click", this._create);
        });
        $("button.btn.btn-danger").each((i, toggler) => {
            $(toggler).on("click", this._delete);
        });
    }

    _delete = (e) => { // Delete an HTML element, if it is a folder, check that there is no file in that folder and in all of his subdirectorys
        let element = $(e.target).parent();
        if (element.hasClass('file')) {
            element.remove();
        } else if (element.hasClass('folder')) {
            let ul = element.find('ul');
            if (ul.find('li.file').length == 0) {
                element.remove();
            }
        }
    }

    _createFile = (name) => { // Create the HTML structure of a file
        let file = $('<li></li>');
        file.addClass('file');
        let icon = $('<i></i>');
        icon.addClass('fa fa-file');
        let text = $('<span></span>');
        text.addClass('text');
        text.text(name);
        let deleteButton = $('<button></button>');
        deleteButton.addClass('btn btn-danger');
        deleteButton.text('x');
        deleteButton.on("click", this._delete);
        file.append(icon);
        file.append(text);
        file.append(deleteButton);
        return file;
    }

    _createFolder = (name) => { // Create the HTML structure of a folder
        let folder = $('<li></li>');
        folder.addClass('folder');
        let span = $('<span></span>');
        span.on("click", (e) => this._toggle(span))
        let icon = $('<i></i>');
        icon.addClass('fa fa-folder-open');
        let text = $('<span></span>');
        text.addClass('text');
        text.text(name);
        let deleteButton = $('<button></button>');
        deleteButton.addClass('btn btn-danger');
        deleteButton.text('x');
        deleteButton.on("click", this._delete);
        let addButton = $('<button></button>');
        addButton.addClass('btn btn-primary');
        addButton.text('+');
        addButton.on("click", this._create);
        let ul = $('<ul></ul>');
        span.append(icon);
        span.append(text);
        folder.append(span);
        folder.append(deleteButton);
        folder.append(addButton);
        folder.append(ul)
        return folder;
    }

    _create = (e) => { // Create a folder or file, but only if it does not exist where is trying to create it
        let name = $('#create').val();
        let ul = $(e.target).parent().children('ul');
        let exist = false;
        ul.children().each((i, li) => {
            if ($(li).find('.text').text() == name) {
                exist = true;
            }
        });
        if (!exist) {
            if (name) {
                if (name.includes('.')){
                    ul.prepend(this._createFile(name));
                } else {
                    ul.append(this._createFolder(name));
                }
            }
        }
    }

    _setParentStyle = (element, ) => { // Remove the display style to all the parents until it reach the root element
        if(element.attr('id') != 'root'){
            element.css('display', '');
            this._setParentStyle(element.parent())
        }
    }

    _toggle = (toggler) => { // Closes or opens the folder to which it was clicked
        toggler.parent().find("ul").toggleClass("hide");
        toggler.find('i').toggleClass('fa-folder');
        toggler.find('i').toggleClass('fa-folder-open');
    }

    _search = (e) => { // Search filter
        let value = e.target.value;
        let elements = $('#root ul, .file, .folder');
        if (value) {
            elements.each((i, element) => {
                $(element).css('display', 'none');
            })
            $('.text').each((i, textSpan) => {
                textSpan = $(textSpan);
                if(textSpan.text().includes(value)){
                    this._setParentStyle(textSpan)
                }
            })
        } else {
            elements.each((i, element) => {
                $(element).css('display', '');
            })
        }
    }

}

var form = new FileSystem();
form.init()