(function () {
  'use strict';

  angular
    .module('todo.firebase', [])
    .factory('FirebaseDataService', FirebaseDataService);

  FirebaseDataService.$inject = ['$http', 'configFirebase', 'EndpointConfigService'];
  function FirebaseDataService($http, configFirebase, EndpointConfigService) {
    var service = {
      getList: getList,
      saveItem: saveItem,
      updateItem: updateItem,
      deleteItem: deleteItem
    };

    return service;

    ////////////////
    function getList(objectName, sort, filter, pageNumber, pageSize) {
      console.log('FireBaseService.getList', objectName, sort, filter, pageNumber, pageSize);
      var url = EndpointConfigService.getUrl(objectName) + EndpointConfigService.getCurrentFormat() + '?auth=' + EndpointConfigService.getToken();
      console.log('getList url', url);
      return $http.get(url)
        .then(
        function (result) {
          return result;
        },
        function (error) {
          console.log(error);
        });
    }


    function getId(objectName, id) {
      return $http.get(EndpointConfigService.getUrlForId(objectName, id));
    }

    function saveItem(objectName, data) {
      return $http.post(EndpointConfigService.getUrl(objectName) + '?auth=' + EndpointConfigService.getToken(), data);
    }

    function updateItem(objectName, id, data) {
      return $http.put(EndpointConfigService.getUrlId(objectName, id), data);
    }

    function deleteItem(objectName, id) {
      return $http.delete(EndpointConfigService.getUrlForId(objectName, id));
    }
  }
})();