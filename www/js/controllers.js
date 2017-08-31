//, 'ngCordovaOauth'
angular.module('starter.controllers', ['ionic-toast','ngCordova','autocomplete.directive'])

.controller('AppCtrl', function($scope,UserService,serviceurl , $ionicModal,$timeout,$location,$window,$http,ionicToast,$rootScope,$ionicSideMenuDelegate,$cordovaGeolocation) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData = {};
  $scope.login=true;
  $scope.register=false;
  $scope.loggedin = 0;
  
  
  //geo coder 
	    $scope.lat = "";
	    $scope.lng = "";
	    var geoSettings = {frequency: 1000, timeout: 30000, enableHighAccuracy: false};
	    $cordovaGeolocation.getCurrentPosition(geoSettings).then(function(position){
	         
			 $scope.lat = position.coords.latitude;
                         $scope.lng = position.coords.longitude;
			//alert($scope.lat+"-"+$scope.lng);
			 
			  
		}, function(error){console.log("Could not get location");
		
	 }); 		  
	//geo coder

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/user-login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.userloginTab = function(tabid){
  
   $('.tab-item').removeClass('active');
   $("#"+tabid).addClass('active');
  
}



  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

   $scope.toggleLeftSideMenu = function() {
   // $ionicSideMenuDelegate.toggleRight();
    $("button[menu-toggle='right']").trigger("click");
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
   $scope.$watch('loggedin', function() {
       // alert('hey,logged has changed!');
         //$scope.$apply();
        //+$location.path()
        // $window.location.reload(true);
    });
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    //$location.path("/app/home");
	
	
	
	//alert($scope.lat+"-"+$scope.lng);
	
    var data = "username="+$scope.loginData.username+"&phone="+$scope.loginData.phone+"&email="+$scope.loginData.email+"&lat="+$scope.lat+"&lng="+$scope.lng;
   // alert($scope.loginData.phone);
    
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"doLogin",
                         data: data
                     }).
                     success(function(data) {
                        
                         if(!data) ionicToast.show('You have entered an invalid login info!', 'top', false, 2500);
                         
                         //alert(JSON.stringify(data)+"-"+data.length+data.userId);
                         //console.log(JSON.stringify(data)+"-"+data.userId);
                         var userid = parseInt(data.userId); 
                         if(userid>=1){
                              $scope.closeLogin();
                              console.log(data.userId);
                              //{"userId":"2","firstName":"Kim","userPicture":"2.jpg"}
                              localStorage.currentuserid = data.userId;
                              localStorage.currentuserlat = data.lat;
                              localStorage.currentuserlng = data.lng;
                              
                              //restricted logged in user
                              localStorage.loguid = data.userId;
                              localStorage.logulat = data.lat;
                              localStorage.logulng = data.lng;
                              //init logged uid as centeruid
                              localStorage.centeruid = data.userId;
                              localStorage.currentusername = data.firstName;
                              localStorage.currentuserpic = data.userPicture;
                              localStorage.currentuserphone = data.phone;
                              localStorage.currentuseremail = data.userEmail;
                              localStorage.loggedin = 1;
                              $scope.loggedin = 1;
							  
                            //user lat lng update
                           // UserService.updateUserLatlng();
                               
                               // $rootScope.$emit("CallloadRelatives",localStorage.currentuserid);
                              // $window.location.href = "index.html#/app/home";
                               $location.path("/app/home").replace();
                               $timeout(function(){ $window.location.reload(true);   },100);
                                // $rootScope.$evalAsync(function() { });
                                  
                                 
                              
                              } 
                          
  
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
    
 
  }
  
  
/***********************************************************signup************************/  
  $scope.doRegister = function() {
    console.log('Doing register', $scope.signupData.username+$scope.signupData.phone+$scope.signupData.email);
    //$location.path("/app/home");
	
	
	
    
     if($scope.signupData.username&&$scope.signupData.phone&&$scope.signupData.email) 
     {    
      var data = "username="+$scope.signupData.username+"&phone="+$scope.signupData.phone+"&email="+$scope.signupData.email+"&lat="+$scope.lat+"&lng="+$scope.lng;
   // alert($scope.loginData.phone);
    
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"doRegister",
                         data: data
                     }).
                     success(function(data) {
                          //alert(data);
                          
                          if(!data) ionicToast.show('You have entered an invalid login info!', 'top', false, 2500);
                          if(data.success>=1) { 
                              ionicToast.show('You have successfully registered,Pls login now', 'top', false, 2500);
                              $scope.login = true;
                              $scope.register = false;
                              $scope.signupData.username = "";
                              $scope.signupData.phone = "";
                              $scope.signupData.email = "";
                              
                          }
   
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
    
      } //end of if 
      else ionicToast.show('You have not entered username,phone and email correctly', 'top', false, 2500);
  }
/***********************************************************end of signup************************/
  
  $scope.loginBack = function(){
      $window.location.reload(true);
  }
  //$ionicHistory.nextViewOptions({ disableBack: true});
 // $ionicSideMenuDelegate.canDragContent(false); 
  $scope.reloadHome = function(){
      
       //$location.path("/app/home");
      // $scope.loadRelatives($scope.loggedinuserid);
     $window.location.reload(true);
     // $window.location.href = "index.html#/app/home";
      
  }
  
  $scope.redirectMap = function(){
      
       $location.path("/app/map");
      // $scope.loadRelatives($scope.loggedinuserid);
     //$window.location.reload(true);
     // $window.location.href = "index.html#/app/home";
      
  }
  
  $scope.logout = function(){
      
     // alert("successfully Loggedout");
    ionicToast.show('Successfully Loggedout', 'top', false, 2500);
    localStorage.currentuserid = "";
    localStorage.currentusername = "";
    localStorage.currentuserpic = "";
    localStorage.currentuserphone = "";
    localStorage.currentuseremail = "";
   //$rootScope = $rootScope.$new(true);
    //$scope = $scope.$new(true);
    localStorage.loggedin = 0;
    $scope.loggedin = 0;
   
    $location.path("/app/login");
      
  }
   //alert(localStorage.loggedin); 
})

