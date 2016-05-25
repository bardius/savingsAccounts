/*
 Project: Savings Accounts
 Authors: George Bardis
 */

/*
 * Testing the functionality of the dynamic table plugin -- Sample
 * as a jQuery plugin
 */

describe('Savings Accounts Project Dynamic Table Plugin Tests', function () {
    var fixture;
    var $elem;
    var mockDataEndpoint;
    var $errorElem;

    beforeEach(function () {
        mockDataEndpoint = 'mockData/sampleSavingsAccountData.json';
        fixture = setFixtures('<ul id="test-element" class="c-accounts-table-test"></ul>');
        $elem = fixture.find('.c-accounts-table-test');
    });

    afterEach(function () {
    });

    it('should display error if no endpoint is provided', function () {
        $elem.dynamic_table_plugin({
            'APIEndpoint': null,
            'hasLoader': true,
            'callBack': null
        });

        $errorElem = $('.c-error');

        expect($errorElem[0]).toExist();
    });

    it('should execute the callback method', function () {
        $elem.dynamic_table_plugin({
            'APIEndpoint': null,
            'hasLoader': true,
            'callBack': function(){ $elem.addClass('callback-executed'); }
        });

        expect($elem[0]).toHaveClass('callback-executed');
    });
});
