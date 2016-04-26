angular.module('todo.common')
  .service('EndpointConfigService', function ($rootScope, configFirebase) {
    var service = this,
      endpointMap = {
        firebase: { URI: configFirebase.url, root: configFirebase.root, format: configFirebase.format },
      },
      currentEndpoint = endpointMap['firebase'],
      userId = null,
      userToken = null,
      backend = 'firebase';

    service.getUrl = function (model) {
      return currentEndpoint.URI + currentEndpoint.root + userId + '/' + model;
    };

    service.getUrlForId = function (model, id) {
      return service.getUrl(model) + id + currentEndpoint.format + '?auth=' + userToken
    };

    service.getCurrentBackend = function () {
      return backend;
    };

    service.getCurrentFormat = function () {
      return currentEndpoint.format;
    };

    service.getCurrentURI = function () {
      return currentEndpoint.URI;
    };

    service.getToken = function () {
      return userToken;
    };

    $rootScope.$on('onCurrentUserId', function (event, id) {
      console.log('onCurrentUserId', id);
      userId = id;
    });

    $rootScope.$on('onCurrentUserToken', function (event, token) {
      console.log('onCurrentUserToken', token);
      userToken = token;
    });
  });