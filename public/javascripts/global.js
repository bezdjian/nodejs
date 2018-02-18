// Userlist data array to fill in info box.
var userListData = [];

$(document).ready(function(){
	populateTable();
});


//Fill table with data
function populateTable(){
	var tableContent = "";

	//Jquery ajax call for JSON
	$.getJSON('/users/', function(data){
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>'+this.firstname+'</td>';
			tableContent += '<td>'+this.lastname+'</td>';
			tableContent += '<td>'+this.email+'</td>';
			tableContent += '</tr>';
		}); //End each
		console.log("TABLE CONTENT: " + tableContent);

		//Inject the tableContent into existing HTML table.
		$("#userList table tbody").html(tableContent);
	}); //End getJSON
}