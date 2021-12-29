function searchPage() {
	var boxes = document.getElementsByClassName("news_name");
	var all_boxes = document.getElementsByClassName("news_box");
	var input = document.getElementById("search").value;
	input = input.toLowerCase();
	for(i = 0; i < boxes.length; i++) {
		if (!boxes[i].innerHTML.toLowerCase().includes(input)) {
			all_boxes[i].style.display = "none";
		}else{
			all_boxes[i].style.display = "block";
		}
	}
};


function edit() {
	var searchBar = document.getElementById("search");
	searchBar.style.border = "medium solid #b56357";
};

// Filter Buttons 
var names = document.getElementsByClassName('category');
var boxes = document.getElementsByClassName('news_box');


function filter(category) {
	for (var i = 0; i < names.length; i++) {
		if(names[i].innerHTML == category.innerHTML) {
			boxes[i].style.display = "block";
		}else{
			boxes[i].style.display = "none";
		}
	}
}

function showAll() {
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].style.display = "block";
	}
}

// Date Filter
function newFilter() {
	var dates = document.getElementsByClassName('news_box');
	var days_list = [];
	let a_list = [];
	var today = new Date();
	for (var i = 0; i < dates.length; i++) {
		release_dates = dates[i].getAttribute('data-value');
		a_list.push(new Date(release_dates));
	}
	console.log(a_list);
	for (var i = 0; i < a_list.length; i++) {
		var difference = Math.abs(today - a_list[i]);
		days = difference/(1000 * 3600 * 24);
		days_list.push(days);
	}
	let sorted_days_list = days_list.sort((a, b) => a + b);
	let sorted_dates_list = a_list.sort((a, b) => (a > b) - (a < b));
	var ordered_dates =  Object.assign.apply({}, sorted_dates_list.map( (v, i) => ( {[v]: sorted_days_list[i]} ) ) );
	console.log(ordered_dates);

	// Editing the format of the keys in the dictionary
	var new_key_list = [];
	Object.keys(ordered_dates).forEach(function(key)  {
		key2 = new Date(key).toISOString().slice(0, 10);
		key3 = new Date(key2)
		var y = key3.getFullYear();
		var m = key3.getMonth() + 1;
		var d = key3.getDate() + 1;
		var final_date = m + "/" + d + "/" + y + " " + "00:00";
		new_key_list.push(final_date);
    });
    var adjusted_dates =  Object.assign.apply({}, new_key_list.map( (v, i) => ( {[v]: sorted_days_list[i]} ) ) );
    console.log(adjusted_dates);
	// How do I reorder the dates divs based on the order of dates in the ordered_dates list ?
	Object.keys(adjusted_dates).forEach(function(key)  {
		dates.getAttribute(key).style.display = 'block';
		console.log("test");
	});
}
