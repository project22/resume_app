/*
NOTES

the expand section for responsibilities is nested.  The target of where to add the addition box is confused, because
the class target is not unique.  It needs to be dynamic.

When I examine the elements, I don't see my div blocks for the additional cloned blocks.





*/



$(document).ready(function(){
/*
	$(".education_block_add").click(add_block('.education_block_add', ".education_block"));
	$(".experience_block_add").click(add_block('.experience_block_add', ".experience_block"));
	$(".skill_block_add").click(add_block('.skill_block_add', ".skill_block"));
	$(".responsibility_block_add").click(add_block('.responsibility_block_add', ".responsibility_block"));
	$(".accomplishment_block_add").click(add_block('.accomplishment_block_add', ".accomplishment_block"));
*/



	$("#userDataForm").submit(function(){


		

		

		var userData = {};  //var userData is a new hash object
		//create new indexed in userData, and assign it the values from the form. e.g. $("#signup_name").val(); 


		//Start Personal Information
		//find the first name and last name in the one signup_name string
		var fullName = $("#signup_name").val();  	
		var name_array = fullName.split(" ");
		//consol.log(name_array);
		userData.name_first = name_array[0];
		userData.name_last = name_array[name_array.length -1];

		userData.linked_in = $("#linkedin").val();  
		userData.website = $("#website").val();  
		userData.twitter = $("#twitter").val();  
		//End Personal Information

		//Start Contact Information
		userData.contact_info = {}
			userData.contact_info.email = $("#email").val();  
			userData.contact_info.phone = $("#phone").val();  
			userData.contact_info.street_address = {}
				userData.contact_info.street_address.city = $("#city").val();  
				userData.contact_info.street_address.state = $("#state").val();  
				userData.contact_info.street_address.street = $("#street_number").val(); 
				userData.contact_info.street_address.zip_code = $("#zip").val(); 
			//End Contact Information
		
		//https://github.com/machikoyasuda/resume/blob/master/public/js/signup.js
		userData.schools = [];

		var education_blocks = $(".education_block");
		// var education_blocks = [1, 2, 3];

		education_blocks.each(function(index, item) {  // .each(fuction(x,y){}) is park of the jQuery object set above.
			userData.schools.push({
				name 				: $(item).find('#institution').val(),
				degree 				: $(item).find('#degree').val(),
				gpa					: $(item).find('#gpa').val(),
				major				: $(item).find('#major').val(),
				minor				: $(item).find('#minor').val(),
				start_month_year 	: format_date($(item).find("#start_month_year").val()),
				end_month_year 		: format_date($(item).find("#end_month_year").val()),
			});

		});


		userData.experience = [];
		var experience_blocks = $(".experience_block");
		// var education_blocks = [1, 2, 3];




		experience_blocks.each(function(index, item) {
			// make responsibiliy_arrayname for each experience. This is special
			var responsibilities = [];
			var responsibility_blocks = $(".responsibility_block");  // make an array in the experience_blocks{} object

			responsibility_blocks.each(function(index, item) {			
				// add each of the responsibilities into the array which will be added
				// in the userData.experience.push below.  
				responsibilities.push($(item).find("#responsibility").val());
			});
			
				

			


			userData.experience.push({
				organization 		: $(item).find('#organization').val(),
				project 			: $(item).find('#project').val(),
				role 				: $(item).find('#role').val(),
				start_month_year 	: format_date($(item).find('#start_month_year').val()),
				end_month_year 		: format_date($(item).find('#end_month_year').val()),
				location 			: $(item).find('#location').val(),	
				responsibilities 	: responsibilities // first is the label, second is array
			});
			//finished



		});

		//skill_block
		userData.skill = [];
		var skill_block = $(".skill_block");

		skill_block.each(function(index, item) {
			userData.skill.push({
				title 				: $(item).find('#title').val(),
				category 			: $(item).find('#category').val(),
				experience 			: $(item).find('#experience').val(),

			});

		});


		//Add the accomplishments to the JSON object
		userData.accomplishments = [];
		var accomplishment_blocks = $(".accomplishment_block");

		accomplishment_blocks.each(function(index, item) {
			userData.accomplishments.push({
				title 				: $(item).find('#title').val(),
				month_year 			: format_date($(item).find('#month_year').val()),
				description			: $(item).find('#description').val(),
				
			});

		});


		console.log(userData);



		// put all the userData JSON data into a new object call postData and make it a big JSON string.
		var postData = JSON.stringify(
				{'resume': userData});
/*
		var postData = {};
		postData.resume =userData ;
*/		
		console.log(postData);

		//Now post this using AJAX to the less Ruby server
		$.ajax({
			type: 	"POST",
			url: 	"/api/resumes",
			data: 	postData
		});
		//end the post to AJAX.  worked well.


		return false;  //kills the forms normal function.  return false destroys the natural behavior of HTML,
		//The return false command must be at the END of the functionm.
		//CAREFULL no code after this statement in this fucntion will be executed


		
	});

	//second attempt at the block add
	//it will listed to any elemnt with closs of ".add_block"
	// function add_block2(){
		$(".add_block2").click(function(){
			var html = $(this).parent().prev().clone();
			// Problem.  It's grabbing the previous along with all the other cloned blocks.  
			console.log(html);
			html.css("display", "none");	
			html.find("input").val("");
			$(this).parent().before(html);
			html.slideDown(600); //html is an object
			//add_block2();  //turn it back on again.  It got fired off already.
			return false;
		});
	// }
	//turn it on for the first time here
	// add_block2();


});

/*
function add_block(trigger_name, block_name) {
	$(trigger_name).click(function(){
		var html = $(block_name).first().clone();  //cloning the first in the array of the div named.  
		// need to trace the events and objects.  
		html.css("display", "none"); // the html object must be hidden in order to be seen revealed in animation
		html.find("input").val("sample data");  //finding the input elements by tag name "input" and setting value to empty string.
		$(this).before(html);  // What is this?  this is the link
		html.slideDown(600); //html is an object
		return false;
	});
};
*/

function format_date(date_string){
	formatted_date = date_string.slice(date_string.length-2, date_string.length) + date_string.slice(2,4);
	return formatted_date;
}







