/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('map.controllers', ['ngCordova'])
 .controller('MapCtrl',function($scope, $rootScope, $stateParams,$location, $state, $http, $cordovaGeolocation){
   
   
      
   
        $scope.locationlists = [];
							   
        var vm = this;
		
        vm.myLocation = "";
        var geoSettings = {frequency: 1000, timeout: 30000, enableHighAccuracy: false};
       // $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	
         
	  //end of map
 
 
       // /*
		

         
		 //*/
		
	$cordovaGeolocation.getCurrentPosition(geoSettings).then(function(position){
          
	         $scope.lat = position.coords.latitude;
             $scope.lng = position.coords.longitude;
			 $scope.latLng = new google.maps.LatLng($scope.lat, $scope.lng);
	         $scope.mapOptions = {
			  center: $scope.latLng,
			  zoom: 15,
			  mapTypeControl: false,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			 };
			$scope.map = new google.maps.Map(document.getElementById("map"),  $scope.mapOptions);	
           //* 

            $scope.prevmarker = new google.maps.Marker({
				  position:$scope.latLng,
				 // animation:google.maps.Animation.BOUNCE
			 });			
	
		   //switch
		    var watch = $cordovaGeolocation.watchPosition(geoSettings);
		   	watch.then(
			null,
			function(err) {
			  // error
			},
			function(position) {
			  $scope.lat = position.coords.latitude;
              $scope.lng = position.coords.longitude;
			  console.log("Lat:"+$scope.lat+"- Long:"+$scope.lng);
			  //alert("Lat:"+$scope.lat+"- Long:"+$scope.lng);
			 
			 
			 $scope.latLng = new google.maps.LatLng($scope.lat, $scope.lng);
			  
	         //move marker 
			 //$scope.map.overlayMapTypes.setAt( 0, null);
				   //add marker
			 var marker=new google.maps.Marker({
				  position:$scope.latLng,
				  icon:"http://52.1.229.213/ml/Abbas.jpg"
				 // animation:google.maps.Animation.BOUNCE
			 });
			 
			 
			 if($scope.prevmarker){
				 $scope.prevmarker.setMap(null);
				//alert("hi");
			 }	 
			 //marker[0].setMap(null); 
			 //setMapOnAll(null);
			 //console.log($scope.prevmarker);
			 $scope.prevmarker = marker;

			 marker.setMap($scope.map);
			  
			 //geo coder 
			 var geocoder = new google.maps.Geocoder(); 
			  var request = {
				latLng: $scope.latLng
			  };
			  geocoder.geocode(request, function(data, status) {
				 // alert("hi");
				if (status == google.maps.GeocoderStatus.OK) {
				  if (data[0] != null) {
					//alert("address is: " + data[0].formatted_address);
					//$scope.locationlists.push(data[0].formatted_address);
					
					
				  } else {
					alert("No address available");
				  }
				}
			  })
		});
		   
		   //sw
		
		//gmap
	  
		
	    
	 
		//$scope.map = new google.maps.Map(document.getElementById("map"),  $scope.mapOptions);
		
		
		 
		 var infowindow = new google.maps.InfoWindow({
		  content:"You are here now!"
		  });

		//infowindow.open($scope.map,marker);  
		

		
		//
		
		
	  }, function(error){console.log("Could not get location");
		
	 }); 	
			
		
 angular.forEach(localStorage.relatives, function(relative){
          console.log(relative.lat+"-"+relative.lng);
          
      });
    
});