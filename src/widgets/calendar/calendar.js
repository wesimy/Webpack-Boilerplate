////
//Application Module
////////////////////

var eventCalendar = (function () {
    "use strict";

    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        if ($('#calendar').length > 0) {

            var eCal = $('#calendar').eCalendar();
            _getEvents($('#calendar').data('url'));
            //_eventsClickHandler();
        }

    },
        _getEvents = function (url) {

            var jqxhr = $.getJSON(url, function (d) {
                $('#calendar').eCalendar({
                    events: _mapEvents(d)
                });
                //_eventsClickHandler();
            })
                .fail(function () {
                    console.log("error");
                });
        },

        _mapEvents = function (list) {
            var events = [];
            $(list).each(function (i, e) {

                var event = {
                    title: e.title,
                    likes: e.likes,
                    comments: e.comments,
                    description: e.description,
                    datetime: new Date(parseInt(e.date)),
                    id: e.id,
                    url: e.url
                };
                events.push(event);
            });
            return events;
        },
        _eventsClickHandler = function () {
            console.log('bind');
            $('.eventBtn').on('click', function () {
                console.log('click');




            });
        };
    // Expose Global Functions
    return {
        init: init,
        bindEventsClickHandler: _eventsClickHandler
    };
})();
$().ready(function () {
    eventCalendar.init();

});





/**
 * @license e-Calendar v0.9.3
 * (c) 2014-2016 - Jhonis de Souza
 * License: GNU
 */

(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var showDetails = function () {
            $(this).popover('hide');
            $(this).closest(".calendar").find(".c-event-grid").show();
            var swiper = $(this).closest(".calendar").find('.swiper-container')[0];
            if (swiper) {
                swiper.swiper.update();
            }
        };
        var hideDetails = function () {
            $(this).closest(".calendar").find(".c-event-grid").hide();
        };

        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url !== '') {
                $.ajax({
                    url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cHeader = $('<div/>').addClass('c-header clearfix');
            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            //cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cHeader.append(cPrevious);
            cHeader.append(cMonth);
            cHeader.append(cNext);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');

                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[dayOfWeek]);
                cBody.append(cWeekDay);

                dayOfWeek++;
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                var cDayWrp = $('<div/>');
                cDayWrp.addClass('c-day-wrp');

                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDayWrp.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    var hasEvent;

                    for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].datetime;
                        if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('click', showDetails);
                            cDay.popover({
                                html: true,
                                trigger: 'hover',
                                placement: 'left',
                                animation: false
                            });
                            if (hasEvent){
                                var content = cDay.attr("data-content");
                                cDay.attr("data-content", content + "<h5>" + settings.events[j].title + "</h5>");
                            }
                            else{
                                cDay.attr("data-content", "<h5>" + settings.events[j].title + "</h5>");
                            }
                            hasEvent = true;
                        }
                    }



                    cDayWrp.html(day++);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDayWrp.html(dayOfNextMonth++);
                }
                cDay.append(cDayWrp);
                cBody.append(cDay);
            }
            var eventList = $('<section/>').addClass('widget widget-card-list vertical bg-brand');


            var headerContent = '<div class="row align-items-center"><div class="col-8"><i class="icon-bell"></i><h1>Events</h1></div><div class="col-4"><div class="widget-options"><i class="icon-bell"></i></div></div></div>';
            var header = $('<div/>').addClass('widget-header').html(headerContent);
            var swiper = '<div class="swiper-container"><div class="swiper-wrapper"></div></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>';
            var body = $('<div/>').addClass('widget-content');
            body.append(swiper)
            eventList.append(header);

            for (var i = 0; i < settings.events.length; i++) {

                var itemTemplate = '<div class="swiper-slide"><div class="tile-headline"><div class="details"><ul class="list-icons float-none d-block"><li class="data-likes"><i class="icon-like"></i></li><li class="data-comments"><i class="icon-comment"></i></li></ul><h2 class="data-title"></h2><div class="info"><span class="data-time"><i class="icon-comment"></i></span><span class="data-date"><i class="icon-comment"></i></span><span class="data-location"><i class="icon-comment"></i></span></div><a href="#">View Event <i class="icon-arrow-right"></i></a></div></div></div>';

                var d = settings.events[i].datetime;
                if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + 'th ' + settings.monthsAppr[d.getMonth()] + " " + d.getFullYear();
                    var time = lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);

                    var item = itemTemplate;
                    body.find(".swiper-wrapper").append(item);
                    settings.events[i].likes ? $(body).find(".tile-headline:last .data-likes").append(settings.events[i].likes) : $(body).find(".tile-headline:last .data-likes").remove();
                    settings.events[i].comments ? $(body).find(".tile-headline:last .data-comments").append(settings.events[i].comments) : $(body).find(".tile-headline:last .data-comments").remove();
                    settings.events[i].title ? $(body).find(".tile-headline:last .data-title").append(settings.events[i].title) : $(body).find(".tile-headline:last .data-title").remove();
                    date ? $(body).find(".tile-headline:last .data-date").append(date) : $(body).find(".tile-headline:last .data-date").remove();
                    time ? $(body).find(".tile-headline:last .data-time").append(time) : $(body).find(".tile-headline:last .data-time").remove();
                    settings.events[i].description ? $(body).find(".tile-headline:last .data-location").append(settings.events[i].description) : $(body).find(".tile-headline:last .data-location").remove();
                    settings.events[i].url ? $(body).find(".tile-headline:last a").attr("href", settings.events[i].url) : $(body).find(".tile-headline:last a").remove();
                }
            }
            eventList.append(body);
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).prepend(cHeader).append(cEvents);
            $(instance).find(".widget-options").on('click', hideDetails);
            var swiperContainer = $(instance).find('.swiper-container')[0];
            if (swiperContainer) {
                // var mySwiper = new Swiper (swiperContainer);     
                var conf = {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: $(swiperContainer).parent().find('.swiper-button-next'),
                    prevButton: $(swiperContainer).parent().find('.swiper-button-prev'),
                    //slidesPerView: spv,
                    speed: 300

                };
                var swiper = new Swiper($(swiperContainer), conf);
                $(swiperContainer).data('swiper', swiper);

            }
        }

        return print();
    };

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsAppr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        textArrows: { previous: ' ', next: ' ' },
        eventTitle: 'Eventos',
        url: '',
        events: [
            { likes: 0, comments: 0, title: '', description: '', datetime: new Date(2016, new Date().getMonth(), 12, 17) }
        ],
        firstDayOfWeek: 0
    };

}(jQuery));