(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', 'FirebaseDataService'];
  function ProjectService($http, FirebaseDataService) {
    var service = {
      getProjects: getProjects,
      addProject: addProject,
      deleteProject: deleteProject,
    },
      objectName = 'projects';
    return service;

    ////////////////

    function getProjects(pageNumber, pageSize) {
      console.log('getting projects');
      var sort = '[{ "fieldName": "name", "order": "asc" }]'
        , filter = null;
      // var filter = '[{ "fieldName": "project_id", "operator": "in", "value":' + project.id + '}]';
      return FirebaseDataService.getList(objectName, sort, filter, pageNumber || 1, pageSize || 10)
        .then(function (result) {
          console.log('get projects results', result);
          return result.data.data;
        }, function (reason) {
          console.log('get projects error', reason);
        });
    }

    function addProject(name) {
      var project = {
        "name": name,
        "created_on": new Date()
      };

      return FirebaseDataService.saveItem(objectName, project, { returnObject: true })
        .then(function (result) {
          return result.data;
      });
    }

    function deleteProject(project) {
      return FirebaseDataService.deleteItem(objectName, project.id).then(function (result) {
        return result;
      }, function (error) {
        throw error;
      });
    }

  }
})();