.controller('HomeCtrl', function($scope,UserService,$ionicLoading,$ionicPopup,$timeout,serviceurl,$http,$location,$ionicHistory,ionicToast,$rootScope,$window,CameraFactory) {
  
            
  //UserService.getUser();      
  // alert(localStorage.starter_facebook_user.name+localStorage.starter_facebook_user.picture+localStorage.starter_facebook_user.email+localStorage.starter_facebook_user.userID)    
 //alert(localStorage.loggedin);     
  // alert(localStorage.currentuserid);
  //$state.go('app.home');
  //console.log(localStorage.currentuser);
  
  // Create the login modal that we will use later
  /*  var showAlbumPopup = $ionicPopup.alert({
      title: 'Top Title',
      templateUrl: 'templates/album-select-modal.html',
      scope: $scope,
    });
   */
  // Open the select Album modal
  
  //Remove relative
  $scope.removeRelative = function(id){
      
      alert(id);
      
      
  } 
    $scope.geolocation = "";
  
  
   $scope.items = [
        {firstName: 'Hello',id:1},
        {firstName: 'Baha',id:2},
        {firstName: 'Ala',id:3},
        {firstName: 'Siwar',id:4},
        {firstName: 'Monira',id:5},
        {firstName: 'Samir',id:6},
        {firstName: 'Spange Bob',id:7},
        {firstName: 'Deneris Targariant',id:8},
        {firstName: 'Ned Stark',id:9}
    ];
    $scope.onSelect = function (item) {
        console.log('item', item);
    };
  
  $scope.openSelectAlbumModal = function(postid) {
         
         //showAlbumPopup.show();
         
         $scope.data = {};
          $scope.getAlbumList();
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<select  class = "item item-input item-select" style="width:100% !important" ng-model="data.album"><option ng-repeat="album in albumlist" value="{{album.id}}"> {{album.name}} </option> </select>',
   //template: '<input type="text" ng-model="data.album">',
    title: '<span align="left">Select Your Album</span>',
   // subTitle: 'Please use normal things
   // templateUrl: 'templates/album-select-modal.html',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.album) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.album;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
    // alert(res+postid);
    $scope.addPostToAlbum(postid,res);
    
  });

  $timeout(function() {
    // myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
         
         
         
         
   };
  
  
  $scope.closeSelectPostAlbumPopup = function(){
      
      showAlbumPopup.close();
      
  }
  
  
  $scope.circlesHidden = true;

  $scope.toggleLeftSideMenu = function() {
   // $ionicSideMenuDelegate.toggleRight();
     $scope.circlesHidden = false;
     $("button[menu-toggle='right']").trigger("click");
   
    
  };


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
            
            
            
   $scope.mypic = localStorage.currentuserpic;
   $scope.users = [];
   $scope.relativeData = [];
   
   $scope.loggedinuserid    = localStorage.currentuserid;
   $scope.loggedinusername  = localStorage.currentusername;
   $scope.loggedinuserphone = localStorage.currentuserphone;
   $scope.loggedinuseremail = localStorage.currentuseremail;
   $scope.loggedinlat = "";
   $scope.loggedinlng = "";
	
   $scope.messages = [];
  // $scope.relationId = "";
   //$scope.relativeOfUserId = "";
  // $scope.relativeUserId = "";
   
   $scope.relatives = [];
  
   $scope.reload = function(){
    
	window.location.reload(true);
  
   }

//load relatives
  $scope.loadRelatives = function(id){
     //alert(id);
                    $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getRelatives",
                         data: "relativeOfUserId="+id
                     }).
                     success(function(data) {
                         
                          
                           console.log(data.length+"success");
                         // if(data.length){  
                           $scope.relatives = data;
			   $scope.geolocation = "";
                           localStorage.relatives = data;
                           localStorage.callloadRelativ = 0;
                           $timeout(function(){
                               $scope.makeCircular();
                          },2000);
                         // }
                           //retrieve geo info for centered user
                           $scope.getCurrentUser(id);
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
  }
  
  
  $scope.moveToCenter = function(id){
      
                   var clickedsrc = $("#thumb-"+id).find("img").attr("src");
                   
 		   $("#activate").find("img").attr("src",clickedsrc).hide(0).fadeIn(500).css({"transform":"scale(1.25,1.25) rotate(360deg)","transition":"all 3s"});
                   $scope.loadRelatives(id);
                   localStorage.centeruid = id;
 
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
      //  alert($scope.relatives.length+"-"+circles.length);
		//circles[0].style.height = "50px";
        var r = (window.getComputedStyle(transcludeDiv).height.slice(0, -2) / 2) - (window.getComputedStyle(circles[0]).height.slice(0, -2) / 2);
        //alert(n+"-"+r+"-"+window.getComputedStyle(circles[0]).height);
		//r = 125;
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
         //alert(i+"-"+circles[i].style.top+"-"+circles[i].style.left);
          
        }
      
     
     $("#activate").find("img").hide(0).fadeIn(500).css({"transform":"scale(1,1) rotate(-360deg)","transition":"all 3s"});
     
     
       //  $scope.$apply();
        
    }

   
  
    
   $scope.getUsers = function(){
                    $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getUsers",
                         data:""
                     }).
                     success(function(data) {
                           $scope.users = data;
                            $scope.items = data;
                           console.log(data.length+"success");
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });

    } 
    
    
     $scope.addRelative = function(){
         
       //  `relativeOfUserId``relativeUserId``relationId` 
        $scope.relativeData.relativeUserId =  $("#relativeUserId").val();
       // alert($scope.relativeData.relativeUserId+"-"+$scope.relativeData.relationId);
         var data = "relativeOfUserId="+ $scope.loggedinuserid+"&relativeUserId="+$scope.relativeData.relativeUserId+"&relationId="+$scope.relativeData.relationId;
  
               $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"addRelative",
                         data: data
                     }).
                     success(function(data) {
                         
                         
                          if(!data) ionicToast.show('Relative adding is not successfull', 'top', false, 2500);
                          if(data.success>=1) { 
                                ionicToast.show('You have successfully added', 'top', false, 2500);
                                $scope.closeLogin();
                               // $window.location.href = "index.html#/app/home";//
                                $scope.loadRelatives($scope.loggedinuserid);
                                $location.path("/app/home");
                                $timeout(function(){ $window.location.reload(true);   },500);
                          }
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });

    } 

    
    
  $scope.backToHome = function(){  $location.path("/app/home"); }   
 
  
   //******************update profile***************************/    
   $scope.updateProfile = function(){  
       
      // $location.path("/app/home"); 
     //alert("hi");
     $scope.loggedinuseremail = document.getElementById("loggedinuseremail").value;
     var data = "userId="+localStorage.currentuserid+"&username="+$scope.loggedinusername+"&phone="+$scope.loggedinuserphone+"&email="+$scope.loggedinuseremail;   
      
           $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"updateProfile",
                         data: data
                     }).
                     success(function(data) {
                         
                         //  $scope.relatives = data;
                          // console.log(data.length+"success");
                          
                           if(!data) ionicToast.show('Profile update is not successfull!', 'top', false, 2500);
                          if(data.userId>=1){
                              $scope.closeLogin();
                              console.log(data.userId);
                              //{"userId":"2","firstName":"Kim","userPicture":"2.jpg"}
                              localStorage.currentuserid = data.userId;
                              localStorage.currentusername = data.firstName;
                              localStorage.currentuserpic = data.userPicture;
                              localStorage.currentuserphone = data.phone;
                              localStorage.currentuseremail = data.userEmail;
                              
                              
                              //$window.location.href = "index.html#/app/home";
                               $scope.loadRelatives($scope.loggedinuserid);
                               $location.path("/app/home");
                              } 
                          
                          
  
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
      
      
   
   }      //end of updateprofile
   
  
   $rootScope.$on("CallloadRelatives", function(id){
       //+"-"+id.toSource()
      // alert(id+"-"+localStorage.currentuserid);
      // $scope.loadRelatives(localStorage.currentuserid);
         $scope.getCurrentUser(localStorage.currentuserid);
    });
   //call relative
      //$timeout(function(){ },2000);
                              
   $scope.loadRelatives($scope.loggedinuserid);                      
  
   $ionicHistory.nextViewOptions({
    disableBack: true
  });
    
   $scope.getUsers();
   
   //alert( $scope.loggedinuserid +"-"+ localStorage.currentuserid);
   $scope.messageData=[];
   $scope.addPost = function(){
       
      // alert($scope.messageData.message);
      
      if($scope.messageData.message){
        
               var data = "userId="+ $scope.loggedinuserid+"&message="+$scope.messageData.message;
  
               $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"addPost",
                         data: data
                     }).
                     success(function(data) {
                         
                         
                          if(!data) ionicToast.show('Post adding is not successfull', 'top', false, 2500);
                          if(data.success>=1) { 
                                ionicToast.show('You have successfully added', 'top', false, 2500);
                                $scope.messageData.message = "";
                               $scope.getPosts();
                          }
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
      
       } else  ionicToast.show('Pls enter valid message', 'top', false, 2500);
       
   } //end of addpost
   
   $scope.getPosts = function(){
       
      // alert($scope.messageData.message);
      
      
               var data = "userId="+ $scope.loggedinuserid
  
               $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getPosts",
                         data: data
                     }).
                     success(function(data) {
                         
                        $scope.messages = data; 
                         
                        // console.log(data);
                         /*
                          if(!data) ionicToast.show('Post adding is not successfull', 'top', false, 2500);
                          if(data.success>=1) { 
                                ionicToast.show('You have successfully added', 'top', false, 2500);
                              
                          }
                         */
                        $scope.getLikes();
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
      
       
       
   } //end of getposts
   
   
  // lat lng of current user

   $scope.getCurrentUserLatlng = function(lat,lng){
	  // alert(localStorage.currentuserlat+localStorage.currentuserlng);
	  // alert(lat+"-"+lng);
	   
	    //geo coder 
		
		      $scope.latLng = new google.maps.LatLng(lat, lng);
		
			 var geocoder = new google.maps.Geocoder(); 
			  var request = {
				latLng: $scope.latLng
			  };
			  geocoder.geocode(request, function(data, status) {
				 // alert("hi");
				if (status == google.maps.GeocoderStatus.OK) {
				  if (data[0] != null) {
					$scope.geolocation = data[0].formatted_address;
					//alert($scope.geolocation+lat+lng);
				  } else {
					alert("No address available");
				  }
				}
			  })
	    //geo			
	   
	   
	   
	   
   }  
   //end of current user lat lng
   //load relatives
   
  //******************get logged in user geo location***************************/   
   $scope.getCurrentUserLatlng( localStorage.currentuserlat, localStorage.currentuserlng);  
   
  $scope.getCurrentUser = function(id){
     //alert(id);
                    $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getCurrentUser",
                         data: "userId="+id
                     }).
                     success(function(data) {
                         
                            localStorage.currentuserpic = data.userPicture;
                            $scope.mypic = data.userPicture;
                            $scope.loggedinlat = data.lat;
                            $scope.loggedinlng = data.lng;
                            $scope.getCurrentUserLatlng( data.lat,data.lng);
                            //alert($scope.loggedinlat+"-"+$scope.loggedinlng);
                           //console.log(data.length+"success");
                           // $("#activate").find("img").attr("src","img/"+id+".jpg").hide(0).fadeIn(500).css({"transform":"scale(1.25,1.25) rotate(360deg)","transition":"all 3s"});
                        
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
  }

   
   
   $scope.getPostPicture = function(){
       
       if(!$scope.messageData.message) $scope.messageData.message = "";
       $rootScope.postmsg = $scope.messageData.message;
      // alert($scope.messageData.message); 
       CameraFactory.takePicture();
   }
   
   
  $scope.addLike = function(postid){
       
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"addLike",
                         data: "userid="+$scope.loggedinuserid+"&postid="+postid
                     }).
                     success(function(data) {
                        // alert(data.success);
                          $scope.getLikes();
                          //$scope.getCommentNumbersByPost();
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
       
   } //end of addLke
   
   
   
    $scope.getLikes = function(){
       
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getLikes",
                         data: ""
                     }).
                     success(function(data) {
                         //alert(data.success);
                         angular.forEach(data, function(value, key){
                           // alert(key+"-"+value.postid+"-"+value.likenumber);
                            $("#like-"+value.postid+",#album-like-"+value.postid).text(value.likenumber);
                        });
                        
                        
                        
                         $scope.getCommentNumbersByPost();
                       }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
       
   } //end of addLke
   
   
   //comments goes here
   $scope.commentsData = [];
   $scope.comments = [];
   
   
   $scope.showComments = function(postid){
      $scope.commentsData.comment = "";
       $scope.commentsData.number = ""; 
      $scope.comments = "";
      $(".comment-list-container").css("display","none");
     // alert("hi");
    //  $("div[id*='comment-container-'").css("display","none");
     // $("#comment-container-"+postid).css({"width":"275px","height":"200"}).css("transition","width 2s, height 4s"); 
      $("#comment-container-"+postid).css("display","block");
       $("#album-comment-container-"+postid).css("display","block");
     // document.getElementById("comment-container-"+postid).style.display = "block";
      $scope.getComments(postid);
    }
   //Post comments
   
   $scope.postComment = function(postid){
        ///alert($scope.commentsData.comment);
        $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"postComment",
                         data: "userid="+$scope.loggedinuserid+"&postid="+postid+"&msg="+$scope.commentsData.comment
                     }).
                     success(function(data) {
                        // alert(data.success);
                         $scope.commentsData.comment = ""; 
                         $scope.commentsData.number = ""; 
                         $scope.comments = "";
                         $scope.getComments(postid);
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
     
       
   } //end of postComment
   
   
    $scope.getComments = function(postid){
       
              $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getComments",
                         data: "userid="+$scope.loggedinuserid+"&postid="+postid
                     }).
                     success(function(data) {
                        // alert(data.success);
                         console.log(data.length);
                         //alert(data.length);
                         // $scope.getComments();
                        //$scope.commentsData.number = data.length;   
                        $scope.comments = data;
                       
                       // angular.forEach(data, function(value, key){
                           // alert(key+"-"+value.postid+"-"+value.likenumber);
                         //   $("#like-"+value.postid).text(value.likenumber);
                       // });
                       
                       
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
     
       
   } //end of postComment
   
   
    $scope.getCommentNumbersByPost = function(){
       
              $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getCommentNumbersByPost",
                         data: "userid="+$scope.loggedinuserid
                     }).
                     success(function(data) {
                        // alert(data.success);
                       //  console.log(data.length);
                         
                       
                       angular.forEach(data, function(value, key){
                           //alert(key+"-"+value.postid+"-"+value.likenumber);
                           $("#post-comment-number-"+value.postid+",#album-post-comment-number-"+value.postid).text(value.postnumber);
                       });
                       
                       
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
     
       
   } //end of postComment


     $scope.albumsettings = [];
     $scope.albumlist = [];
     $scope.albumposts = [];
     $scope.addAlbumSettings = function(){
       
          //  alert($scope.albumsettings.albumname);
              
                //
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"addAlbumSettings",
                         data: "userid="+$scope.loggedinuserid+"&name="+$scope.albumsettings.albumname
                     }).
                     success(function(data) {
                        // alert(data.success);
                       //  console.log(data.length);
                       $scope.getAlbumList();
                                  
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
            
       
   } //end of Albumsettings

  
   
    $scope.getAlbumList = function(){
       
          //  alert($scope.albumsettings.albumname);
              
                //
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getAlbumList",
                         data: "userid="+$scope.loggedinuserid
                     }).
                     success(function(data) {
                        // alert(data.success);
                       //  console.log(data.length);
                         $scope.albumlist = data;         
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
            
       
   } 
    
   //end of get Album
  //Add Post to Album
  
  $scope.addPostToAlbum = function(postid,albumid){
       
          //  alert($scope.albumsettings.albumname);
              
                //
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"addPostToAlbum",
                         data: "userid="+$scope.loggedinuserid+"&postid="+postid+"&albumid="+albumid
                     }).
                     success(function(data) {
                        // alert(data.success);
                       //  console.log(data.length);
                        // $scope.albumlist = data;         
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
            
       
   } 
   
   
 //get Posts by album
 
 
 $scope.getPostsByAlbum = function(albumid){
       
          //  alert($scope.albumsettings.albumname);
          if(albumid){
              $ionicLoading.show(); 
                //
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getPostsByAlbum",
                         data: "userid="+$scope.loggedinuserid+"&albumid="+albumid
                     }).
                     success(function(data) {
                        // alert(data.success);
                       //  console.log(data.length);
                        // $scope.albumlist = data; 
                        $ionicLoading.hide();
                         $scope.albumposts = data;
                          
                     }).
                     error(function(data, response) {
                         $ionicLoading.hide();
                         console.log(response + " " + data);
                     });
            
            }  // 
   } 
  
  UserService.updateUserLatlng();


})   
 /***************************************End of home ctrl********************************/  
   
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
  
})
.controller('CameraCtrl', function ($scope, $cordovaCamera, $ionicLoading,$location,$timeout,$rootScope) {
    
   
    $scope.data = { "ImageURI" :  "Select Image" };
    //$scope.serverurl = "http://siliconvalleynest.com/familykoolapi/upload.php?userid=1";
    $scope.serverurl = "http://siliconvalleynest.com/familykoolapi/index.php?method=uploadProfilePic&userid=";
    $scope.takePicture = function() {
        //  alert(localStorage.currentuserid);
          //$rootScope.$emit("CallloadRelatives",[localStorage.currentuserid]);
          //return;
	  var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 300,
        targetHeight: 300
      };  
	  $cordovaCamera.getPicture(options).then(
		function(imageData) {
			$scope.picData = imageData;
			$scope.ftLoad = true;
			//$localstorage.set('fotoUp', imageData);
                        localStorage.setItem('fotoUp', imageData);
			$ionicLoading.show({template: 'Loading Photo...', duration:500});
                       
                         $timeout(function() {
                            angular.element('#myImage').triggerHandler('click');
                           // alert("h");
                          }, 1000);


		},
		function(err){
			$ionicLoading.show({template: 'Errore di caricamento...', duration:500});
			})
                        
	  }

	  $scope.selectPicture = function() { 
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        targetWidth: 300,
                        targetHeight: 300
                        
		};

	  $cordovaCamera.getPicture(options).then(
		function(imageURI) {
			window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
				$scope.picData = fileEntry.nativeURL;
				$scope.ftLoad = true;
				var image = document.getElementById('myImage');
				image.src = fileEntry.nativeURL;
                                 
  			});
			$ionicLoading.show({template: 'Foto acquisita...', duration:500});
                      $timeout(function() {
                            angular.element('#myImage').triggerHandler('click');
                           // alert("h");
                          }, 1000);
		},
		function(err){
			$ionicLoading.show({template: 'Errore di caricamento...', duration:500});
		})
	};

    $scope.uploadPicture = function() {
		$ionicLoading.show({template: 'Uploading Photo...'});
		var fileURL = $scope.picData;
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                var fn  = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = true;
              // alert(localStorage.currentuserid+"-"+fn);   
		var params = {};
		params.value1 = "someparams";
                params.value2 = "otherparams";
                params.userid = localStorage.currentuserid;

		options.params = params;
                $scope.serverurl = $scope.serverurl+localStorage.currentuserid+"&fileName="+fn
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI($scope.serverurl), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
		$ionicLoading.hide();}, options);
    }

	var viewUploadedPictures = function() {
		$ionicLoading.show({template: 'Uploading Photo...'});
        server = $scope.serverurl;
        //alert(server);
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {					 
                      //document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                      // alert("Successfully Uploaded"+xmlhttp.responseText);
                      
                     $rootScope.$emit("CallloadRelatives",[localStorage.currentuserid]);
                     
                     $location.path("/app/home").replace();
                     $timeout(function(){ $window.location.reload(true);   },100);
                      
                      //$ionicLoading.show({template: 'Successfully Uploaded-'+xmlhttp.responseText});
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
					return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()}	;
	    $ionicLoading.hide();
    }

	$scope.viewPictures = function() {
		$ionicLoading.show({template: 'Loading photo...'});
        server = $scope.serverurl;
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {					 
              //  document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
					return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()}	;
		$ionicLoading.hide();
    }
})
.factory('CameraFactory', function ($cordovaCamera, $ionicLoading,$location,$timeout,$rootScope) {
    
    var factory = {};
   // $scope.data = { "ImageURI" :  "Select Image" };
    //$scope.serverurl = "http://siliconvalleynest.com/familykoolapi/upload.php?userid=1";
   $rootScope.serverurl = "http://siliconvalleynest.com/familykoolapi/index.php?method=uploadPostPic&userid=";
   factory.takePicture = function() {
         //alert(localStorage.currentuserid);
          //$rootScope.$emit("CallloadRelatives",[localStorage.currentuserid]);
          //return;
       // alert();  
	  var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 1024,
        targetHeight: 768
      };  
	  $cordovaCamera.getPicture(options).then(
		function(imageData) {
			$rootScope.picData = imageData;
			//$scope.ftLoad = true;
			//$localstorage.set('fotoUp', imageData);
                        localStorage.setItem('fotoUp', imageData);
                         factory.uploadPicture();
			

		},
		function(err){
			$ionicLoading.show({template: 'Errore di caricamento...', duration:500});
			})
                        
	  }

	  factory.selectPicture = function() { 
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        targetWidth: 300,
                        targetHeight: 300
                        
		};

	  $cordovaCamera.getPicture(options).then(
		function(imageURI) {
			window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
				$rootScope.picData = fileEntry.nativeURL;
				$rootScope.ftLoad = true;
				//var image = document.getElementById('myImage');
				//image.src = fileEntry.nativeURL;
                                 
  			});
			$ionicLoading.show({template: 'Foto acquisita...', duration:500});
                     
		},
		function(err){
			$ionicLoading.show({template: 'Errore di caricamento...', duration:500});
		})
	};

    factory.uploadPicture = function() {
		$ionicLoading.show({template: 'Uploading Photo...'});
		var fileURL = $rootScope.picData;
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                var fn  = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = true;
              // alert(localStorage.currentuserid+"-"+fn);   
		var params = {};
		params.value1 = "someparams";
                params.value2 = "otherparams";
                params.userid = localStorage.currentuserid;

		options.params = params;
                $rootScope.serverurl = $rootScope.serverurl+localStorage.currentuserid+"&fileName="+fn+"&message="+$rootScope.postmsg
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI($rootScope.serverurl), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
		$ionicLoading.hide();}, options);
    }

	var viewUploadedPictures = function() {
		$ionicLoading.show({template: 'Uploading Photo...'});
        server = $rootScope.serverurl;
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {					 
                      //document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                   //  alert("Successfully Uploaded"+xmlhttp.responseText);
                  $ionicLoading.show({template: 'Successfully Uploaded'});
                      // $rootScope.$emit("CallloadRelatives",[localStorage.currentuserid]);
                      // localStorage.callloadRelativ = 1;
                      // $location.path("/app/home").replace();
                     $timeout(function(){ window.location.reload(true);   },100);
                      
                      //$ionicLoading.show({template: 'Successfully Uploaded-'+xmlhttp.responseText});
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
					return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()}	;
	    $ionicLoading.hide();
    }

	
    
    return factory;
})
.factory('MyValidation', function(ionicToast) {
    var factory = {}; 
         factory.email = function(email) {
             
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  return (true) 
               ionicToast.show('You have entered an invalid email address!', 'top', false, 2500);
               return false;
                
            }
        factory.phone = function(phone) {
                var phoneno = /^\d{10}$/;  
                if((phone.match(phoneno)))  return true;  
                else {  ionicToast.show('Pls enter valid phone', 'top', false, 2500); return false;   }          
            }
    return factory;
})
.controller('FbCtrl', function($scope,$http, $state, $q, UserService,serviceurl, $ionicLoading,$ionicActionSheet,$cordovaGeolocation) {
  // This is the success callback from the login method
   $scope.signupData = [];

    
   /***********************************************************signup************************/  
  $scope.doFBUserRegister = function() {
    console.log('Doing register:::'+$scope.signupData.username+":"+$scope.signupData.email+":"+$scope.signupData.userid);
    //$location.path("/app/home");
   // alert(localStorage.starter_facebook_user.name+localStorage.starter_facebook_user.picture+localStorage.starter_facebook_user.email+localStorage.starter_facebook_user.userID);
     if($scope.signupData.username&&$scope.signupData.email&&$scope.signupData.userid) 
     {    
         
       if(!$scope.signupData.phone) $scope.signupData.phone = "";   
       //+"&picture="+$scope.signupData.picture
      var data = "username="+$scope.signupData.username+"&phone="+$scope.signupData.phone+"&email="+$scope.signupData.email+"&userid="+$scope.signupData.userid+"&lat="+$scope.lat+"&lng="+$scope.lng;;
   // alert($scope.loginData.phone);
   
      // console.log(data);
        console.log(serviceurl+"doRegister"+data);
    
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"doRegister",
                         data: data
                     }).
                     success(function(data) {
                          //alert(data);
                         // console.log("register response:"+data.sql+":"+data.rn);
                         // if(!data) ionicToast.show('You have entered an invalid login info!', 'top', false, 2500);
                          if(data.userId>=1) { 
                            //  ionicToast.show('You have successfully registered,Pls login now', 'top', false, 2500);
                              
                            localStorage.currentuserid = data.userId;
                            localStorage.currentusername = data.firstName;
                            localStorage.currentuserpic = data.userPicture;
                            localStorage.currentuserphone = data.phone;
                            localStorage.currentuseremail =  data.userEmail;
                            localStorage.loggedin = 1;
                            localStorage.loguid =  data.userId;
						     //user lat lng update
			    UserService.updateUserLatlng();
							 
                            $state.go('app.home'); 
                            
                              
                          }
   
                     }).
                     error(function(data, response) {
                         
                         console.log(response + " " + data);
                     });
    
      } //end of if 
      
          //ionicToast.show('You have not entered username,phone and email correctly', 'top', false, 2500);
  }
