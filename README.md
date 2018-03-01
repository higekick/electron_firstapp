my first electron app!

Thanks to the below article for studying electron(m__m)
https://ics.media/entry/7298

- to build app for Linux with electron-packager
$ sudo install electron-packager -g

$ electron-packager src FirstApp --platform=linux --arch=x64 --overwrite --electron-version=1.6.11

- to build app for Windows
replace --platform=linux to win32 in the above command.

- to load text with Shift-JIS
-- install iconv-lite
-- https://photo-tea.com/p/nodejs-shift-jis-read/
$ cd [to under src dir]
$ npm install iconv-lite --save

- to Read line via stream
-- install from2-string
$ cd [to under src dir]
$ npm install from2-string --save
