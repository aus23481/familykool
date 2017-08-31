angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $location.path("/app/home");
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$timeout) {
   
            
  

  $scope.circlesHidden = true;

  $scope.showCircles= function() {
    var circles = document.getElementsByClassName('circle');  
    var $circles = angular.element(circles);
    if ($scope.circlesHidden) {
      $circles.addClass('active');
    } else {
      $circles.removeClass('active');
    }
    $scope.toggleCirclesHidden();
   
  };

  $scope.toggleCirclesHidden = function() {
    return $scope.circlesHidden = !$scope.circlesHidden;
  };         
            
            
            
   $scope.mypic = "33.jpg";
   $scope.thumblists = [
    { class: 'circle', id: 9 },
    { class: 'circle', id: 1 },
    { class: 'circle', id: 3 },
    { class: 'circle', id: 7 },
    { class: 'circle', id: 2 },
    { class: 'circle', id: 4 },
    { class: 'circle', id: 8 },
    { class: 'circle', id: 5 },
    { class: 'circle', id: 6 },
   /*{ class: 'circle', id: 10 },
    { class: 'circle', id: 11 },
    { class: 'circle', id: 12 },
    { class: 'circle', id: 13 },
    { class: 'circle', id: 14 },
    { class: 'circle', id: 15 },
    { class: 'circle', id: 16 },
    { class: 'circle', id: 17 },
    { class: 'circle', id: 18 }
   
     
      */
    
 /**/ 
   ];
  
  $scope.change = function(){
      
   
     setTimeout(function(){
        $scope.makeCircular();
     },500);
     
      
      
  } //end of function
//load relatives
  $scope.loadRelatives = function(){
     
    $scope.thumblists = [
    { class: 'circle', id: 9 },
    { class: 'circle', id: 1 },
    { class: 'circle', id: 3 },
    { class: 'circle', id: 7 },
    { class: 'circle', id: 2 },
    { class: 'circle', id: 4 },
    { class: 'circle', id: 8 },
    { class: 'circle', id: 5 },
    { class: 'circle', id: 6 },

   ];
      //load relatives for clicked profile
      var random = Math.floor(Math.random() * ( 9 - 2)) + 2;
      $scope.thumblists = $scope.thumblists.splice(0,random); //changed loaded
      console.log($scope.thumblists);
      
  }
  
  
  
  $scope.moveToCenter = function(id){
       
            // alert(id);
            // 
            $scope.loadRelatives();
            //var circleDimensions = document.getElementById("activate").getBoundingClientRect(); 
           // var clickedDimensionsTop = document.getElementById("thumb-"+id).style.top;
           // var clickedDimensionsleft = document.getElementById("thumb-"+id).style.left;
            
           // alert(clickedDimensionsTop+"-"+clickedDimensionsleft);
           
            $("#activate").find("img").attr("src","img/"+id+".jpg").hide(0).fadeIn(500).css({"transform":"scale(1.25,1.25) rotate(360deg)","transition":"all 3s"});
           // $("#activate").addClass("circle").attr("id","thumb-temp").attr("ng-click","");
          //  $("#activate").remove();
            //
           // $("#thumb-"+id).removeClass("circle").attr("id","activate").attr("style","").css("transition","all 3s");
           
           // 
           // $("#thumb-temp").attr("id","thumb-"+id).css({"top":clickedDimensionsTop,"left":clickedDimensionsleft}).css("transition","all 3s");
          
           //$(".circle").hide(0).fadeIn(500);
        /* $("#thumb-"+id).attr("ng-click","moveToCenter("+value.id+")");
            $(".circle").css("transform","rotate(360deg)").css("transition","all 3s");
            
            */
            $scope.change();
         }

  
  $scope.makeCircular = function(){
        
      
        var  circles = document.getElementsByClassName('circle'),
     //       circleDimensions = circle.getBoundingClientRect(),
            transcludeDiv = document.getElementById('ionic-wheel'),
            centerCircle = document.getElementById('activate');
           //alert(circles.length);
        /**
         * Position circles around parent circle
         */
         
         var theta = [];

        var n =   circles.length;
        //alert($scope.thumblists.length+"-"+circles.length);
        var r = (window.getComputedStyle(transcludeDiv).height.slice(0, -2) / 2) - (window.getComputedStyle(circles[0]).height.slice(0, -2) / 2);

        var frags = 360 / n;
        for (var i = 0; i <= n; i++) {
            theta.push((frags / 180) * i * Math.PI);
        }

        var mainHeight = parseInt(window.getComputedStyle(transcludeDiv).height.slice(0, -2)) / 1.2;

        var circleArray = []; //circles.length
        for (var i = 0; i <circles.length ; i++) {
          circles[i].posx = Math.round(r * (Math.cos(theta[i]))) + 'px';
          circles[i].posy = Math.round(r * (Math.sin(theta[i]))) + 'px';
          circles[i].style.top = ((mainHeight / 2) - parseInt(circles[i].posy.slice(0, -2))) + 'px';
          circles[i].style.left = ((mainHeight/ 2 ) + parseInt(circles[i].posx.slice(0, -2))) + 'px';
         // alert(i+"-"+circles[i]);
          
        }
      
     
     
     
       //  $scope.$apply();
        
    }

   
   $timeout(function() {
      $scope.makeCircular();
    }, 1000);
    
  
})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('PopupCtrl', function($scope, $timeout, $q, $ionicPopup) {

  
          $scope.showTop = function() {
            $ionicPopup.alert({
              title: 'Top Title',
              templateUrl: 'templates/user-login.html'
            }).then(function(res) {
              console.log('Top Alert Box');
            });
          };
		  
		  $scope.showLeft = function() {
            $ionicPopup.alert({
              title: 'Left Title',
              content: 'Hello World Left!!!'
            }).then(function(res) {
              console.log('Left Alert Box');
            });
          };
  
});
