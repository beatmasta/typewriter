/*
 * TypeWriter - jQuery Plugin
 * Plugin for typewriting effect for multiple-lined texts
 * separated by newline characters (\n)
 *
 * Copyright (c) 2013 Alex Vanyan (http://alex-v.net)
 * Version: 1.0
 * Requires: jQuery v1.4.2+
 *
 */

(function($) {

    $.fn.typeWriter = function(options) {
        var opts = $.extend( {}, $.fn.typeWriter.defaults, options );
        var self = this;
        return this.each(function() {
            var $this = $(this);
            var init = $.fn.typeWriter.init($this);
            var rowTimeout;

            // start animation
            window.setTimeout(function() {
                startTypeWriter(init.rowsArr);
            }, parseInt(opts.startDelay));

            // method to trigger start of typing
            var startTypeWriter = function(rowsArr) { startTypingRow(rowsArr, 0); };

            // API method to type one row of text
            var startTypingRow = function(rowsArr, index) {
                $this.append('<div class="typewriter-row"></div>');
                var j = 0;
                var charInterval = window.setInterval(function() {
                    if ( j < rowsArr[index].length ) {
                        $this.children().last().append(rowsArr[index][j++]);
                    } else {
                        window.clearInterval(charInterval);
                        if ( typeof opts.rowComplete === "function" ) opts.rowComplete.call();
                        if ( ++index < rowsArr.length ) {
                            rowTimeout = window.setTimeout(function() {
                                startTypingRow(rowsArr, index);
                            }, parseInt(opts.typeRowDelay));
                        } else {
                            if ( typeof opts.complete === "function" ) opts.complete.call();
                        }
                    }
                }, parseInt(opts.typeDelay));
            };

        });

    };

    $.fn.typeWriter.init = function($this) {

        // member variables definition
        var vars = {
            html: $this.html(),
            htmlArr: $this.html().split("\n"),
            rowsArr: [],
            row: null
        };

        // check if text exists at all
        if ( ! vars.html ) {
            if ( window.console && typeof window.console.log === "function" ) {
                throw new Error("No html input given (newline separated text)");
            }
        }

        // iterate over text rows and push non-empty rows to stack array
        for ( var i in vars.htmlArr ) {
            row = $.trim(vars.htmlArr[i]);
            if ( row ) vars.rowsArr.push(row);
        }

        // check if there are no text rows after all
        if ( ! vars.rowsArr.length ) {
            if ( window.console && typeof window.console.log === "function" ) {
                throw new Error("Text string seems to be empty");
            }
        }

        // empty html of current element to start setting the content row-by-row
        $this.html('');

        // return variables containing split text
        // and empty variables to be defined later
        return vars;
    };

    // default options: do not change!
    $.fn.typeWriter.defaults = {
        startDelay: 100,
        typeDelay: 100,
        typeRowDelay: 100,
        rowComplete: null,
        complete: null
    };

})(jQuery);