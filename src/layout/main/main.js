////
//Application Module
////////////////////

var app = (function () {
    "use strict";
    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {

        // Hide Preloader when page has loaded
        //_preLoaderHandler();
        //_scrollToTopHandler();
        //_customSelectBox(); 
        //_stickyNavHandler('sticky');
        //_countupNumbers($('.numeric-highlights'));
        //_socialSidebarHabdler($('.side-bar .social-links'));
        //_socialNavHandler($("#page-hd #social-links"));
        _toggleClassHandler();
        _stopPropagation();
        _navHandler();
        _circleProgress();
        _slimScroll();
        _tagsInput();
        _datepicker();
        _timepicker();
        _fileUpload();
        _contentEditor();
        _dropdown();
        _manageLinks();
        _treetable();
        _mobileNavBack();
        _tabs();
        //scrollToTop.init();

    },
        _tabs = function () {
            $('.nav-tabs a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            });
        },
        _mobileNavBack = function () {
            $("header nav .back a").on("click", function () {
                $(this).closest(".show").removeClass("show");
            })
        },
        _manageLinks = function () {
            $("body").on("click", ".template a.add", function () {
                var container = $(this).closest("form");
                duplicateTemplate(container, "template", "link-group");
            });
            $("body").on("click", ".link-group a.delete", function () {
                $(this).closest(".link-group").remove();
            });
            function duplicateTemplate(container, templateClassName, newClassName) {
                var tmp = $("." + templateClassName).clone();
                $("." + templateClassName).removeClass(templateClassName).addClass(newClassName);
                tmp.find("input").val('').closest("." + templateClassName);
                container.append(tmp);
            }
        },
        _treetable = function () {
            $(".tablesorter")
                .tablesorter()
                .treetable({
                    expandable: true,
                    onInitialized: function () {
                        zebra(".tablesorter");
                    },
                    onNodeCollapse: function () {
                        zebra(".tablesorter");
                    },
                    onNodeExpanded: function () {
                        zebra(".tablesorter");
                    }
                })
                .bind("sortEnd", function (e, t) {
                    zebra(".tablesorter");
                });

            function zebra(table) {
                $(table).find("tbody tr").removeClass("odd").removeClass("even");
                $(table).find("tbody tr:visible:odd").addClass("odd");
                $(table).find("tbody tr:visible:even").addClass("even");
            }
        },
        _datepicker = function () {
            $.fn.datepicker.dates['en'] = {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["S", "M", "T", "W", "T", "F", "S"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                format: "mm/dd/yyyy",
                titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
                weekStart: 0
            };
            $('[datepicker]').each(function (i) {
                var className = "datepicker-" + i;
                $(this).closest('.form-group').addClass(className);
                $("." + className).find('[datepicker]').datepicker({
                    orientation: 'bottom',
                    templates: {
                        leftArrow: '<i class="icon-chev-left"></i>',
                        rightArrow: '<i class="icon-chev-right"></i>'
                    },
                    autoclose: true,
                    container: "." + className,
                    maxViewMode: 0

                });

            });

        },
        _timepicker = function () {
            $('[timepicker]').timepicker({
                template: false,
                showInputs: false,
                minuteStep: 5,
                defaultTime: false
            });
        },
        _dropdown = function () {
            $('[select]').selectric();
        },

        _tagsInput = function () {
            $('[selectize]').selectize({
                plugins: ['remove_button'],
                delimiter: ',',
                persist: false,
                create: function (input) {
                    return {
                        value: input,
                        text: input
                    }
                },
                render: {
                    item: function (data, escape) {
                        return '<div>"' + escape(data.text) + '"</div>';
                    }
                },
                onDelete: function (values) {
                    // return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
                }
            });
        },


        _fileUpload = function () {

            $('[uploader] input').change(function () {
                var fullPath = $(this).val();
                if (fullPath) {
                    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                    var filename = fullPath.substring(startIndex);
                    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                        filename = filename.substring(1);
                    }
                    var container = $(this).closest("[uploader]");
                    container.find(".default").hide();
                    container.find(".has-value span").html(filename)
                    container.find(".has-value").show();
                }
            });

            $('[uploader] .has-value i').on("click", function (e) {
                e.stopPropagation();

                var container = $(this).closest("[uploader]");
                container.find("input").val('');
                container.find(".has-value").hide();
                container.find(".default").show();
            });
        },
        _contentEditor = function () {
            $('[editor]').each(function () {
                var placeholder = $(this).attr("placeholder");
                $(this).summernote({
                    placeholder: placeholder,
                    toolbar: [
                        // [groupName, [list of button]]
                        ['Insert', ['picture', 'link', 'video']],
                        ['Misc', ['fullscreen', 'undo', 'redo']]
                    ]
                });
            });

        },

        _circleProgress = function () {
            $('#circle').circleProgress({
                value: 0.5,
                size: 110,
                fill: {
                    color: '#fff'
                },
                thickness: 2
            });
        },

        _slimScroll = function () {
            $("[slimscroll]").mCustomScrollbar({ theme: "theme" });
        },
        //-----------------------------------------------------------------
        // Helper Function: Add CSS Class to page-hd element on scroll
        //-----------------------------------------------------------------
        _toggleClassHandler = function () {
            $("a[data-toggle-class]").on('click', function (e) {
                e.preventDefault();
                $($(this).attr('href')).toggleClass($(this).data('toggle-class'));
            });
        },
        //-----------------------------------------------------------------
        // Helper Function: Add CSS Class to page-hd element on scroll
        //-----------------------------------------------------------------
        _stickyNavHandler = function (c) {
            $(window).scroll(function () {
                if ($(window).scrollTop() <= 20) {
                    $('#page-hd').removeClass(c);
                } else {
                    $('#page-hd').addClass(c);
                }
            });
        },
        _navHandler = function () {
            $('.dropdown').on('shown.bs.dropdown', function () {
                var swiper = $(this).find('.swiper-container')[0];
                if (swiper) {
                    swiper.swiper.update();
                }
            });
        },
        _stopPropagation = function () {
            $('[stop-propagation]').on("click", function (e) {
                e.stopPropagation();
            });
        };


    // Expose Global Functions
    return {
        init: init
    };
})();
$().ready(function () {
    app.init();
    //scrollToTop.init(); 
});