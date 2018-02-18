// Userlist data array to fill in info box.
var userListData = [];

$(document).ready(function(){
	populateTable();

	//Username link click
	$("#userList table tbody").on('click', 'td a.linkshowuser', showUserInfo);

	//ADd user btn
	$("#btnAddUser").on('click', addUser)
});


//Fill table with data
function populateTable(){
	var tableContent = "";

	//Jquery ajax call for JSON
	$.getJSON('/users/', function(data){
		userListData = data; //save it globaly.
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="'+this.firstname+'">'+this.firstname+'</a></td>';
			tableContent += '<td>'+this.lastname+'</td>';
			tableContent += '<td>'+this.email+'</td>';
			tableContent += '</tr>';
		}); //End each

		//Inject the tableContent into existing HTML table.
		$("#userList table tbody").html(tableContent);
	}); //End getJSON
}

//SHow user info
function showUserInfo(event){
	//prevent links from firing
	event.preventDefault();

	//Retrieve firstname from link's rel attr.
	var firstname = $(this).attr('rel');

	//Get index of object based on ID value
	var arrayPosition = userListData.map(function(arrayItem){
			return arrayItem.firstname;
	}).indexOf(firstname);

	//Get our user object
	var thisUserObject = userListData[arrayPosition];

	//Populate info box
	$("#userInfoName").text(thisUserObject.firstname);
	$("#userInfoLastName").text(thisUserObject.lastname);
	$("#userInfoEmail").text(thisUserObject.email);
	$("#userInfoCountry").text(thisUserObject.country);
}

//Add user
function addUser(event){
	event.preventDefault();

	//easy validation if the inputs are blank
	var errorCount = 0;
	$("#addUser input").each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	//Check if errorCount is still zero
	if(errorCount === 0){
		var newUser = {
			'firstname': $("#addUser fieldset input#inputFirstName").val(),
			'lastname': $("#addUser fieldset input#inputLastName").val(),
			'email': $("#addUser fieldset input#inputEmail").val(),
			'country': $("#addUser fieldset input#inputCountry").val(),
		}

		//Use ajax to post the new user
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/adduser',
			dataType: 'JSON'
		}).done(function(response){
			//Check if successful (blank) response
			if(response.msg === ''){
				//Clear form inputs
				$("#addUser fieldset input").val('');
				//Update the table
				populateTable();
			}else{
				//display error
				alert("ERROR from posting new user: " + response.msg);
			}
		}).fail(function(res){
			console.error("FAIL: " + res.responseText)
		});
	}else{
		//if errorCount more than 1
		alert("Please fill in the fields");
		return false;
	}
}