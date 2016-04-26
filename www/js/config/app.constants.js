(function () {
  angular.module('todo.config.constants', [])
    .constant("configFirebase", {
      url: "https://ionictodosample.firebaseIO.com/",
      root: 'clients/',
      format: '.json'
    })
    .constant('Auth_Events', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner></ion-spinner>'
    })

})();

//https://ionictodosample.firebaseIO.com/clients/github:708423/