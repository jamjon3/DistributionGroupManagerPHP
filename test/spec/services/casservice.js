'use strict';

describe('Service: casservice', function () {

  // load the service's module
  beforeEach(module('distributionGroupManagerApp'));

  // instantiate service
  var casservice;
  beforeEach(inject(function (_casservice_) {
    casservice = _casservice_;
  }));

  it('should do something', function () {
    expect(!!casservice).toBe(true);
  });

});
