/*
 Project: Savings Accounts Application
 Authors: George Bardis
*/

// Create a closure to maintain scope of the '$' and BARDIS
(function(BARDIS, $, window, document, undefined) {

    'use strict';

    $(function() {
        BARDIS.Config.init();
    });

    BARDIS.Config = {
        $body: $(document.body),
        savingsAccountsDataAPI: '/mockData/sampleSavingsAccountData.json',

        init: function() {
            BARDIS.windowResize.init();
            BARDIS.Config.displayDynamicTables();
        },

        // Apply the plugin that loads the json data into a list element
        displayDynamicTables: function(){
            $('.c-accounts-table').dynamic_table_plugin({
                'APIEndpoint': BARDIS.Config.savingsAccountsDataAPI,
                'hasLoader': true,
                'callBack': BARDIS.Config.initResponsiveTables
            });
        },

        // Apply the plugin that will make the list element responsive as a carousel
        initResponsiveTables: function(){
            $('.c-accounts-table').responsive_table_plugin({
                'rowSelector': 'c-accounts-table__row',
                'breakpoint': 1024
            });
        }
    };

    BARDIS.windowResize = {
        init: function() {
            // Execute required actions on debounched resize
            $(window).smartresize(function() {
                BARDIS.Config.initResponsiveTables();
            });
        }
    };

})(window.BARDIS = window.BARDIS || {}, jQuery, window, document);
