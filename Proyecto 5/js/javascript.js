class FileSystem {

    init = () => {
        document.getElementById('search').addEventListener('keyup', this._search);
        document.querySelectorAll("li>span:first-child").forEach((toggler) => {
            toggler.addEventListener("click", (e) => this._toggle(toggler));
        });
        document.querySelectorAll("button.btn.btn-primary").forEach((toggler) => {
            toggler.addEventListener("click", this._create);
        });
        document.querySelectorAll("button.btn.btn-danger").forEach((toggler) => {
            toggler.addEventListener("click", this._delete);
        });
    }

    _delete = (e) => {
        let element = e.target.parentNode
        if (element.classList.contains('file')) {
            element.parentNode.removeChild(element);
        } else if (element.classList.contains('folder')) {
            let ul = element.querySelector('ul');
            if (ul.querySelectorAll('li.file').length == 0) {
                element.parentNode.removeChild(element);
            }
        }
    }

    _createFile = (name) => {
        let file = document.createElement('li');
        file.classList.add('file');
        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-file');
        let text = document.createElement('span');
        text.classList.add('text');
        text.textContent = name;
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener("click", this._delete);
        file.append(icon);
        file.append(text);
        file.append(deleteButton);
        return file;
    }

    _createFolder = (name) => {
        let folder = document.createElement('li');
        folder.classList.add('folder');
        let span = document.createElement('span');
        span.addEventListener("click", (e) => this._toggle(span))
        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-folder-open');
        let text = document.createElement('span');
        text.classList.add('text');
        text.textContent = name;
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener("click", this._delete);
        let addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-primary');
        addButton.textContent = '+';
        addButton.addEventListener("click", this._create);
        let ul = document.createElement('ul');
        span.append(icon);
        span.append(text);
        folder.append(span);
        folder.append(deleteButton);
        folder.append(addButton);
        folder.append(ul)
        return folder;
    }

    _create = (e) => {
        let name = document.getElementById('create').value;
        let ul = e.target.parentNode.querySelector('ul');
        let exist = false;
        ul.childNodes.forEach((li) => {
            if (li.querySelector('.text').textContent == name) {
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

    _setParentStyle = (element, ) => {
        if(element.id != 'root'){
            element.style.display = ''
            this._setParentStyle(element.parentElement)
        }
    }

    _toggle = (toggler) => {
        toggler.parentElement.querySelector("ul").classList.toggle("hide");
        toggler.querySelector('i').classList.toggle('fa-folder');
        toggler.querySelector('i').classList.toggle('fa-folder-open');
    }

    _search = (e) => {
        let value = e.target.value;
        let elements = document.querySelectorAll('#root ul, .file, .folder');
        if (value) {
            elements.forEach((element) => {
                element.style.display = 'none';
            })
            document.querySelectorAll('.text').forEach((textSpan) => {
                if(textSpan.textContent.includes(value)){
                    this._setParentStyle(textSpan)
                }
            })
        } else {
            elements.forEach((element) => {
                element.style.display = '';
            })
        }
    }

}

var form = new FileSystem();
form.init()