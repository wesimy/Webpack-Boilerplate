/////////////////////////
// APP SCSS Entery Point
// Do not change this
///////////////////////////////////////////////
require("./index.en.scss");

//////////////////
// LIBRARY FILES
// Add your custom library requires here
// use: expose-loader  to expose a library to public access
////////////////////////////////////////////////////////////
require('expose-loader?$!expose-loader?jQuery!jquery');
require("expose-loader?window.Tether!tether");
require("bootstrap");
require('swiper'); 

//////////////////
// APP JS FILES
// do not change this
// Imports custom js modules in JS folder
//////////////////////////////////////////
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./js/', true, /\.js$/) );


//////////////////
// APP INIT
// Application Init module. 
////////////////////////////////////////////////////////////

$().ready(function(){
    alert('c');    
});
