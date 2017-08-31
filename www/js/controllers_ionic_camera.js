angular.module('starter.controllers', ['ngCordova'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends, Camera,$timeout, $cordovaFileTransfer) {
  $scope.friends = Friends.all();
  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
	  
	  
	  //upload
	  
	 // var url = "http://siliconvalleynest.com/familykoolapi/index.php?method=uploadProfilePic";
	  var url = "http://siliconvalleynest.com/familykoolapi/upload.php";
	    //target path may be local or url
		//var selfile = document.getElementById("file").value;
		//alert(selfile);
	    var targetPath =  imageURI;  //selfile;  // "http://your.IP/serverfiletransfer/images/my.jpg";
        var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg"
        };
       
	   
	   //"/android_asset/www/img/ionic.png"
        $cordovaFileTransfer.upload( url, "/android_asset/www/img/ionic.png", options).then(function(result) {

	   
	   // $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success");
            alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            
        });
	  
	  
	  
	  //end of upload
	  
	  
	  
	  
	  
	  
    }, function(err) {
      console.err(err);
    });
    /*
    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
    */
  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
