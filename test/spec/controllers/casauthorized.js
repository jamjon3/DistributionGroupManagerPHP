'use strict';

describe('Controller: CasauthorizedCtrl', function () {

  // load the controller's module
  beforeEach(module('distributionGroupManagerApp'));

  var CasauthorizedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CasauthorizedCtrl = $controller('CasauthorizedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
