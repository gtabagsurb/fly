function mainMenuItemClickHandler(e) {
    var target = $(this).attr('href');

    if (target.indexOf('#') != -1) {
        e.preventDefault();

        target = target.slice(1);

        $('html, body').animate({
            scrollTop: $("a[name='" + target + "']").offset().top
        }, 500);
    }
}

function getRelatedIataSuggestionInput(element) {
    return element.siblings("[type=hidden]");
}

function initializeDatePicker(link) {
    $(link).datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function(dateText) {
            var myDate = $(this).datepicker('getDate');

            var text =
                '<span class="flight-date-day">' + $.datepicker.formatDate('dd', myDate) + '</span>' +
                '<span class="flight-date-month">' + $.datepicker.formatDate('M', myDate) + '</span>' +
                '<span class="flight-date-year">' + $.datepicker.formatDate('yy', myDate) + '</span>';

            $(this).siblings('span.flight-date').html(text);
        }
    });
}

var availableTags = [
  "London, United Kingdom (LHR - London Heathrow)",
  "Anaa, French Polynesia (AAA - Anaa)",
  "Arrabury, Australia (AAB - Arrabury)",
  "Al Arish, Egypt (AAC - Al Arish International Airport)",
  "Ad-Dabbah, Sudan (AAD - Ad-Dabbah)"
];

// city, country (iata - name) 

//AAA|NTGA|Анаа||Анаа||+10.0|Французская Полинезия||PF|-17.355000|-145.508333|1500|3||||
//AAB|YARY||Arrabury||Arrabury|-10.0|Австралия|Australia|AU|-26.690556|141.047500|1144|101||||
//AAC|HEAR|||Аль-Ариш|Al Arish|+2.0|Египет|Egypt|EG|31.073333|33.835833|2650|37||||
//AAD|TVSV||||Ad-Dabbah|+3.0|Судан|Sudan|SD|17.592777777778|33.959166666667||||||
//AAE|DABB||Les Salines||Annaba|+1.0|Алжир|Algeria|DZ|36.822222|7.809444|3000|5||||
//AAF|KAAF||Municipal||Apalachicola|-5.0|США|United States|US|29.727607|-85.027442|1585|6||||
//AAG|SSYA||Arapoti||Arapoti|+0.0|Бразилия|Brazil|BR|-24.103875|-49.789078||805||||
//AAH|EDKA||Aachen/Merzbruck|Аахен|Aachen|+1.0|Германия|Germany|DE|50.823056|6.186111||190||||http://www.flugplatz-aachen.de/
//LHR|EGLL|Хитроу||Лондон||+0.0|Великобритания||GB|51.477500|-0.461389|3902|25|+44 (0)8700 000698|+44 (0)20 8745 4290|lhr3feedback@baa.com|http://www.heathrowairport.com

/*
var availableTags = [
  {label:"Испанский", value:"es"},
  {label:"Итальянский", value:"it"},
  {label:"Английский", value:"en"},
  {label:"Китайский", value:"zh"},
  {label:"Русский", value:"ru"}
];
*/

function initializeWayContainer(link) {
    $iataInputs = $(link).find(".iata-suggestion");

    $iataInputs.on("keypress", function() {
        getRelatedIataSuggestionInput($(this)).val("");
    });

    $iataInputs.autocomplete({
        //source : $("#order-form").data("way-suggestion-url"),
        source : availableTags,
        minChars : 2,
        select: function(event, ui) {
            event.preventDefault();

            jQuery(this).val(ui.item.label);
            getRelatedIataSuggestionInput(jQuery(this)).val(ui.item.value);
        }
    });

    //
    // Setup date pickers

    var datePickerFrom = $(link).find(".date-picker-inputs .flight-departing");
    var datePickerTo = $(link).find(".date-picker-inputs .flight-returning");

    var datePickerOnSelect = function($this) {
        var myDate = $this.datepicker('getDate');

        if (myDate === null)
            return; // Value is not picked yet

        var text =
            '<span class="flight-date-day">' + $.datepicker.formatDate('dd', myDate) + '</span>' +
                '<span class="flight-date-month">' + $.datepicker.formatDate('M', myDate) + '</span>' +
                '<span class="flight-date-year">' + $.datepicker.formatDate('yy', myDate) + '</span>';

        $this.siblings('span.flight-date').html(text);
    };

    var datePickerSettings = {
        dateFormat: "yy-mm-dd",
        onSelect: function(dateText) {
            datePickerOnSelect($(this));
        }
    };

    datePickerFrom.datepicker(datePickerSettings);
    datePickerTo.datepicker(datePickerSettings);

    if (datePickerFrom.datepicker('getDate') !== null)
        datePickerTo.datepicker("option", "minDate", datePickerFrom.datepicker('getDate'));

    datePickerFrom.datepicker("option", 'onClose', function(selectedDate) {
        datePickerTo.datepicker("option", "minDate", selectedDate);

        datePickerOnSelect(datePickerTo);
    });

//    datePickerTo.datepicker("option", 'onClose', function(selectedDate) {
//        datePickerFrom.datepicker("option", "maxDate", selectedDate);
//    });

    $(link).find(".date-picker-inputs .input-date").on("click", function() {
        $(this).children('input').datepicker("show");
    });
}

function createRangeBox($options) {
    return {

    };
}

