const fs = require('fs');
const iconv = require('iconv-lite');
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
        editor.setValue("checking..", -1);
        if (error != null) {
            alert('error:' + error);
            return;
        }
        // set file path to footer
        footerArea.innerHTML = path;
        // UTF-8
        // var str = text.toString();
        //var buf = new Buffer(text, 'binary');
        //var str = iconv.decode(buf, "Shift_JIS");
        // check error
        var result = checkError(path);
        // set text input area
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

function checkError(path){
    var readline = require("readline");
    // load file with shift-jis encoding
    var stream = fs.createReadStream(path).pipe(iconv.decodeStream("Shift_JIS"));
    stream.setEncoding("utf-8");
    var result = "";
    var reader = readline.createInterface({input:stream});
    var i = 1;
    // read file one line by one
    reader.on('line', function(data){
            if (data.match(/^\*.+$/)) {
                // header per person
                var name = data.split(",")[4];
                result += name + "\n";
            }
            ret = checkLine(data);
            if (ret === ""){
                // data is correct;
                // or header per person
            }else{
                result += i + ":" + data + "\n";
            }
            i++;
        });
    reader.on('close', function(){
            result = result + "finish!!";
            editor.setValue(result, -1);
        });
}

function checkLine(line){
    // regEx for correct data
    var reg = new RegExp("^.+[0-9]{4}/[0-9]{2}/[0-9]{2}.+[0-9]{2}:[0-9]{2},,,[0-9]{2}:[0-9]{2},$");
    if (!reg.test(line)) {
        var regDate = new RegExp("^.+([0-9]{4}/[0-9]{2}/[0-9]{2}).+$");
        var dateStr = line.match(regDate)[0];
        var d = new Date(dateStr);
        var day = d.getDay();
        if (day === 0 || day === 6) {
            // Sat or Sun
            return "";
        }else{
            return line;
        }
    }else{
        // correct data
        return "";
    }
}
