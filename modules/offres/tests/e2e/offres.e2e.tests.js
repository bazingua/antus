'use strict';

describe('Offres E2E Tests:', function () {
  describe('Test Offres page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/offres');
      expect(element.all(by.repeater('offre in offres')).count()).toEqual(0);
    });
  });
});
