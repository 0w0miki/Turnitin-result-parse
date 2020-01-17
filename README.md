# Introduction
This script is used to parse results listed in `Turnitin_Originality_Report.html`

# How to use
## Load
There are several ways to load the script in browser.
### Use bookmark
* Create a new bookmark.
* Copy the following text into url/address.
  ```javascript
  javascript:void((function(){var e=document.createElement('script');e.setAttribute('src','https://raw.githack.com/0w0miki/Turnitin-result-parse/master/ShowUWant.js');document.body.appendChild(e);})())
  ```
* Click the bookmark.

### Use user script
* Install user script load extension/add-on like `Tampermonkey`, `ViolentMonkey`, `Greasemonkey` or `FireMonkey`.
* Add a new user script.
* Copy the code from `ShowUWant.js` to the user script.
* Maybe you need to modify the head of user script like the followings.
```javascript
// ==UserScript==
// @name         ShowUwant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  parse and show turnitin HTML results
// @author       miki0w0
// @match        *
// @grant        none
// ==/UserScript==
```

### Use Firefox Scratchpad
If you use Firefox browser, you can use scratchpad to run the script once. That means if you close the page or , you will loose your script
* Press `F12` and choose `Scratchpad (代码草稿纸)`.
* Paste the scrit into the scratchpad.
* Click `run`.

## Start parsing

# Note
If you have any feature request or if you find any bug, please do not hesitate to open an issue.

# TDL
- [x] Parse result
- [x] Jump to paper
