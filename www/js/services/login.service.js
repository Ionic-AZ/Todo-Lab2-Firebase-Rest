(function () {
  'use strict';

  angular
    .module('todo.services')
    .service('LoginService', LoginService);

  LoginService.$inject = ['configFirebase', '$rootScope', 'store', 'EndpointConfigService'];

  function LoginService(configFirebase, $rootScope, store, EndpointConfigService) {
    var service = this;
    service.signin = signin;
    service.anonymousLogin = anonymousLogin;
    service.socialSignIn = socialSignIn;
    service.socialSignUp = socialSignUp;
    service.signout = signout;
    service.signup = signup;
    service.getUserDetails = getUserDetails;
    service.getCurrentUserId = getCurrentUserId;
    service.verifyIsLoggedIn = verifyIsLoggedIn;

    var ref = new Firebase(configFirebase.url);

    ////////////////


    function saveUserAndProfile(profile) {
      console.log("logged in", profile);
      store.set('profile', profile);
      store.set('userToken', profile.token);
      $rootScope.$broadcast('onCurrentUserId', profile.uid);
      $rootScope.$broadcast('onCurrentUserToken', profile.token);
      $rootScope.$broadcast('authorized', profile);

    }

    function signin(email, password, appName) {
      ref.authWithPassword({
        email: email,
        password: password
      }, authHandler);
    };

    function anonymousLogin() {
      ref.authAnonymously(authHandler);
    }

    function socialSignIn(provider) {
      ref.authWithOAuthPopup(provider).then(function (authData) {
        saveUserAndProfile(authData);
      }).catch(function (error) {
        console.log('login error', error);
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          ref.authWithOAuthPopup(provider).then(function (authData) {
            saveUserAndProfile(authData);
          });
        } else {
          console.log(error);
        }
      })
    };

    function socialSignUp(provider) {
      socialSignIn(provider);

    };

    function signout() {
      ref.unauth();
      store.remove('profile');
      $rootScope.$broadcast('logout');
    };

    function authHandler(error, authData) {
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
            console.log("The specified user account email is invalid.");
            break;
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error logging user in:", error);
        }
      } else {
        console.log("Authenticated successfully with payload:", authData);
        saveUserAndProfile(authData);
      }
    }

    function signup(firstName, lastName, email, password, confirmPassword) {
      ref.createUser({
        email: email,
        password: password
      }, authHandler);
    }

    function getUserDetails() {
      return store.get('profile');
    }

    function getCurrentUserId() {
      var user = getUserDetails();
      return user ? user.uid : null;
    }
    
    function verifyIsLoggedIn() {
      var authData = ref.getAuth();
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        return true;
      } else {
        console.log("User is logged out");
        return false;
      }
    }
  }
})();
