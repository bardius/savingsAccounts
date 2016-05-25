/*
 Plugin: Dynamic table
 Authors: George Bardis
 */

/**
 * A jQuery plugin to visualize in a table panel of ul with data loaded via AJAX
 *
 * Usage:
 * $('.my-element').dynamic_table_plugin({ 'APIEndpoint': 'http://www.domain.com/API', 'hasLoader': true, 'callBack': cb });
 */

/**
 * Dynamic table module.
 * @module dynamic_table
 * @see module:dynamic_table
 */
(function ($) {

    'use strict';

    // Set the default values
    var defaults = {
        'APIEndpoint': null,    // The endpoint to provide data
        'hasLoader': false,     // If loader should be displayed on Ajax calls
        'callBack': null        // The callback to invoke after the Ajax call
    };

    /**
     * Get data and visualise as panel based on ul
     * @param {object} options
     */
    $.fn.dynamic_table_plugin = function (options) {
        options = $.extend(true, {}, defaults, options);
        var $tableElements = $(this);

        var loaderHtml = '<div class="c-loader">loading...</div>';
        var errorHtml = '<div class="c-error"></div>';

        // Chaining the promises to fetch and display data
        var dynamicTable = {

            // Getting the json data from the provided endpoint
            getData: function() {
                return $.getJSON(options.APIEndpoint).then(function(data) {
                    return data;
                })
                .fail(function(error) {
                    $('.c-loader').remove();
                    $('.c-error').html('<p>' + error.statusText + '. ' + error.responseText + '</p>');
                });
            },

            // Generating the markup from the data once fetch is completed
            getTableContents: function(data) {
                return this.getData().then(function(data) {
                    var tableHtml = '';
                    var tableHasNoticeHtml = '';
                    var tableCurrencyHtml = '';

                    if(data && data.products && data.products.length > 0){
                        var totalProducts = data.products.length;

                        for (var productIndex = 0; productIndex < totalProducts; productIndex++) {

                            if(data.products[productIndex].hasSpecialNotice){
                                tableHasNoticeHtml = '*';
                            }
                            else{
                                tableHasNoticeHtml = '';
                            }

                            if(data.currency === 'GBP'){
                                tableCurrencyHtml = '£';
                            }
                            else{
                                tableCurrencyHtml = '';
                            }

                            tableHtml +=
                                '<li class="c-accounts-table__row">' +
                                '<ul>' +
                                '<li class="accountTitle">' +
                                '<span class="value">' + data.products[productIndex].accountTitle + '</span>' +
                                '</li>' +
                                '<li class="accountType">' +
                                '<span class="legend">Interest rate: </span>' +
                                '<span class="value">' + data.products[productIndex].interestRate + '%' + tableHasNoticeHtml + '</span>' +
                                '</li>' +
                                '<li class="interestRate">' +
                                '<span class="legend">Minimum deposit: </span>' +
                                '<span class="value">' + tableCurrencyHtml + data.products[productIndex].minimumDeposit + '</span>' +
                                '</li>' +
                                '<li class="minimumDeposit">' +
                                '<span class="legend">Interest type: </span>' +
                                '<span class="value">' + data.products[productIndex].interestType + '</span>' +
                                '</li>' +
                                '</ul>' +
                                '</li>';
                        }
                    }
                    else {
                        $('.c-loader').remove();
                        $('.c-error').html('<p>No products exist.</p>');
                    }

                    return tableHtml;
                });
            },

            // Append the markup to the dom once the markup has been generated
            appendTableContents: function() {
                return this.getTableContents().then(function(tableHtml) {
                    $('.c-loader').remove();
                    $tableElements.append(tableHtml);

                    if(options.callBack !== null) {
                        options.callBack();
                    }
                });
            }
        };

        // Invoking the promise that appends the table data to the DOM
        if(options.APIEndpoint === null) {
            $('.c-loader').remove();
            $('.c-error').html('<p>No data source exists to load products from.</p>');

            if(options.callBack !== null) {
                options.callBack();
            }
        }
        else {
            dynamicTable.appendTableContents();
        }

        // Enhance the DOM elements with the dynamic table functionality
        return this.each(function() {
            $(this).find('.c-accounts-table__row').remove();
            $('.c-error').remove();
            $(this).after(errorHtml);

            if(options.hasLoader){
                $(this).after(loaderHtml);
            }
        });
    };

})(jQuery);