/***********************************************************end of signup************************/
 
    
    
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      
        $scope.signupData.userid = authResponse.userID;
        $scope.signupData.username = profileInfo.name ;
        $scope.signupData.email = profileInfo.email;
        $scope.signupData.picture = "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large" ;


        $scope.doFBUserRegister();
      
      
      
      //$state.go('app.home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
      
     // Facebook logout
        facebookConnectPlugin.logout(function(){
          },
        function(fail){
         });  
      
      
      
    facebookConnectPlugin.getLoginStatus(function(success){
        
        
        
        
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus within connected:'+ success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});
                                                
                                            $scope.signupData.userid = profileInfo.id;
                                            $scope.signupData.username = profileInfo.name ;
                                            $scope.signupData.email = profileInfo.email;
                                            $scope.signupData.picture = "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large" ;
                                            
                                            
                                            $scope.doFBUserRegister();

						//$state.go('app.home');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					
                
                                    localStorage.currentuserid = user.userID;
                                    localStorage.currentusername = user.name;
                                    localStorage.currentuserpic = user.userID+".jpg";
                                    localStorage.currentuserphone = user.phone;
                                    localStorage.currentuseremail =  user.email;
                                    localStorage.loggedin = 1;
									
									//user lat lng update
									 UserService.updateUserLatlng();
                                   // $state.go('login-circle');
                                   $scope.doFBUserRegister();
                                    //$state.go('app.home');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus:'+success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
  
  
  //logout 
  
  
  
  $scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout?',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
                                
                                localStorage.currentuserid = "";
                                localStorage.currentusername = "";
                                localStorage.currentuserpic = "";
                                localStorage.currentuserphone = "";
                                localStorage.currentuseremail = "";
                                localStorage.loggedin = "";
                                $state.go('login-circle');
				//return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          //$state.go('welcome');
            localStorage.currentuserid = "";
            localStorage.currentusername = "";
            localStorage.currentuserpic = "";
            localStorage.currentuserphone = "";
            localStorage.currentuseremail = "";
            localStorage.loggedin = "";
            $state.go('login-circle');
          
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};
  
  
  
  
  
})

