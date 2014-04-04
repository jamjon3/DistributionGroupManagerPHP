'use strict';

describe('Service: Adservice', function () {

  // load the service's module
  beforeEach(module('distributionGroupManagerApp'));

  // instantiate service
  var Adservice;
  beforeEach(inject(function (_Adservice_) {
    Adservice = _Adservice_;
  }));

  it('should do something', function () {
    expect(!!Adservice).toBe(true);
  });

});
