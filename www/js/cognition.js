/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('cognition.controllers', ['ngCordova'])
 .controller('CognitionCtrl',function($scope, $rootScope, $stateParams,$location, $state, $http, $cordovaCamera){
    
 // alert("Congnition");
     
     
     
  $rootScope.progress = false;
  $scope.select = [];
  $scope.select.input = "emotion";
  $scope.select.detail = "Anger,Sadness,Happiness,Neutral";
  $scope.allowEdit = true;
  $scope.selielyze = function() {
    $rootScope.progress = true;

    navigator.camera.getPicture(function (imageData) {
      $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
      // Emotion  
      if($scope.select.input=="emotion"){
      $scope.allowEdit = true;	  
      $http({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "f0c44f0ead094f7aad1c44164bdac77f"
        },
        data: makeblob("data:image/jpeg;base64," + imageData),
        processData: false
      })
        .then(function(response) {
          var max = Object.keys(response.data[0].scores).reduce(function(m, k){
            return response.data[0].scores[k] > m ? response.data[0].scores[k] : m
          }, -Infinity);

          var maxObj = [];

          angular.forEach(response.data[0].scores, function(value, key) {
            if(value == max) {
              this.push(key);
            }
          }, maxObj);

          $rootScope.expression = maxObj[0];
	//  alert($rootScope.expression);	  
		    $rootScope.age = "";
		    $rootScope.gender = "";
                    $rootScope.smile = "";
                    $rootScope.glasses = "";
	    $rootScope.progress = false;		
          //$state.go('photo');
         //  $location.path("/app/photo");
         // window.location.href = "index.html#/app/photo";

        },
        function(response) { // optional
          console.log("failed");
          console.log(response.data);
        });
	  } //end of emotion	
	  
	  
	  
	  		//face
	if($scope.select.input=="face"){	
		$scope.allowEdit = false;
		$http({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=fale&returnFaceAttributes=age,gender,smile,glasses",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "ca9135a87e274c29ae39e001b69b7deb"
        },
        data: makeblob("data:image/jpeg;base64," + imageData),
        processData: false
      })
        .then(function(response) {
           
		   // alert(response.data[0].faceAttributes.age+response.data[0].faceAttributes.gender+response.data[0].faceAttributes.smile+response.data[0].faceAttributes.glasses);
                        $rootScope.age = response.data[0].faceAttributes.age;
                        $rootScope.gender = response.data[0].faceAttributes.gender;
			$rootScope.smile = response.data[0].faceAttributes.smile;
			$rootScope.glasses = response.data[0].faceAttributes.glasses;
                        $rootScope.expression = "";
			
			//$rootScope.text = response.data.description.captions[0].text ;
			
		  
        // alert("Age:"+$rootScope.age+"\n,Gender:"+ $rootScope.gender+"\n,Smile:"+$rootScope.smile+"\n,Glasses:"+$rootScope.glasses);		  
       // $state.go('photo');
          // $location.path("/app/photo");
           $rootScope.progress = false;	
        },
        function(response) { // optional
          console.log("failed");
          console.log(response.data);
        });
		
	  } //end of face
	  
	  
	  
	  
		//computer vision
	if($scope.select.input=="vision"){	
		$scope.allowEdit = false;
		//,Faces&details=Celebrities
		$http({
        url: "https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Description",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "2201b50eee93484fb540955e71ff9d40"
        },
        data: makeblob("data:image/jpeg;base64," + imageData),
        processData: false
      })
        .then(function(response) {
          
          //  $rootScope.age = response.data.faces[0].age;
		   // $rootScope.gender = response.data.faces[0].gender;
			$rootScope.text = response.data.description.captions[0].text ;
                        $rootScope.age = "";
                        $rootScope.gender = "";
			$rootScope.smile = "";
			$rootScope.glasses = "";
                        $rootScope.expression = "";
			
			
		  
	 // alert($rootScope.text);	  
         // $state.go('photo');
          // $location.path("/app/photo");
           $rootScope.progress = false;	

        },
        function(response) { // optional
          console.log("failed");
          console.log(response.data);
        });
		
	  } //end of vision	
	   //end of api cognitive	

    }, function () {
      // An error occured. Show a message to the user
      console.log("err -> " + err);
    }, {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: $scope.allowEdit,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 256,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      cameraDirection: 1
    });
  };

  
  
  
  
  
  
  

  function makeblob (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
  
  
  $scope.reload = function(){
    //alert('hi');
	window.location.reload(true);
  }

  $scope.uidesc = function(){
  //  alert($scope.select.input);
	if($scope.select.input=="emotion")  $scope.select.detail = "Anger,Sadness,Happines and Neutral";
	if($scope.select.input=="face")     $scope.select.detail = "Age,Gender and Glasses";
	if($scope.select.input=="vision")  $scope.select.detail = "Environmental Info about picture";
	//
  }   
 
  $scope.GoHome = function(){
    console.log("gohome");
    $rootScope.progress = false;
    $state.go('cognition');
  }   
  
   $scope.GoToHome = function(){
    console.log("gohome");
    $rootScope.progress = false;
    //$state.go('home');
    window.location.href = "index.html#/app/home";
  }  
    
});