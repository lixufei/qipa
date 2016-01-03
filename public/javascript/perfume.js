var perfume = angular.module('my-perfume',[]);

 perfume.controller('savePerfume', ['$scope', '$http', function ($scope, $http) {
	 $scope.processForm = function() {
	  $http({
	 	 method: 'POST',
	 	 url: '/plants',
		  params: {name: $('input[name="name"]').val(),description: $('input[name="description"]').val()}, // pass in data as strings
	 	 headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
	  })
	 	 .success(function (req, res) {
			  window.location = '/perfume';
		  });
	 };

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

	 $scope.delete = function(record) {
		 $http.delete('/plants/' + record.id);
		 $scope.newPlants.splice($scope.newPlants.indexOf(record), 1);
	 };

	 $scope.update = function (record) {
		 console.log(record);
		 $http({
			 method: 'POST',
			 url: '/plants/'+ record.id,
			 params: {name: $('input[name="name"]').val(),description: $('input[name="description"]').val()}, // pass in data as strings
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
		 })
			 .success(function (data) {
				 console.log('******'+data);
			 });
	 }

	 $scope.showEdit = true;
	 $scope.master = {};

 }]);

perfume.directive("edit",function($document){
	return{
		restrict: 'AE',
		require: 'ngModel',
		link: function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				var id = "txt_name_" +ngModel.$modelValue.id;
				scope.$apply(function(){
					angular.copy(ngModel.$modelValue,scope.master);
				})
				var obj = $("#"+id);
				obj.removeClass("inactive");
				obj.addClass("active");
				obj.removeAttr("readOnly");
				scope.$apply(function(){
					scope.showEdit = false;
				})
			});
		}
	}
});
perfume.directive("update",function($document, $http){
	return{
		restrict: 'AE',
		require: 'ngModel',
		link: function(scope,element,attrs,ngModel,http){
			element.bind("click",function(){
				var id = "txt_name_" +ngModel.$modelValue.id;
				$http.put('/plants/'+ngModel.$modelValue);
				var obj = $("#"+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.attr("readOnly",true);
				scope.$apply(function(){
					scope.showEdit = true;
				})
			})
		}
	}
});

perfume.directive("cancel",function($document){
	return{
		restrict: 'AE',
		require: 'ngModel',
		link: function(scope,element,attrs,ngModel){
			element.bind("click",function(){
				scope.$apply(function(){
					angular.copy(scope.master,ngModel.$modelValue);
					//console.log(ngModel.$modelValue);
				})

				var id = "txt_name_" +ngModel.$modelValue.id;
				var obj = $("#"+id);
				obj.removeClass("active");
				obj.addClass("inactive");
				obj.prop("readOnly",true);
				scope.$apply(function(){
					scope.showEdit = true;
				})
			})
		}
	}
});

