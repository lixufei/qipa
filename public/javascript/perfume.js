var perfume = angular.module('my-perfume',[]);

 perfume.controller('savePerfume', ['$scope', '$http', function ($scope, $http) {

	 //$scope.savePerfume = function (perfumeData) {
	 // $params = $.param({
	 //	 "name": myName,
	 //	 "description": myDescription,
	 // });
	 // console.log('*****'+$params);
	 // $http({
	 //	 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	 //	 url: '/plants',
	 //	 method: 'POST',
	 //	 data: $params,
	 // })
	 //	 .success(function(addData) {
	 //		 $http.get('/plants').then(function(response){
	 //			 $scope.newPlants = response.data;
	 //		 });
	 //	 });
	 //};

	 $scope.processForm = function() {
	  $http({
	 	 method: 'POST',
	 	 url: '/plants',
		  params: {name: $('input[name="name"]').val(),description: $('input[name="description"]').val()}, // pass in data as strings
	 	 headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
	  })
	 	 .success(function (data) {
	 		 console.log(data);
	 	 });
	 };
	 //$scope.saveData = function() {
	 // $scope.nameRequired = '';
	 // $scope.emailRequired = '';
	 // $scope.passwordRequired = '';
	 //
	 // if (!$scope.formInfo.Name) {
	 //	 $scope.nameRequired = 'Name Required';
	 // }
	 //
	 // if (!$scope.formInfo.Email) {
	 //	 $scope.emailRequired = 'Email Required';
	 // }
	 //
	 // if (!$scope.formInfo.Password) {
	 //	 $scope.passwordRequired = 'Password Required';
	 // }
	 //};



 }]);

 perfume.controller('showPerfume', ['$scope', '$http', function ($scope, $http) {
 	$scope.perfume = 'helloPerfume';
 	$scope.plants = [
 	    {"name": "Nexus S",
 	     "snippet": "Fast just got faster with Nexus S.",
 	     "age": 0},
 	    {"name": "Motorola XOOM™ with Wi-Fi",
 	     "snippet": "The Next, Next Generation tablet.",
 	     "age": 1},
 	    {"name": "MOTOROLA XOOM™",
 	     "snippet": "The Next, Next Generation tablet.",
 	     "age": 2}
 	  ];

 	  //difference between then and success
 	$http.get('/plants').then(function(response){
 		$scope.newPlants = response.data;
 	});
 	// $http.get('/plants').success(function(response){
 	// 		$scope.newPlants = response;
 	// 	});

 }]);
