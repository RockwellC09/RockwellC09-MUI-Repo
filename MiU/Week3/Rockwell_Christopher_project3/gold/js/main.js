//Christopher Rockwell
//Project 3
//MiU 1211


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	

$('#displayPage').on('pageinit', function(){
	//code needed for home page goes here
	getData();
});	
		
$('#additems').on('pageinit', function(){
		var myForm = $('#add');
		    myForm.validate({
		    errorPlacement: function(error, element) {
				if (element.attr("name") === "time") {
				error.insertAfter($(element).parent());
			} else {
				error.insertAfter(element);
			}/* $('body').scrollTop(0); */
		},
		messages: {
			time: {
				required: "Please select a time frame. <br>",
				},
			itemName: {
				required: "Please enter a item name. <br>",
				},
			totalCost: {
				required: "Please enter the total cost. <br>",
				},
			amount: {
				required: "Please enter the amount saved. <br>",
				}	
		},
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
		
	});
/*
	$("#reset").click(function() {
		$("#amount").val('5');
		alert("Handler for .click() called.");
	});
*/
	$("#display").click(function() {
		if (localStorage.length === 0){
	            alert("There is no data in local storage so default data was added.");
	            autofillData();
	        }
		$.mobile.changePage( '#displayPage' );
	});
	
	$("#reset").click(function() {
		window.location.reload();
	});

	
	$("#clearData").click(function() {
		if(localStorage.length === 0){
            alert("There is no data to clear.");
        } else {
            var answer = confirm("Are you sure you want to delete all data?");
            if (answer){
                localStorage.clear();
                alert("All items deleted.");
                window.location.reload();
                return false;
            } else {
                alert("Your items were not deleted.");
            }
        }
	});
	var now = new Date();
	if (now.getDate() < 10) {
		var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + 0 + now.getDate();
	} else {
		var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	}
    $('#pledge').val(today);
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 for(var n in json) {
            var id = Math.floor((Math.random()*10000000)+1);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
};

var getData = function(){

		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		 $("#dis").append($(makeDiv));
		for(var i=0,j=localStorage.length;i<j;i++){
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse()
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            if (i %2 != 0) {
	            makeSubList.setAttribute("id", "sub");
            } else {
	            makeSubList.setAttribute("id", "sub2");
           }
            makeLi.appendChild(makeSubList);
            getImage(obj.priority[1], makeSubList);
            getProgress(obj, makeSubList);
             for (var x in obj){
                var makeSubListItem =document.createElement('li');
                makeSubList.appendChild(makeSubListItem);
                makeSubListItem.style.color = "white";
                optSubText = "<strong> " + obj[x][0] +"</strong> "+ "<p style=\"display:inline;\">" + obj[x][1] + "</p>";
                makeSubListItem.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
                }
            makeItemLinks(localStorage.key(i), linksLi); //creates our edit and delete button.links for each item in local storage
            }
            $.mobile.changePage( '#displayPage' );
};

var storeData = function(data){
	
     var id =  Math.floor((Math.random()*10000000)+1);
	
	var val =[];
	$.each(data, function(i, field){
		val.push(field.value);
  });

  var item = {};
            item.name = ["Item Name:", val[0]];
            item.brand = ["Item Brand:", val[1]];
            item.quantity = ["Quantity:", val[2]];
            item.cost = ["Total Cost:", "$" + val[3]];
            item.date = ["Pledge Date:", val[4]];
            item.priority = ["Priority:", val[5]];
            item.timeFrame = ["Time Frame:", val[6]];
            item.amountSaved = ["Amount Saved:", "$" + val[7]];
            item.motivation = ["Motivation:", val[8]];
            item.space = ["<br>", ""];

            localStorage.setItem(id, JSON.stringify(item));
            
            alert("Data Saved!");
            $('body').scrollTop(0);
            
}; 



var	deleteItem = function (key){
	var ask = confirm("Are you sure you want to delete this item?");
        if (ask){
            localStorage.removeItem(key);
            alert("Item deleted");
            window.location.reload();
        } else {
            alert("The item was not deleted");
        }		
};

/*
var editItem = function (){
	//Grab the data from the item from local storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        var myForm = $('#add');
        var data = myForm.serializeArray();
        
        select(item);
        
        var cost = item.cost[1].replace(/\$/g,'');
        var cost2 = item.amountSaved[1].replace(/\$/g,'');
        $('#priority2').removeAttr('checked');
        if (item.priority[1] == "Low!") {
                $('#priority1').prop('checked', true);
            } else if (item.priority[1] == "Medium!!") {
                $('#priority2').prop('checked', true);
            } else if (item.priority[1] == "High!!!") {
                $('#priority3').prop('checked', true);
            }
        //show form
        $.mobile.changePage( '#additems' );
        
        $('#itemName').val(item.name[1]);
        $('#itemBrand').val(item.brand[1]);
        $('#quantity').val(item.quantity[1]); 
        $('#totalCost').val(cost);
        $('#pledge').val(item.date[1]);
        $('#priority2').removeAttr('checked');
        $('#amount').val(cost2);
        $('#motivation').val(item.motivation[1]);
        
        var key = this.key;
        $('#submit').setAttribute("id", "sub")
        
        $("#sub").click( key ,function() {
        storeData(data, key);
	});
   
};
*/
					
var clearLocal = function(){
	localStorage.clear();
	alert("Data Cleared");
};

function select(item) {
	switch(item.timeFrame[1])
        {
        case "0-6 months":
	        	$('#sel1').attr('selected', 'selected');
	     		break;
	   case "6 months to a year":
	     		$('#sel2').attr('selected', 'selected');
	     		break;
	   case "Between 1-3 years":
			$('#sel3').attr('selected', 'selected');
			break;
	   default:
	   		$('#sel4').attr('selected', 'selected');
	   	}
}

function getImage(priorityVal, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        newImg.setAttribute("id", "ex");
         newImg.setAttribute("align", "right");
        var setSrc = newImg.setAttribute("src", "images/" + priorityVal + ".png");
        imageLi.appendChild(newImg);
    }

function getProgress(obj, makeSubList) {
        var getVal = obj.amountSaved[1].replace(/\$/g,'');
        var getMax = obj.cost[1].replace(/\$/g,'');
        var percent = (getVal * 100) / getMax;
        var percentRound = Math.round(percent * 10) / 10;
        var prog = document.createElement('li');
        prog.style.color = "white";
        prog.innerHTML = "<strong>Progress: </strong><progress max="+ getMax +" value="+ getVal +"></progress> " + percentRound + "%"
        makeSubList.appendChild(prog);
        
    }
    

//Make item links
//create edit and delete links for each item in storage
function makeItemLinks(key, linksLi) {
        var deleteLink = document.createElement('input');
        deleteLink.setAttribute("type", "button");
        deleteLink.key = key;
        deleteLink.setAttribute("id", "del");
        deleteLink.setAttribute("value", "Delete");
        deleteLink.setAttribute("onclick", "deleteItem(key);");
        deleteLink.setAttribute("data-theme", "a");
        deleteLink.setAttribute("style", "width:200px; margin:-40px 0px 15px 20px; display:block;")
        deleteLink.setAttribute("class", "ui-btn-up-a ui-btn-inner ui-btn-corner-all")
        linksLi.appendChild(deleteLink);
        
        /*
var editLink = document.createElement('input');
        editLink.setAttribute("type", "button");
        editLink.key = key;
        editLink.setAttribute("id", "edit");
        editLink.setAttribute("value", "Edit");
        editLink.setAttribute("onclick", "editItem(key);");
        editLink.setAttribute("data-theme", "a");
        editLink.setAttribute("style", "width:200px; margin:10px 0px 15px 20px;")
        editLink.setAttribute("class", "ui-btn-up-a ui-btn-inner ui-btn-corner-all")
        linksLi.appendChild(editLink);
        editLink.addEventListener("click", editItem);
*/
        
    }

