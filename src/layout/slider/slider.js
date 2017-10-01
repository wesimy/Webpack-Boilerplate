////
//Application Module
////////////////////

var slider = (function () {
    "use strict";
    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        _swipeHandler();
    },
        //-----------------------------------------------------------------
        // swiper mapping functions
        //-----------------------------------------------------------------
        _swipeHandler = function (c) {

            $('.swiper-container').each(function (i, e) {
                var spv = $(e).data('size'); // slides per view


                var conf = {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: $(e).parent().find('.swiper-button-next'),
                    prevButton: $(e).parent().find('.swiper-button-prev'),
                    slidesPerView: spv,
                    speed: 1000

                };

                // Responsive Settings
                if ($(e).data('responsive')) {
                    var sm, md, lg;
                    sm = md = lg = spv;
                    if (e.hasAttribute('data-size-s')) {
                        sm = md = lg = $(e).data('sizeS');
                    }
                    if (e.hasAttribute('data-size-m')) {
                        md = lg = $(e).data('sizeM');
                    }
                    if (e.hasAttribute('data-size-l')) {

                        lg = $(e).data('sizeL');
                    }

                    conf.breakpoints = {
                        1140: {
                            slidesPerView: lg

                        },
                        960: {
                            slidesPerView: md

                        },
                        720: {
                            slidesPerView: sm
                        }
                    }
                }

                // freeMode Settings
                if ($(e).data('freemode')) {
                    conf.freeMode = true;
                }

                // effect Settings
                if ($(e).data('effect')) {
                    conf.effect = $(e).data('effect');
                }
                // speed Settings
                if ($(e).data('speed')) {
                    conf.speed = $(e).data('speed');
                }
                if ($(e).data('direction')) {
                    conf.direction = $(e).data('direction');
                }

                var swiper = new Swiper($(e), conf);
                $(e).data('swiper', swiper);

            });

        },
        reInit = function (s) {

            //  $('.swiper-container').each(function (i, e) {
            var spv = $(s).data('size'); // slides per view


            var conf = {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: $(s).parent().find('.swiper-button-next'),
                prevButton: $(s).parent().find('.swiper-button-prev'),
                slidesPerView: spv,
                speed: 1000

            };

            // Responsive Settings
            if ($(s).data('responsive')) {
                var sm, md, lg;
                sm = md = lg = spv;
                if (e.hasAttribute('data-size-s')) {
                    sm = md = lg = $(s).data('sizeS');
                }
                if (e.hasAttribute('data-size-m')) {
                    md = lg = $(s).data('sizeM');
                }
                if (e.hasAttribute('data-size-l')) {

                    lg = $(s).data('sizeL');
                }

                conf.breakpoints = {
                    1140: {
                        slidesPerView: lg

                    },
                    960: {
                        slidesPerView: md

                    },
                    720: {
                        slidesPerView: sm
                    }
                }
            }

            // freeMode Settings
            if ($(s).data('freemode')) {
                conf.freeMode = true;
            }

            // effect Settings
            if ($(s).data('effect')) {
                conf.effect = $(s).data('effect');
            }
            // speed Settings
            if ($(s).data('speed')) {
                conf.speed = $(s).data('speed');
            }
            if ($(s).data('direction')) {
                conf.direction = $(s).data('direction');
            }

            var swiper = new Swiper($(s), conf);
            $(s).data('swiper', swiper);

            //   });

        };


    // Expose Global Functions
    return {
        init: init,
        reInit: reInit
    };
})();
$().ready(function () {
    slider.init();

});