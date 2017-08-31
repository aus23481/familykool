//, 'ngCordovaOauth'
angular.module('starter.controllers', ['ionic-toast','ngCordova'])

.controller('AppCtrl', function($scope,serviceurl , $ionicModal,$timeout,$location,$window,$http,ionicToast,$rootScope) {

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

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/user-login.html', {
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
   $scope.$watch('loggedin', function() {
       // alert('hey,logged has changed!');
         $scope.$apply();
        //+$location.path()
        // $window.location.reload(true);
    });
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    //$location.path("/app/home");
    var data = "username="+$scope.loginData.username+"&phone="+$scope.loginData.phone+"&email="+$scope.loginData.email;
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
                              localStorage.currentusername = data.firstName;
                              localStorage.currentuserpic = data.userPicture;
                              localStorage.currentuserphone = data.phone;
                              localStorage.currentuseremail = data.userEmail;
                              localStorage.loggedin = 1;
                              $scope.loggedin = 1;
                               
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
    var data = "username="+$scope.signupData.username+"&phone="+$scope.signupData.phone+"&email="+$scope.signupData.email;
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

.controller('HomeCtrl', function($scope,$timeout,serviceurl,$http,$location,$ionicHistory,ionicToast,Upload,$rootScope,$window ) {
   
  //alert(localStorage.loggedin);     
  // alert(localStorage.currentuserid);
  //$state.go('app.home');
  //console.log(localStorage.currentuser);
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
            
            
            
   $scope.mypic = localStorage.currentuserpic;
   $scope.users = [];
   $scope.relativeData = [];
   
   $scope.loggedinuserid    = localStorage.currentuserid;
   $scope.loggedinusername  = localStorage.currentusername;
   $scope.loggedinuserphone = localStorage.currentuserphone;
   $scope.loggedinuseremail = localStorage.currentuseremail;
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
     ///alert(id);
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
                           $timeout(function(){
                               $scope.makeCircular();
                          },2000);
                         // }
  
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
  }
  
   
  
  $scope.moveToCenter = function(id){
  
 		   $("#activate").find("img").attr("src","img/"+id+".jpg").hide(0).fadeIn(500).css({"transform":"scale(1.25,1.25) rotate(360deg)","transition":"all 3s"});
                   $scope.loadRelatives(id);
 
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
                           console.log(data.length+"success");
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });

    } 
    
    
     $scope.addRelative = function(){
         
       //  `relativeOfUserId``relativeUserId``relationId` 
        
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
        // $scope.loadRelatives(id);
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
                          
                     }).
                     error(function(data, response) {
                         console.log(response + " " + data);
                     });
      
      
       
       
   } //end of getposts

   
   
   $scope.getPhoto = function(){
       
         var url = "http://siliconvalleynest.com/familykoolapi/upload.php";
        // var url = "http://siliconvalleynest.com/familykoolapi/index.php?method=uploadProfilePic";
         
        $cordovaFileTransfer.upload(url, "/android_asset/www/img/ionic.png", options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
       
       
       
       /* Upload.fileTo("http://siliconvalleynest.com/familykoolapi/index.php?method=uploadProfilePic").then(
			function(res) {
				// Success
                                console.log(res);
			}, function(err) {
				// Error
			})
		; */
     }
   
   /* $scope.getPhoto = function(){

            alert(document.getElementById("image").value);      
            var options = {

                quality: 60,

                destinationType: Camera.DestinationType.DATA_URL,

                sourceType: Camera.PictureSourceType.CAMERA,

                allowEdit: true,

                encodingType: Camera.EncodingType.JPEG,

                targetWidth: 100,

                targetHeight: 100,

                popoverOptions: CameraPopoverOptions,

                saveToPhotoAlbum: false,

                correctOrientation:true

             };

                $cordovaCamera.getPicture(options)

                .then(function(data){

                $scope.enablePicPanel();

                // console.log("Camera data"+angular.toJson(data));

                $scope.urlJugList= "data:image/jpeg;base64,"+data;

                setTimeout(function() {

                $scope.uploadPic($scope.urlJugList);

                }, 6000);

                }, function(error){

                console.log("Camera Error"+angular.toJson(error));

                });

                }; //end of get photo

    $scope.uploadPic = function(file) {
        var options = {
            fileKey: "file",
            fileName: "image.png",
            chunkedMode: false,
            mimeType: "image/png"
        };
       alert(file);
       //http://192.168.56.1:1337/file/upload
       //"/android_asset/www/img/ionic.png"
        $cordovaFileTransfer.upload("http://siliconvalleynest.com/familykoolapi/index.php?method=uploadProfilePic", "/android_asset/www/img/ionic.png", options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
    }  */
    
    
  
})  //end of home cntrl
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

.factory('Upload', function($q, $cordovaCamera, $cordovaFileTransfer) {
    //,$cordovaFileTransfer,$cordovaCamera
    return {

        fileTo: function(serverURL) {

        	var deferred = $q.defer();

			if (ionic.Platform.isWebView()) {

				var options =   {
				    quality: 100
				   // , destinationType: Camera.DestinationType.FILE_URI
				  ///  , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
				  //  , encodingType: Camera.EncodingType.JPEG
                                   , destinationType: 1
				    , sourceType: 1
				  //  , encodingType: Camera.EncodingType.JPEG
				}

				$cordovaCamera.getPicture(options).then(

					function(fileURL) {

						var uploadOptions = new FileUploadOptions();
						uploadOptions.fileKey = "file";
						uploadOptions.fileName = "test.jpg"    ;//fileURL.substr(fileURL.lastIndexOf('/') + 1);
						uploadOptions.mimeType = "image/jpeg";
						uploadOptions.chunkedMode = false;

						$cordovaFileTransfer.upload(serverURL, fileURL, uploadOptions).then(

							function(result) {
								deferred.resolve(result);
							}, function(err) {
								deferred.reject(err);
							})

						;

					}, function(err){
						deferred.reject(err);
					})

				;

			}
			else {
				deferred.reject('Uploading not supported in browser');
			}

			return deferred.promise;

        }

    }

})
/*
.controller('OauthLogin', ['$scope', '$cordovaOauth', '$http', function($scope, $cordovaOauth, $http){
  $scope.googleLogin = function(){
    $cordovaOauth.google("398563062284-qc5picsh8b624b125fuuhhpvv2531a3n.apps.googleusercontent.com", 
      ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email", 
      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).
    then(function(result){
      console.log("google login success");
      var accessToken;
      //$location.url('/scan');
      console.log(JSON.stringify(result));
      accessToken = JSON.stringify(result);
      console.log(result.access_token);
      console.log(typeof(result.access_token));

      //getting profile info of the user
      $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
      success(function(response){
               console.log(response);
              var param = {
                provider: 'google',
                  google: {
                                uid: response["id"],
                                provider: 'google',
                                first_name: response["name"]["givenName"],
                                last_name: response["name"]["familyName"],
                                email: response.emails[0]["value"],
                                image: response.image.url
                            }
                };
                console.log(param);
      }, function(error) {
      console.log(error);
    });

  }, function(error){
    console.log(error);
  });
}
  
}]) */
;
