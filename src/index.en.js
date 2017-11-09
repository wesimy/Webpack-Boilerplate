/////////////////////////
// Library CSS Files
// Add your library css files here
///////////////////////////////////////////////
require('../node_modules/bootstrap/dist/css/bootstrap.css'); 
require('../node_modules/swiper/dist/css/swiper.css'); 
require('../node_modules/selectric/public/selectric.css'); 

//////////////////
// LIBRARY FILES
// Add your custom library js requires here
// use: expose-loader  to expose a library to public access
////////////////////////////////////////////////////////////
require('expose-loader?$!expose-loader?jQuery!jquery');
require('expose-loader?window.Tether!tether');

require('bootstrap');
require('swiper'); 
require('selectric');

require('../node_modules/waypoints/lib/jquery.waypoints');
require('TweenMax');
require('expose-loader?ScrollMagic!../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js');
require('animation.gsap');
require('jquery.ScrollMagic');

//////////////////  
// APP SCSS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
var requireSCSS = require.context('./fonts/', false, /\.scss$/);
requireSCSS.keys().forEach(requireSCSS);

var requireSCSS = require.context('./layout/', true, /\.scss$/);
requireSCSS.keys().forEach(requireSCSS); 

// var requireSCSS = require.context('./widgets/', true, /\.scss$/);
// requireSCSS.keys().forEach(requireSCSS); 

////////////////// 
// APP JS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
// var requireJS = require.context('./js', true, /\.js$/);
// requireJS.keys().forEach(requireJS); 

// require('expose-loader?app!./layout/main/main');
// require('expose-loader?app!./widgets/calendar/calendar');
// require('expose-loader?app!./widgets/treetable/treetable');
// require('expose-loader?app!./widgets/treetable/sortable');
// require('expose-loader?app!./layout/slider/slider');

//require('./js/forms');
