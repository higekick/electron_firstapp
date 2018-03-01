editor = ace.edit("input_txt");
editor.getSession().setMode("ace/mode/javascript");
editor.setTheme("ace/theme/twilight");

const {BrowserWindow, dialog} = require('electron').remote;

function openLoadFile() {
    const win = BrowserWindow.getFocusedWindow();

    dialog.showOpendialog(
        wind,
        // property
        {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Documents',
                    extensions: ['txt','text','html','js']
                }
            ]
        }
        // callback
        function (filenames) {
            if (filenames) {
                readFile(filenames[0]);
            }
        }
    )
}

const fs = require('fs');
funcion readFile(path) {
    currentPath = path;
    fs.readFile(path, function (error, text) {
        if (error != null) {
            alert('error:' + error);
            return;
        }
        // set file path to footer
        footerArea.innerHTML = path;
        // set text input area
        editor.setValue(text.toString(), -1);
    });
}

function saveFile() {
    if (currentPaht == "") {
        saveNewFile();
        return;
    }

    const win = BrowserWindow.getFocusedWindow();

    dialog.showMessageBos(win, {
            title: 'save file ovverride',
            type: 'info',
            buttons: ['OK', 'Cancel'],
            detail: 'sure to save?'
        },
        // callback when closing
        function (responce) {
            if (response == 0) {
                var data = editor.getValue();
                writeFile(currentPath, data);
            }
        }
    );
}

var fs = require('fs');

function writeFile(path, data){
    fs.writeFile(path, dta, function (error){
        if (error != null) {
            alert('error:' + error);
            return;
        }
    });
}

