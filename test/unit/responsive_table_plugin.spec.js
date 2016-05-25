/*
 Project: Savings Accounts
 Authors: George Bardis
 */

/*
 * Testing the functionality of the responsive table plugin -- Sample
 * as a jQuery plugin
 */

describe('Savings Accounts Project Responsive Table Plugin Tests', function () {
    var fixture;
    var $elem;
    var totalWidth = 600;

    beforeEach(function () {
        fixture = setFixtures('' +
        '<ul id="test-element" class="c-accounts-table-test">' +
        '<li class="c-accounts-table__row"><ul>' +
        '<li class="accountTitle"><span class="value">row 1</span></li>' +
        '<li></li>' +
        '</ul></li>' +
        '<li class="c-accounts-table__row"><ul>' +
        '<li class="accountTitle"><span class="value">row 2</span></li>' +
        '<li></li>' +
        '</ul></li>' +
        '</ul>' +
        '');

        $elem = fixture.find('.c-accounts-table-test');

        window.dispatchEvent(new Event('resize'));
    });

    it('should have an active element if width is less than breakpoint width', function () {
        $elem.responsive_table_plugin({
            'rowSelector': 'c-accounts-table__row',
            'breakpoint': 1024
        });

        expect($elem.find('.active')).toExist();
    });
});
