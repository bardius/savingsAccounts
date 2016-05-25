/*
 Plugin: Responsive Table
 Authors: George Bardis
 */

/**
 * A jQuery plugin converts a panel of ul to a carousel
 *
 * Usage:
 * $('.my-element').responsive_table_plugin();
 */


/**
 * Responsive table module.
 * @module responsive_table
 * @see module:responsive_table
 */
(function ($) {

    'use strict';

    // Set the default values
    var defaults = {
        'rowSelector': 'table__row',    // The selector for rows to be converted to slides
        'breakpoint': 800               // The breakpoint that responsive will kick in
    };

    /**
     * Get list panel table and convert it to carousel
     * @param {object} options
     */
    $.fn.responsive_table_plugin = function (options) {
        options = $.extend(true, {}, defaults, options);
        var totalWidth = $('.o-superWrapper').outerWidth();

        return this.each(function() {
            var $tableElement = $(this);
            var $rowElements = $tableElement.find('.' + options.rowSelector);
            var $activeRowElement = null;
            var $navigation = $('<div/>', {
                class: 'tableNavigation .' + options.rowSelector + '-tableNavigation'
            });

            var responsiveTable = {

                getNavigation: function($activeRowElement) {
                    var navigationHtml = '';
                    var $prevRow = $activeRowElement.prev();
                    var $nextRow = $activeRowElement.next();

                    if ($prevRow.length > 0 && $prevRow.hasClass(options.rowSelector)) {
                        navigationHtml += '<a href="#" class="tableNavigation__prev">&lt; ' + $prevRow.find('.accountTitle .value').text() + '</a>';
                    }

                    if ($nextRow.length > 0 && $nextRow.hasClass(options.rowSelector)) {
                        navigationHtml += '<a href="#" class="tableNavigation__next">' + $nextRow.find('.accountTitle .value').text() + ' &gt;</a>';
                    }

                    return navigationHtml;
                }
            };

            // Apply the transformation once when within breakpoint range
            if(totalWidth <= options.breakpoint && $('.tableNavigation').length < 1){
                // Call the convert to responsive method
                $rowElements.css('display', 'none');

                $rowElements.each(function(){
                    if($(this).hasClass('active')){
                        $activeRowElement = $(this);
                    }
                });

                if($activeRowElement === null){
                    $activeRowElement = $rowElements.eq(0);
                }

                // Generating and appending the navigation with its click handlers
                $navigation
                    .html(responsiveTable.getNavigation($activeRowElement))
                    .on('click touchstart', function(e){
                        e.preventDefault();
                        var $clickedNavigation = $(this);

                        $activeRowElement.fadeOut(0, function(){
                            if($(e.target).hasClass('tableNavigation__next')){
                                $activeRowElement.removeClass('active');
                                $activeRowElement = $activeRowElement.next();
                            }
                            else {
                                $activeRowElement.removeClass('active');
                                $activeRowElement = $activeRowElement.prev();
                            }

                            $activeRowElement.addClass('active').fadeIn(function(){
                                $clickedNavigation.html(responsiveTable.getNavigation($activeRowElement));
                            }, false);
                        }, false);
                    });

                $activeRowElement.addClass('active').fadeIn(function(){
                    $('.tableNavigation').remove();
                    $tableElement.after($navigation);
                }, false);
            }
            else if(totalWidth > options.breakpoint && $('.tableNavigation').length > 0){
                // Call the destroy method
                $rowElements.attr('style', '');
                $('.tableNavigation').remove();
            }
        });
    };

})(jQuery);
