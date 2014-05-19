/**
 * Zachys CountDown Module
 * Description: Countdown timer with a GUI
 * Author: Eubert Go
 * Date: 01/09/2014
*/
var countdown = (function ($) {

    // DOM elements
    var elementId;      // the countdown timer id
    var timerEl;        // the timer element on DOM
    var DOMControls = {
        Day0: 0,        // ones digit of days
        Day1: 0,        // tens digit of days
        Hrs0: 0,        // you know how it goes...
        Hrs1: 0,
        Min0: 0,
        Min1: 0,
        Sec0: 0,
        Sec1: 0
    };

    var interval;

    /* remaining time */
    var DAYS;
    var HRS;
    var MINS;
    var SECS;
    var SECS_LEFT;

    // constructor
    function countdown(id, timeRemaining) {

        elementId = id;
        timerEl = $(id);
        
        // set the module values for remaining time 
        DAYS = timeRemaining.days;
        HRS = timeRemaining.hrs;
        MINS = timeRemaining.mins;
        SECS = timeRemaining.secs;

        initControls();
    };

    /** 
	  *     @desc initializes the DOM elements and starts the countdown timer from "countdown.js"
	*/
    function initControls() {

        var childEl = $(elementId).children();                  // parent div
        DOMControls.Day0 = $(childEl[0]).children(".ones");     // ones digit of days
        DOMControls.Day1 = $(childEl[0]).children(".tens");     // tens digit of days
        DOMControls.Hrs0 = $(childEl[1]).children(".ones");     // and you know how it goes ...
        DOMControls.Hrs1 = $(childEl[1]).children(".tens");
        DOMControls.Min0 = $(childEl[2]).children(".ones");
        DOMControls.Min1 = $(childEl[2]).children(".tens");
        DOMControls.Sec0 = $(childEl[3]).children(".ones");
        DOMControls.Sec1 = $(childEl[3]).children(".tens");

        startTimer();
    };

    // Calculates the total number of seconds time remaining and starts the countdown
    function startTimer() {

        SECS_LEFT = (DAYS * 86400) + (HRS * 3600) + (MINS * 60) + SECS;
        interval = setInterval(decrement, 1000);
    }

    function decrement() {

        var secs;
        SECS_LEFT--;

        // Perform time calculations
        DAYS = parseInt(SECS_LEFT / 86400);
        secs = SECS_LEFT % 86400;

        HRS = parseInt(secs / 3600);
        secs = secs % 3600;

        MINS = parseInt(secs / 60);
        SECS = parseInt(secs % 60);

        updateImg();

        // if 0 time remaining, hide timer else show timer
        if (DAYS <= 0 && HRS <= 0 && MINS <= 0 && SECS <= 0) { hideTimer(); clearInterval(interval); } else { showTimer(); }
    }

    /** 
     *   @desc repositions each digit on the image based on the DAYS, HRS, MINS, SECS variables
	*/
    function updateImg() {

        adjustBackImg(DOMControls.Day0, getDigits(DAYS)[0]);
        adjustBackImg(DOMControls.Day1, getDigits(DAYS)[1]);
        adjustBackImg(DOMControls.Hrs0, getDigits(HRS)[0]);
        adjustBackImg(DOMControls.Hrs1, getDigits(HRS)[1]);
        adjustBackImg(DOMControls.Min0, getDigits(MINS)[0]);
        adjustBackImg(DOMControls.Min1, getDigits(MINS)[1]);
        adjustBackImg(DOMControls.Sec0, getDigits(SECS)[0]);
        adjustBackImg(DOMControls.Sec1, getDigits(SECS)[1]);
    };

    /** 
	*     @desc adjusts the background position of the timer image.
	*              Each digit of the timer is a DIV with a sprite background image,
	*              from "0 - 9" which is repositioned depending on the value parameter. 
    *     @param  {el} the element with the 0-9 digit background image
    *     @param {value} the number value
	*/
    function adjustBackImg(el, value) {

        value = value == null ? 0 : value;                      // The digit value
        var mutliplier = 21;                                    // The image dimension are 14 x 210, 210 / 10 digits = 21
        var yPos = -1 * mutliplier * (9 - value);               // Determin the y position
        $(el).css("background-position", "0px " + yPos + "px"); // Reposition background-image
    };

    /** 
    *   @desc breaks a number into seperate digits in array form
    *   @param {num} the number to be broken apart
    *   @returns {array} i.e. 347 creates int[] = { 7, 4, 3 } 
	*/
    function getDigits(num) {

        var digits = [];
        while (num >= 10) {
            digits.push(num % 10);
            num = Math.floor(num / 10);
        }
        digits.push(num);
        return digits;
    };

    return zachCountDown;

    /** 
    *   @desc hides the countdown timer on SearchLive.aspx and Default.aspx
	*/
    function hideTimer() {

        clearInterval(interval);    // clear interval that executes the AJAX call to retrieve server time

        if (timerEl.is(":visible"))                     // if the timer element is still visible
            window.location.assign(window.location.href)// reload page
        else if (timerEl != null)
            timerEl.hide();

        var imgBidEnds = $('.biddingEnds');
        if (imgBidEnds != null)
            imgBidEnds.hide();
    }

    /** 
    *   @desc shows the countdown timer on SearchLive.aspx and Default.aspx
	*/
    function showTimer() {

        if (timerEl.is(":visible")) // if the timer element is still visible
            return;
        else if (timerEl != null)
            timerEl.show();
    }

})(jQuery);


