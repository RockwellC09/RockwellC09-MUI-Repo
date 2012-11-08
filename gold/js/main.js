//Christopher Rockwell
//Project 3
//MiU 1211


$('#home').on('pageinit', function(){
	//code needed for home page goes here
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
		getData();
	});
	
	$("#clearData").click(function() {
		clearLocal();
		location.reload();
	});
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
                }
            }
            $.mobile.changePage( '#displayPage' );
};

var storeData = function(data){
	var id=Math.floor((Math.random()*10000000)+1);
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



var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	localStorage.clear();
	alert("Data Cleared");
};

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

