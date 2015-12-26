 var perfume = angular.module('my-perfume', []);

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