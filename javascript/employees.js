document.addEventListener('DOMContentLoaded', function() {
	    makeRequest("/employees/data", "GET", handleGetEmployees);
});

function getEmployeeData(el) {
	// Find the card containing the employee and get the data from hidden input fields
	return Array.from(el.closest(".card").querySelectorAll("input"));
}

function findCardInput(employeeData, key) {
	return employeeData.filter(function(x) { return x.name == key; })[0];
}

function getEditData(el) {
	var employeeData = getEmployeeData(el);
	el.closest(".card").id = "toBeEdited";

	var name = findCardInput(employeeData, "name").value;
	var title = findCardInput(employeeData, "title").value;
	var hired = findCardInput(employeeData, "hired").value;
	var id = findCardInput(employeeData, "id").value;

	document.getElementById("editName").value = name;
	document.getElementById("editTitle").value = title;
	document.getElementById("editHired").value = hired;
	document.getElementById("editId").value = id;
}

function submitDelete(el){
	if(!confirm("Delete this employee?")){
		return;
	}

	el.closest(".card").id = "toBeDeleted";
	var employeeData = getEmployeeData(el);
	var id = findCardInput(employeeData, "id").value;
	var data = {};
	data["id"] = id;

	makeRequest("/employees/delete", "POST", checkDeleteOk, data);
}

function checkDeleteOk(response) {
	if (response == "true") {
		removeAlert();
		myAlert = createAlert("Employee Deleted","success");
		document.getElementById("alertBox").appendChild(myAlert);
		document.getElementById("toBeDeleted").parentElement.remove();
	} else {
		alert("Something went wrong");
	}
}

function getModalData(method) {
	var data = {};
	if (method == "edit") {
		var idInput = document.getElementById("editId");
		data[idInput.name] = idInput.value;
	}

	var nameInput = document.getElementById(method + "Name");
	var titleInput = document.getElementById(method + "Title");
	var hiredInput = document.getElementById(method + "Hired");
	data[nameInput.name] = nameInput.value;
	data[titleInput.name] = titleInput.value;
	data[hiredInput.name] = hiredInput.value;

	return data;
}

function submitAddOrEdit(e, method){
	e.preventDefault();
	var data = getModalData(method);
	if (method == "add") {
		makeRequest("/employees/add", "POST", handleAdd, data);
	} else {
		makeRequest("employees/update", "POST", handleEdit, data);
	}
}

function handleAdd(json) {
	if (json != "") {
		var responseData = JSON.parse(json);
		var data = getModalData("add");
		data["id"] = responseData["id"];
		var newCardColumn = createCardColumn(data);
		insertCardColumn(newCardColumn);

		removeAlert();
		myAlert = createAlert("Employee Added", "success");
		document.getElementById("alertBox").appendChild(myAlert);
	} else {
		alert("Something went wrong");
	}
	closeModals();
}

function handleEdit(response) {
	if (response == "true") {
		var data = getModalData("edit");
		var card = document.getElementById("toBeEdited");
		var employeeData = getEmployeeData(card);

		card.querySelector(".card-header").innerHTML = data["name"];
		card.querySelector(".title").innerHTML = "Title: <strong>" + data["title"] + "</strong>";
		card.querySelector(".date-hired").innerHTML = "Date Hired: <strong>" + formatDate(data["hired"]) + "</strong>";
		findCardInput(employeeData, "name").value = data["name"];
		findCardInput(employeeData, "title").value = data["title"];
		findCardInput(employeeData, "hired").value = data["hired"];
		card.removeAttribute("id");

		removeAlert();
		myAlert = createAlert("Employee Updated", "success");
		document.getElementById("alertBox").appendChild(myAlert);
	} else {
		alert("Something went wrong");
	}
	closeModals();
}

function createCardColumn(data) {
	var column = document.createElement("div");
	column.classList.add("col-xs-12", "col-md-4");


	column.innerHTML = '<div class="card my-3 mx-3 shadow text-center">' +
        '	<h5 class="card-header bg-primary text-white text-center">' + data["name"] + '</h5>' +
        '	<div class="d-flex justify-content-end">' +
        '	        <button class="btn btn-outline-danger btn-close m-1" title="Delete Employee" onclick="submitDelete(this)"></button>' +
        '	</div>' +
        '	<p class="title">Title: <strong>' + data["title"] + '</strong></p>' +
        '	<p class="date-hired">Date Hired: <strong>' + formatDate(data["hired"]) + '</strong></p>' +
        '	<input type="hidden" name="id" value="' + data["id"] + '">' +
        '	<input type="hidden" name="name" value="' + data["name"] + '">' +
        '	<input type="hidden" name="title" value="' + data["title"] + '">' +
        '	<input type="hidden" name="hired" value="' + data["hired"] + '">' +
        '	<div class="card-footer">' +
        '	        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="getEditData(this);">Edit Employee</button>' +
        '	</div>' +
	'</div>';
	return column;
}

function formatDate(date) {
	// Javascript has a crazy way of parsing date strings and 
	// ends up returning a date string that is 1 day behind.
	// E.g. "2022-04-29" becomes "2022-04-28"
	// Below, split() is used to coerce the Date() parser into giving us what we expect

	return new Date(date.split("-")).toLocaleDateString("en-US")
}

function closeModals() {
	Array.from(document.getElementsByClassName("close-modal")).forEach(element => element.click());
}

function insertCardColumn(column) {
	document.getElementById("mainRow").firstElementChild.after(column);
}

function handleGetEmployees(json) {
	if (json != ""){
		if (json == "empty") {
			myAlert = createAlert("No employees. Try clicking the '+' to add some.","warning");
			document.getElementById("alertBox").appendChild(myAlert);
			return;
		}
		var responseData = JSON.parse(json);

		// Sort by name in REVERSE alphabetical order.
		// This is because the first column added will end up at the bottom of the page.
		responseData = responseData.sort((a, b) => a["name"] > b["name"] ? -1 : 1);
		responseData.forEach(employee => insertCardColumn(createCardColumn(employee)));
	} else {
		alert("Something went wrong");
	}
}
