$(function(){

	getAppointments();
	/* form hide-display and button hide-display */
	$('#add_cancel').hide();
	$('#appointment_table').hide();

	$('.new').click(function(){
		$('#add_cancel').show();
		$('#new_button').hide();
	});

	$('.cancel').click(function(){
		$('#new_button').show();
		$('#add_cancel').hide();
	});
	/* end of form hide-display and button hide-display */

	/* date validation to not allow future date selection */
	var todayDate = new Date().toISOString().slice(0,10);
	$("#date").attr("min", todayDate);

	/* form validation starts  and add submit handler*/
	$('#appointment_form').validate({
		rules: {
			date: "required",
			time: "required",
			description: "required"
		},
		messages: {
			date: "Date Cannot be Empty",
			time: "Time Cannot be Empty",
			description: "Description Cannot be Empty"
		},
		errorPlacement: function(error, element) {
			error.appendTo( element.parent("td").next("td"));
		},
		submitHandler: function(form){
			$.ajax({
				url: './cgi-bin/insertAppointments.pl',
				type: "POST",
				dataType: "text",
				data: $(form).serialize(),
				success: function(response){
					var result = JSON.parse("[" + response + "]");
					$('.form_inputs').find("input, textarea").val("");
					var html="";
					$('#appointment_table').show();
					$('#error_table').hide();
					$.each(result, function(index,item){
						html="<tr><td>"+item[0]+"</td><td>"+item[1]+"</td><td>"+item[2]+"</td></tr>";
					});
					$('.table_rows').append(html);
				}
			});
		}
	});
	/* form validation ends and add submit handler*/
});

/* search button activity */
$("#search_btn").click(function(){
	var search_data= $(".search").val();
	getAppointments(search_data);
});
/* search button activity ends*/

/* loading data for appointments in JSON format */
function getAppointments(data){
	$.ajax({
		url: './cgi-bin/getAppointments.pl',
		type: "GET",
		dataType: "JSON",
		data: {
			search_data: data
		},
		success: loadAppointments,
		error: errorLoadingData
	});
}

/* function to display appointments after success of loading from getAppointments() */
function loadAppointments(data){
	if(data.length==0){
		errorLoadingData(data);
	}
	else {
		var html="";
		$('#appointment_table').show();
		$.each(data, function(index,item){
			html+="<tr><td>"+item.date+"</td><td>"+item.time+"</td><td>"+item.description+"</td></tr>";
		});
		$('.table_rows').html(html);
		$('#error_table').hide();
	}
}

/* function to display if error and no data in search event*/
function errorLoadingData(data){
	var no_data='No data available';
	$('#appointment_table').hide();
	$('#error_table').show();
	$('#error_table').html(no_data);
}