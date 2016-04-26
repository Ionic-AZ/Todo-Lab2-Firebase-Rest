(function () {
  'use strict';

  angular
    .module('todo')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', '$rootScope', 'LoginService'];
  function LoginController($state, $rootScope, LoginService) {
    var login = this;
    login.error = '';
    login.signin = signin;
    login.signout = signout;
    login.anonymousLogin = anonymousLogin;
    login.socialSignup = socialSignUp;
    login.socialSignin = socialSignIn;

    activate();

    ////////////////

    function activate() { }

    function signin() {      
      LoginService.signin(login.email, login.password);
    }

    function anonymousLogin() {
      LoginService.anonymousLogin();

    }
    
    function signout() {
      LoginService.signout();

    }

    function socialSignIn(provider) {
      LoginService.socialSignIn(provider);
    }

    function socialSignUp(provider) {
      LoginService.socialSignUp(provider);
    }
  }
})();