.service('UserService', function($http,serviceurl,$cordovaGeolocation,$rootScope) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  
  var updateUserLatlng = function() {
   	  
	  
       var geoSettings = {frequency: 1000, timeout: 30000, enableHighAccuracy: false};
       //switch
       //geo coder 
	   
          var watch = $cordovaGeolocation.watchPosition(geoSettings);
            watch.then(
            null,
            function(err) {
              // error
            },
            function(position) {
              var lat = position.coords.latitude;
              var lng = position.coords.longitude;
              console.log("Lat:"+lat+"- Long:"+lng);
              //updated logged in user lat/lng
              localStorage.logulat = lat;
              localStorage.logulng = lng;
              //localStorage.centeruid
              //localStorage.loguid
              //request update
            
              var data = "userId="+localStorage.loguid+"&lat="+ lat+"&lng="+lng; 
             // alert(data);
		    $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"updateUserGeoInfo",
                         data: data
                     }).
                     success(function(data) {
                        // alert(data);
                         //console.log(data);
                        // $("#mycurlocation").html("Location: Dhaka");
                        
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
			 //end of user geo update
		 }, function(error){console.log("Could not get location");
              //end of http
              }); 
           
	   	  
	//geo coder
	  
	  
	  
   
  };

  
  //get currentuser lat long
  //unfinished need to work more here
  var getUserLatlng = function() {
   	  
	  			 //api call user geo update
            var data = "userId="+localStorage.currentuserid;   
      
                $http({
                         method: 'POST',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: serviceurl+"getUserGeoInfo",
                         data: data
                     }).
                     success(function(data) {
                         
                        
                     }).
                error(function(data, response) {
                    console.log(response + " " + data);
                });
			 //end of user geo update
		
	
	  
	  
   
  };

  
  
  
  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser,
	updateUserLatlng: updateUserLatlng,
        getUserLatlng : getUserLatlng
  };
});

