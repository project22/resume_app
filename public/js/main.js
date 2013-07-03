$(document).ready(function(){

	console.log("i am alive");

	//get all the records from the Rest server
	console.log($.ajax('/api/resumes'));
	// grab the id of the top one, and insert it below.

	// reserve this var to be use throughout this function and nested functions.
	//Scope

	var current_record;

	// build the delete function for that id

	$.ajax("/api/resumes", {
		complete: function(response){
			var my_JSON_object = response.responseJSON[0];

			current_record =my_JSON_object.id;

			$("#name").html(my_JSON_object.name_first + " " + my_JSON_object.name_last);			
			$("#linked_in").html(my_JSON_object.linked_in);
			$("#twitter").html(my_JSON_object.twitter);
			$("#website").html(my_JSON_object.website);

			//contact info.  Using a variable to hold the JSON object.
			$("#street_address").html(my_JSON_object.contact_info.street_address.street);
			$("#city").html(my_JSON_object.contact_info.street_address.city);
			$("#state").html(my_JSON_object.contact_info.street_address.state);
			$("#zip_code").html(my_JSON_object.contact_info.street_address.zip_code);
			$("#phone").html(my_JSON_object.contact_info.phone);
			$("#email").html(my_JSON_object.contact_info.email);


			//output all experience
			for (var i=0 ; i < my_JSON_object.experience.length ; i++)
				{ 				
					var list = $('<ul>');
					$("#experience").append(list);
					output_line_item("description", my_JSON_object.experience[i].organization, list);
					output_line_item("month_year", my_JSON_object.experience[i].project, list);
					output_line_item("title", my_JSON_object.experience[i].role, list);
					output_line_item("title", my_JSON_object.experience[i].start_month_year, list);
					output_line_item("title", my_JSON_object.experience[i].end_month_year, list);
					output_line_item("title", my_JSON_object.experience[i].location, list);

					var list2 = $('<ul>');
					//$("#skills").append(list);
					list.append("<h4>Responsibilities</h4>");
					list.append(list2);

					for (var i2=0 ; i2 < my_JSON_object.experience[i].responsibilities.length ; i2++)
					{ 				
						var list3 = $('<ul>');
						list2.append(list3);
						output_line_item("", my_JSON_object.experience[i].responsibilities[i2], list3);
						
					}
				
				}

			//output all skills
			for (var i=0 ; i < my_JSON_object.skill.length ; i++)
				{ 				
					var list = $('<ul>');
					$("#skills").append(list);
					output_line_item("description", my_JSON_object.skill[i].title, list);
					output_line_item("month_year", my_JSON_object.skill[i].category, list);
					output_line_item("title", my_JSON_object.skill[i].experience, list);
				}

			//output all accomplishments
			for (var i=0 ; i < my_JSON_object.accomplishments.length ; i++)
				{ 				
					var list = $('<ul>');
					$("#accomplishments").append(list);
					output_line_item("description", my_JSON_object.accomplishments[i].description, list);
					output_line_item("month_year", my_JSON_object.accomplishments[i].month_year, list);
					output_line_item("title", my_JSON_object.accomplishments[i].title, list);
				}


			//output all schools
			for (var i=0 ; i < my_JSON_object.schools.length ; i++)
				{ 
					//console.log(my_JSON_object.schools[i].name);
					var list = $('<ul>');
					$("#educations").append(list);
					output_line_item("Institution", my_JSON_object.schools[i].name, list);
					output_line_item("Degree", my_JSON_object.schools[i].degree, list);
					output_line_item("GPA", my_JSON_object.schools[i].gpa, list);
					output_line_item("Major", my_JSON_object.schools[i].major, list);
					output_line_item("Minor", my_JSON_object.schools[i].minor, list);
					output_line_item("Start Year", my_JSON_object.schools[i].start_month_year, list);
					output_line_item("End Year", my_JSON_object.schools[i].end_month_year, list);
					//$("#educations").append("</ul>");

				}

/*
				//DRY?  Don't repeat yourself.  
				$("#schools_name").html(my_JSON_object.schools[i].name);
				$("#degree").html(my_JSON_object.schools[i].degree);
				$("#gpa").html(my_JSON_object.schools[i].gpa);
				$("#major").html(my_JSON_object.schools[i].major);
				$("#minor").html(my_JSON_object.schools[i].minor);
				$("#start_month_year").html(my_JSON_object.schools[i].start_month_year);
				$("#end_month_year").html(my_JSON_object.schools[i].end_month_year);
*/
				

			//experience - Another array.
			$("#organization").html(my_JSON_object.experience[0].organization);
			$("#project").html(my_JSON_object.experience[0].project);

			//multiple subrecords here.  
			$("#schools_name").html(my_JSON_object.schools[0].name);
			$("#schools_name").html(my_JSON_object.schools[0].name);
			$("#schools_name").html(my_JSON_object.schools[0].name);
			$("#schools_name").html(my_JSON_object.schools[0].name);

			console.log(response.responseJSON);
		}
	});
	
	$("#delete_button").click( function(){
		$.ajax({
			url: "api/resumes/" + current_record, 
			type: "DELETE",
			success: function(result){
				// do something cool
				// reload page
				console.log("deleted: " + current_record)
			}
		});

	});

});

function output_line_item(line_label, line_item, list) {
	// tags. blocks HTML  #educations ul -  I'm selecting this particular ul block.  selectors.  LEARN MORE.
	list.append("<li><span class=\"label\">" + line_label + "</span>" + line_item + "</li>");
	}