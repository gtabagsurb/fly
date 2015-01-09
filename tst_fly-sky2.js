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

//var availableTags = ['London, United Kingdom (LHR - London Heathrow)','Anaa, French Polynesia (AAA - Anaa)','Arrabury, Australia (AAB - Arrabury)','Al Arish, Egypt (AAC - Al Arish International Airport)','Ad-Dabbah, Sudan (AAD - Ad-Dabbah)'];
var availableTags = [{"label":"Anaa, French Polynesia (AAA, Anaa)"},{"label":"Arrabury, Australia (AAB, Arrabury)"},{"label":"Al Arish, Egypt (AAC, Al Arish International Airport)"},{"label":"Ad-Dabbah, Sudan (AAD, Ad-Dabbah)"},{"label":"Annaba, Algeria (AAE, Les Salines)"},{"label":"Apalachicola, United States (AAF, Municipal)"},{"label":"Arapoti, Brazil (AAG, Arapoti)"},{"label":"Aachen, Germany (AAH, Aachen\/Merzbruck)"},{"label":"Arraias, Brazil (AAI, Arraias)"},{"label":"Awaradam, Suriname (AAJ, Cayana Airstrip)"},{"label":"Aranuka, Kiribati (AAK, Aranuka)"},{"label":"Aalborg, Denmark (AAL, Aalborg)"},{"label":"Mala Mala, South Africa (AAM, Mala Mala)"},{"label":"Al Ain, United Arab Emirates (AAN, Al Ain)"},{"label":"Anaco, Venezuela (AAO, Anaco)"},{"label":"Houston, TX, United States (AAP, Andrau Airpark)"},{"label":"Anapa, Russian Federation (AAQ, Vityazevo)"},{"label":"Aarhus, Denmark (AAR, Aarhus Airport)"},{"label":"Apalapsili, Indonesia (AAS, Apalapsili)"},{"label":"Altay, China (AAT, Altay)"},{"label":"Asau, Samoa (AAU, Asau)"},{"label":"Surallah, Philippines (AAV, Allah Valley)"},{"label":"Abbottabad, Pakistan (AAW, Abbottabad)"},{"label":"Araxa, Brazil (AAX, Araxa)"},{"label":"Al Ghaydah, Yemen (AAY, Al Ghaydah)"},{"label":"Ambriz, Angola (AAZ, Ambriz)"},{"label":"Aalesund, Norway (AES, Vigra)"},{"label":"Herlong, Norway (AHC, Amedee AAF)"},{"label":"Araak, Iran (AJK, Araak)"},{"label":"Aberdeen, United States (APG, Phillips AAF)"},{"label":"Fort Devens, Haiti (AYE, AAF Heliport)"},{"label":"Bialla, Papua New Guinea (BAA, Bialla)"},{"label":"Baker Island, United States (BAR, Baker Aaf)"},{"label":"El Paso, United States (BIF, Biggs Aaf)"},{"label":"Bolaang, Indonesia (BJG, Bolaang)"},{"label":"Blackstone, United States (BKT, Blackstone AAF)"},{"label":"Pohakuloa, Finland (BSF, Bradshaw AAF)"},{"label":"Boussaada, Algeria (BUJ, Ain Eddis)"},{"label":"Dibaa, United Arab Emirates (BYB, Dibaa)"},{"label":"Fort Irwin, United States (BYS, Bicycle Lake AAF)"},{"label":"Catacamas, Honduras (CAA, Catacamas)"},{"label":"Neerlerit Inaat, Greenland (CNP, Neerlerit Inaat)"},{"label":"Mineral Wells, Indonesia (CWO, Ft Wolter AAF)"},{"label":"Fort Belvoir, United States (DAA, Davison AAF)"},{"label":"Dar Es Salaam, Tanzania (DAR, International)"},{"label":"Dabaa City, Egypt (DBB, Alalamain Intl.)"},{"label":"Dugway, United States (DPG, Michael AAF)"},{"label":"Eagle, United States (EAA, Eagle)"},{"label":"Edgewood, United States (EDG, Weide AAF)"},{"label":"Laayoune, Western Sahara (EUN, Hassan I)"},{"label":"Faranah, Guinea (FAA, Faranah)"},{"label":"Faaite, French Polynesia (FAC, Faaite)"},{"label":"Fort Eustis, Haiti (FAF, Felker AAF)"},{"label":"Fort Bragg, United States (FBG, Simmons AAF)"},{"label":"Colorado Springs, United States (FCS, Butts AAF)"},{"label":"Yakima, United States (FCT, Firing Center AAF)"},{"label":"Petersburg, Netherlands (FLE, Fort Lee AAF)"},{"label":"Fort Leavenworth, United States (FLV, Sherman AAF)"},{"label":"Fort Meade, Haiti (FME, Tipton AAF)"},{"label":"Forest Park, United States (FOP, Morris AAF)"},{"label":"Fort Riley, KS, United States (FRI, Marshall AAF)"},{"label":"Fort Richardson, Haiti (FRN, Bryant AAF)"},{"label":"Fort Sill, United States (FSI, Henry Post AAF)"},{"label":"Fort Sheridan, Haiti (FSN, Haley AAF)"},{"label":"Fort Knox, United States (FTK, Godman AAF)"},{"label":"Guamal, Colombia (GAA, Guamal)"},{"label":"Tacoma, United States (GRF, Gray Aaf)"},{"label":"Fort Hood, TX, United States (GRK, Gray Aaf)"},{"label":"Hasvik, Norway (HAA, Hasvik)"},{"label":"Hanimaadhoo, Maldives (HAQ, Hanimaadhoo)"},{"label":"Vantaa, Finland (HEL, Helsinki-Vantaa)"},{"label":"Hoffman, United States (HFF, Mackall AAF)"},{"label":"Jolon, United States (HGT, Hunter AAF)"},{"label":"Killeen, United States (HLR, Fort Hood AAF)"},{"label":"Hopkinsville, United States (HOP, Campbell AAF)"},{"label":"Huntsville, United States (HUA, Redstone AAF)"},{"label":"Hyvinkaa, Finland (HYV, Hyvinkaa)"},{"label":"Igarka, Russian Federation (IAA, Igarka)"},{"label":"Galloway, Ireland (IIA, Inishmaan)"},{"label":"Ilaam, Iran (IIL, Ilaam)"},{"label":"Iraan, United States (IRB, Municipal)"},{"label":"Jalalabad, Afghanistan (JAA, Jalalabad)"},{"label":"Aasiaat, Greenland (JEG, Aasiaat)"},{"label":"Paamiut, Greenland (JFR, Frederikshab)"},{"label":"Josephstaal, Papua New Guinea (JOP, Josephstaal)"},{"label":"Qaarsut, Greenland (JQA, Qaarsut)"},{"label":"Kasama, Zambia (KAA, Kasama)"},{"label":"Kajaani, Finland (KAJ, Kajaani)"},{"label":"Kaadedhdhoo, Cote D'Ivoire (KDM, Kaadedhdhoo)"},{"label":"Koinghaas, South Africa (KIG, Koinghaas)"},{"label":"Kokkola\/Pietarsaari, Finland (KOK, Kruunupyy)"},{"label":"Kasaan, United States (KXA, Kasaan SPB)"},{"label":"Lamar, United States (LAA, Lamar Field)"},{"label":"Yuma, Indonesia (LGF, Laguna AAF)"},{"label":"Hinesville, United States (LIY, Wright AAF)"},{"label":"Alluitsup Paa, Greenland (LLU, Alluitsup Paa)"},{"label":"Laarbruch, Germany (LRC, R.A.F.)"},{"label":"Lathrop, United States (LRO, Sharpe AAF)"},{"label":"Lexington, United States (LSD, Creech AAF)"},{"label":"Columbus, United States (LSF, Lawson Aaf)"},{"label":"Chennai\/Madras, India (MAA, Madras International (meenambakkam))"},{"label":"Columbus, United States (MKF, Mckenna AAF)"},{"label":"Maan, Jordan (MPQ, Maan)"},{"label":"Maastricht, Netherlands (MST, Maastricht\/aachen)"},{"label":"Fort Indiantown, Haiti (MUI, Muir AAF)"},{"label":"Narrabri, Australia (NAA, Narrabri)"},{"label":"Qaanaaq, Greenland (NAQ, Qaanaaq)"},{"label":"Ozark, United States (OZR, Cairns AAF)"},{"label":"Pa-an, Myanmar (PAA, Pa-an)"},{"label":"Paama, New Caledonia (PBJ, Paama)"},{"label":"Fort Polk, United States (POE, Polk AAF)"},{"label":"Papeete, French Polynesia (PPT, Faa'a)"},{"label":"Akunnaaq, Greenland (QCU, Heliport)"},{"label":"Niaqornaarsuk, Greenland (QMK, Heliport)"},{"label":"Kangaatsiaq, Greenland (QPW, Heliport)"},{"label":"Ikerasaarsuk, Canada (QRY, Heliport)"},{"label":"Rakanda, Papua New Guinea (RAA, Rakanda)"},{"label":"Reading, United States (RDG, Municipal\/Spaatz Fld)"},{"label":"Rostock-laage, Germany (RLG, Laage)"},{"label":"Saratoga, United States (SAA, Shively Field)"},{"label":"Saarbruecken, Germany (SCN, Ensheim)"},{"label":"Saldanha Bay, South Africa (SDB, Langebaanweg)"},{"label":"Saarmelleek, Hungary (SOB, Saarmelleek\/balaton)"},{"label":"Savannah, GA, United States (SVN, Hunter AAF)"},{"label":"Philipsburg, St. Maarten, Netherlands (SXM, Princess Juliana International)"},{"label":"San Miguel, Canada (SYL, Roberts AAF)"},{"label":"Tarapaina, Solomon Islands (TAA, Tarapaina)"},{"label":"Fort Leonard Wood, United States (TBN, Forney AAF)"},{"label":"Taabo, Cote D'Ivoire (TBX, Taabo)"},{"label":"Tuscaloosa, United States (TCL, Van De Graaf)"},{"label":"Ulaanbaatar, Mongolia (ULN, Chinggis Khaan International)"},{"label":"Ulaangom, Mongolia (ULO, Ulaangom)"},{"label":"Underkhaan, Mongolia (UNR, Underkhaan)"},{"label":"Kuressaare, Estonia (URE, Kuressaare)"},{"label":"Vaasa, Finland (VAA, Vaasa)"},{"label":"Wales, United States (WAA, Wales)"},{"label":"Wee Waa, Australia (WEW, Wee Waa)"},{"label":"White Sands, United States (WSD, Condron AAF)"},{"label":"Anahim Lake, Canada (YAA, Anahim Lake)"},{"label":"Kugaaruk, Canada (YBB, Kugaaruk)"},{"label":"Alice Arm, Canada (ZAA, Alice Arm)"},{"label":"Aarhus Limo, Denmark (ZBU, Aarhus Limo)"},{"label":"Fictitious Point\/AA2, Germany (ZGZ, GermanRail Pass)"}];

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
        //source : availableTags,
      source : "search.php",      
     /* 
      source: function( request, response ) {
                    $.ajax({
                        url: "search.php",
                        dataType: "json",
                        type : 'Get',
                        data: {
                            q: request.term
                        },
                        success: function( data ) {
                            response( data );
                        }
                    });
                },
      */
        minChars : 3,
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

    var gpsLocation = new google.maps.LatLng(25.968647, -80.143572);

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