function initializeDecoratedInput(selector, limitMinValue, limitMaxValue) {
    selector.data("range-min-value", limitMinValue);
    selector.data("range-max-value", limitMaxValue);

    var input = $(selector).find('.value-holder');
    var label = $(selector).find('.label-holder');

    var plusButton = $(selector).find('.input-quant-plus');
    var minusButton = $(selector).find('.input-quant-minus');

    if (input.val() <= limitMinValue)
        minusButton.addClass('inactive');

    if (input.val() >= limitMaxValue)
        plusButton.addClass('inactive');

    plusButton.on("click", function(e) {
        e.preventDefault();

        var maxValue = selector.data("range-max-value");
        var minValue = selector.data("range-min-value");

        var value = parseInt($(input).val());

        if (value == maxValue) {
            return;
        }

        $(input).val(value + 1);
        $(label).text(value + 1);

        if (input.val() == maxValue)
            $(this).addClass('inactive');

        if (input.val() > minValue)
            minusButton.removeClass('inactive');
    });

    minusButton.on("click", function(e) {
        e.preventDefault();

        var maxValue = selector.data("range-max-value");
        var minValue = selector.data("range-min-value");

        var value = parseInt($(input).val());

        if (value == minValue)
            return;

        $(input).val(value - 1);
        $(label).text(value - 1);

        if (input.val() == minValue)
            $(this).addClass('inactive');

        if (input.val() < maxValue)
            plusButton.removeClass('inactive');
    });
}

function initializeMap($selector) {
    var mapCanvas = document.getElementById($selector);

    var styles = [
        { "featureType": "landscape", "stylers": [
            { "saturation": -100 },
            { "lightness": 65 },
            { "visibility": "on" }
        ] },
        { "featureType": "poi", "stylers": [
            { "saturation": -100 },
            { "lightness": 51 },
            { "visibility": "simplified" }
        ] },
        { "featureType": "road.highway", "stylers": [
            { "saturation": -100 },
            { "visibility": "simplified" }
        ] },
        { "featureType": "road.arterial", "stylers": [
            { "saturation": -100 },
            { "lightness": 30 },
            { "visibility": "on" }
        ] },
        { "featureType": "road.local", "stylers": [
            { "saturation": -100 },
            { "lightness": 40 },
            { "visibility": "on" }
        ] },
        { "featureType": "transit", "stylers": [
            { "saturation": -100 },
            { "visibility": "simplified" }
        ] },
        { "featureType": "administrative.province", "stylers": [
            { "visibility": "off" }
        ] },
        { "featureType": "water", "elementType": "labels", "stylers": [
            { "visibility": "on" },
            { "lightness": -25 },
            { "saturation": -100 }
        ] },
        { "featureType": "water", "elementType": "geometry", "stylers": [
            { "hue": "#ffff00" },
            { "lightness": -25 },
            {
                "saturation": -97
            }
        ]
        }
    ];

    var gpsLocation = new google.maps.LatLng(55.764949, 37.604927);

    var mapOptions = {
        center: gpsLocation,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    }

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
        position: gpsLocation,
        map: map
    });
}

$(document).ready(function() {
    $('#main-navigation-menu').find('a').on('click', mainMenuItemClickHandler);
    $('#back-to-top-button').on('click', mainMenuItemClickHandler);

    var wayCountInput = $("#orderform-waycount");

    var buttonAddWay =  $("#route-add-button");
    var buttonRemoveWay =  $("#route-remove-button");

    wayCountInput.val($(".order-form-flight").find(".way-item-container").length);

    buttonAddWay.on("click", function(e) {
        e.preventDefault();

        var container = $("#form-way-template").children().clone();
        initializeWayContainer(container);

        container.appendTo($("#multiple-route-container").find(".route-list"));

        var counter = parseInt(wayCountInput.val()) + 1;

        if (counter > 1)
            buttonRemoveWay.show('slow');

        wayCountInput.val(counter);
    });

    buttonRemoveWay.on("click", function(e) {
        e.preventDefault();

        var container = $(".order-form-flight").find(".way-item-container:last");
        var counter = parseInt(wayCountInput.val()) - 1;

        if (counter <= 1) {
            buttonRemoveWay.hide('slow');
        }

        container.remove();
        wayCountInput.val(counter);
    });

    $("#clients").find(".clients-slider").owlCarousel({
        dots: false,
        nav: true,
        navText: [
            '<span class="slider-arrow arrow-left"></span>',
            '<span class="slider-arrow arrow-right"></span>'
        ],
        stopOnHover: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 3,
        loop: false,
        autoHeight: false
    });

    initializeDecoratedInput($("#adults-count-input-container"), 1, 6);
    initializeDecoratedInput($("#kids-count-input-container"), 0, 4);

    $(".order-form-trip-type").find("input[type=radio]").on("change", function(e) {
        var container = $("#multiple-route-container");
        var ways = $(".route-list").find(".way-item-container");
        var routeControls = container.find('.route-controls');

        switch ($(this).val()) {
            case "roundtrip":
                $('.returning-date-container').show('slow');
                ways.not(":first").slideUp('slow');
                routeControls.hide('slow');
                break;
            case "oneway":
                $('.returning-date-container').hide('slow');
                ways.not(":first").slideUp('slow');
                routeControls.hide('slow');
                break;
            case "multiple":
                $('.returning-date-container').hide('slow');
                ways.slideDown('slow');
                routeControls.show('slow');
                break;
        }
    });

    $(".order-form-flight").find(".way-item-container").each(function(index, element) {
        initializeWayContainer($(element));
    });

    initializeMap('map-widget-container');
});