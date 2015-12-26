// $(document).ready(function(){
// 	getData();
// 	saveData();
// });

// var getData = function () {
//   $.getJSON("/plants",function(result){
//     $.each(result, function(i, field){
//       $("div").append(field.id + " ");
//       $("div").append(field.name + " ");
//       $("div").append(field.description + " " + "<br />" + "");
//       // $("tr > td:eq(0)").text(field.id);
//       // $("tr > td:eq(1)").text(field.name);
//       // $("tr > td:eq(2)").text(field.description);
//     });
//   });
// };

// var saveData = function () {
// 	$(".ok").click(function(){
//   	  $.ajax({
//   	  	url: "/plants",
//   	  	type: "post",
//   	  	data: {"name": $(".name").val(), "description": $(".description").val()},
//   	  	success: function (data) {
//   	  		location.reload();
//   	  		getData();
//     	}
//   	  });
//   	});
// };

// var deleteData = function () {

// };

function AppViewModel() {
  var self = this;
  // var result = [];
    self.firstName = ko.observable("Bert");
    self.lastName = "Bertington";
    self.items = ko.observableArray([]);
    self.id = ko.observable(0);
    self.name = ko.observable("");

    $.getJSON("/plants", function(data) { 
      console.log(data[0]);
      
     // for (var i = 0; i < data.length; i ++) {
     //  result.push (data[i]);
     //  // self.name.push(data[i].name);
     // }
     self.items(data);
     // console.log(result);
     //  return result;
     // data.forEach(function(plantResult){
     //  console.log("+++"+result.name);
     //  result.push({
     //    "id": plantResult.id,
     //    "name":plantResult.name,
     //    "description": plantResult.description
     //  });
     // })
    });
}

ko.applyBindings(new AppViewModel());