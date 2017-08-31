// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','notification.controllers','cognition.controllers','map.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('ENVIRONMENT', 'development')
.constant('serviceurl', 'http://siliconvalleynest.com/familykoolapi/index.php?method=')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

   .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
       // controller: 'HomeCtrl'
      }
    }
  })
  
  .state('app.addfamilymember', {
    url: '/addfamilymember',
    views: {
      'menuContent': {
        templateUrl: 'templates/addfamilymember.html',
       // controller: 'HomeCtrl'
      }
    }
  })

 .state('app.cprofile', {
    url: '/cprofile',
    views: {
      'menuContent': {
        templateUrl: 'templates/cprofile.html',
        controller: 'CameraCtrl'
      }
    }
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.albumsettings', {
    url: '/albumsettings',
    views: {
      'menuContent': {
        templateUrl: 'templates/albumsettings.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.album', {
      url: '/album',
      views: {
        'menuContent': {
          templateUrl: 'templates/album.html',
          controller: 'HomeCtrl'
        }
      }
    })
   .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })
   .state('app.notifications', {
      url: '/notifications',
      views: {
        'menuContent': {
          templateUrl: 'templates/notifications.html',
          controller: 'NotificationCtrl'
        }
      }
    })
    .state('app.cognition', {
      url: '/cognition',
      views: {
        'menuContent': {
          templateUrl: 'templates/cognition.html',
          controller: 'CognitionCtrl'
        }
      }
    })
   .state('app.facebook', {
      url: '/facebook',
      views: {
        'menuContent': {
          templateUrl: 'templates/facebook.html',
          controller: 'FbCtrl'
        }
      }
    })
    .state('app.user-login', {
      url: '/user-login',
      views: {
        'menuContent': {
          templateUrl: 'templates/user-login.html'
        }
      }
    })	
	
  .state('app.login-circle', {
      url: '/login-circle',
      views: {
        'menuContent': {
          templateUrl: 'templates/login-circle.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login-circle');
  // $urlRouterProvider.otherwise('/app/cprofile');
});
