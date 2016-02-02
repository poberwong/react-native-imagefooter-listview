# React Native ImageFooter ListView  
[![](https://img.shields.io/npm/v/react-native-imagefooter-listview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-imagefooter-listview)[![](https://img.shields.io/travis/react-native-imagefooter-listview/rust.svg?style=flat-square)](https://www.npmjs.com/package/react-native-imagefooter-listview)  

this is a listview with a scrollable header with an image、title as well as a custom footer view.  

Of course, this special listView supports all properties provided by ListView, so you can use it just like a original ListView.

## Demo  
![](http://ww1.sinaimg.cn/large/005zU9b3gw1f0larnj2ymj30ku12a789.jpg)
![](http://ww1.sinaimg.cn/large/005zU9b3gw1f0l8xehcf3g30aa0iftsd.gif)  
[*SOURCE*](https://github.com/Bob1993/react-native-imagefooter-listview/blob/master/Example/index.ios.js)

## Usage
### install
`npm install react-native-imagefooter-listview --save`  

### Props  

 Name | Description | Default | Type
------|-------------|----------|-----------
title | title in header  | `title` | string
titleColor  | color of title | `white`| string
titleSize | size of title | `18` | number
headerStartHeight | height of header when start | `180` | number
headerEndHeight | height of header after scrolled | `64` | number
titleMarginTop | marginTop of title | `64` | number
headerImages | image you can put in | `null` | number or string
showsVerticalScrollIndicator | whether to show vertical indicator in listview | `false`| boolean
renderFooter | return the view you want to put the end of header | `null` | func

## License  
*MIT License*