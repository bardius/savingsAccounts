/*
 Project: Savings Accounts
 Authors: George Bardis
 */

/*
 * Testing the functionality of the Project -- Sample
 */

describe('Savings Accounts Project Tests', function () {
    var cachedBodyElement;

    beforeEach(function () {
        cachedBodyElement = BARDIS.Config.$body;
    });

    it('Document Body Element should be cached', function () {
        expect(cachedBodyElement).toEqual($(document.body));
    });

});
