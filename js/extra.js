var datefield=document.createElement("input");
    
datefield.setAttribute("type", "date");
if (datefield.type!="date"){ //if browser doesn't support input type="date", load files for jQuery UI Date Picker
        document.write('<link href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
        document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"><\/script>\n')
        document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"><\/script>\n')
    }
    
if (datefield.type!="date"){ //if browser doesn't support input type="date", initialize date picker widget:
    jQuery(function(){ //on document.ready
	var pickerOpts = {
		dateFormat:"yy-mm-dd"
    };
        $('#pledge').datepicker(pickerOpts);
    })
}

//update the input field that shows the slider value with the current slider value
function updateTextInput(val) {
			document.getElementById('textInput').value=val; 
			}
                        
$("#aboutButton").click(function () {
			  $("#about").slideToggle("slow");
			});