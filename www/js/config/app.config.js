angular
  .module('todo')
  .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {

  // Setup interceptors for $http calls to provide global functions for request/response
  $httpProvider.interceptors.push('APIInterceptor');
  jwtInterceptorProvider.authPrefix = '';
   jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('userToken');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

  // Setup Routing.  
 
  // Using otherwise this way, is need for auth redirects if not logged in
  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get("$state");
    $state.go("tab.projects");
  });


  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.projects', {
      url: '/projects',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-projects.html',
          controller: 'ProjectsController as vm',
          resolve: {
            /* @ngInject */
            projects: function (ProjectService) {
              // pageNumber: 1, pageSize: 10
              return ProjectService.getProjects(1, 10);
            }
          }
        }
      }
    })
    .state('tab.tasks', {
      url: '/tasks/:projectId',
      params: {
        projectName: ""
      },
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-project-tasks.html',
          controller: 'TasksController as vm',
          resolve: {
            /* @ngInject */
            tasks: function ($stateParams, TaskService) {
              return TaskService.getTasks({ id: $stateParams.projectId });
            }
          }
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileController as vm'
        }
      }
    })
    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController as login'

    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpController as signup'
    });
}