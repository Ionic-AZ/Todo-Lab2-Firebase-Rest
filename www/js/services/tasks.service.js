(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('TaskService', TaskService);

  TaskService.$inject = ['$http', 'FirebaseDataService'];
  function TaskService($http, FirebaseDataService) {
    var service = {
      getTasks: getTasks,
      addTask: addTask,
      deleteTask: deleteTask,
      completeTask: completeTask
    },
      objectName = 'task';

    return service;

    ////////////////
   
    function getTasks(project, pageNumber, pageSize) {
      console.log('getTasks');
      var sort = [{ "fieldName": "completed", "order": "asc" }, { "fieldName": "name", "order": "asc" }]
        , filter = [{ "fieldName": "project_id", "operator": "in", "value": project.id }];
      return FirebaseDataService.getList(objectName, sort, filter, pageNumber || 1, pageSize || 10)
        .then(function (response) {
          console.log('getTasks response', response.data.data);
          return response.data.data;
        }, function (error) {
          console.log('getTasks Error', error);
        });
    }

    function addTask(project, task) {
        task.completed = false;
        task.created_on = new Date();
        task.project_id = project.id;
      
      return FirebaseDataService.saveItem(objectName, task, { returnObject: true }).then(function (result) {
        return result.data;
      },
        function (error) {
          console.log('addTask Error', error);
        }

        );
    }

    function deleteTask(project, task) {
      return FirebaseDataService.deleteItem(objectName, task.id).then(function (result) {
        return result;
      }, function (error) {
        console.log('deleteTask error', error);
      });
    }

    function completeTask(project, task) {
      task.completed = !task.completed;
      return FirebaseDataService.updateItem(objectName, task.id, task).then(function (result) {
        return result;
      }, function (error) {
        console.log('completeTask error', error);
      });
    }
  }
})();