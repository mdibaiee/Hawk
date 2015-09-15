# Hawk
The missing Firefox OS file manager

This app is under heavy development, things may change and break, but don't hesitate to test and fill issues in case you find bugs.

Please read the Features section below and issues to make sure your issue is not already listed.

Firefox OS 2.2 and up are supported. Sadly 2.0 and 1.3 miss a lot of ES6 functionalities as well as CSS3 features (flexbox, etc) which break our application.

![Mobile Portrait Mockup](https://github.com/mdibaiee/Hawk/raw/master/Mobile%20Portrait.png)

# Thanks to

Sergio Muriel [@tfeserver](https://twitter.com/tfeserver) for testing the application and helping me fix issues. ❤️🙏
Mohammad Jahani [@mamal72](https://twitter.com/mamal72) for ideas, and helping in designing the [webpage](http://dibaiee.ir/Hawk)

# Frequently Asked Questions

**Q: Why does Hawk create an `.empty` file inside new folders I create?**

This happens on Firefox OS devices below version 3, and that's because the API doesn't allow
listing empty folders, in order to show you the folder, Hawk has to fake the folder to have a child.


**Q: Why is Hawk slow?**

Hawk is much faster on Firefox OS 3.0 and up, and that's because the way old Device Storage API works,
it's slow by nature. Nothing we can do about it, sadly.


# Features

Version 1.0
-----------
- [x] Breadcrumb
- [x] Delete Files
- [x] Refresh
- [x] Rename Files
- [x] Error dialogs
- [x] Show / Hide hidden files
- [x] Show directories first
- [x] Create new files and directories
- [x] File Size
- [x] Directory Child Count
- [x] Actions on multiple files (selection)
- [x] Copy and Paste/Move files
- [x] File Preview (Supports PDF files!)
- [x] Filter Files
- [x] Swipe Gestures (Up directory by swiping right)
- [x] Search
- [x] First-run Tour
- [x] Share Files
- [x] Pick files


Version 2.0
------------
- [x] Different views (List, Grid)
- [ ] Show storage usage statistics (free/used)
- [ ] Sort Files
- [ ] Zip / Unzip
- [ ] Image Thumbnails
- [ ] FTP Browser
- [ ] Preferences
- [ ] File Type Icons
- [ ] Wi-Fi File Transfer (is this possible?)
