const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;

let currentPath = "";
let editor = null;

function onLoad() {
    inputArea = document.getElementById("input_area");
    inputTxt = document.getElementById("input_txt");
    footerArea = document.getElementById("footer_fixed");

    editor = ace.edit("input_txt");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/twilight");
}


function openLoadFile() {
    const win = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(
        win,
        // property
        {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Documents',
                    extensions: ['txt','text','html','js']
                }
            ]
        },
        // callback
        function (filenames) {
            if (filenames) {
                readFile(filenames[0]);
            }
        }
    );
}

function readFile(path) {
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

    dialog.showMessageBox(win, {
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


function writeFile(path, data){
    fs.writeFile(path, dta, function (error){
        if (error != null) {
            alert('error:' + error);
            return;
        }
    });
}

function saveNewFile() {

    const win = BrowserWindow.getFocusedWindow();
    dialog.showSaveDialog(
        win,
        // property
        {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Documents',
                    extensions: ['txt','text','html','js']
                }
            ]
        },
        // callback
        function (filename) {
            if (filename) {
                var data = editor.getValue();
                currentPath = fileName;
                writeFile(currentPath, data);
            }
        }
    );
}

