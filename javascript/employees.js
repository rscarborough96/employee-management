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
	document.getElementById("editID").value = id;
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

	makeRequest("/employees", "DELETE", checkDeleteOk, data);
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
	var prefix = "";
	if (method == "POST") {
		prefix = "add";
	} else {
		prefix = "edit";
		var idInput = document.getElementById("editID");
		data[idInput.name] = idInput.value;
	}

	var nameInput = document.getElementById(prefix + "Name");
	var titleInput = document.getElementById(prefix + "Title");
	var hiredInput = document.getElementById(prefix + "Hired");
	data[nameInput.name] = nameInput.value;
	data[titleInput.name] = titleInput.value;
	data[hiredInput.name] = hiredInput.value;

	return data;
}

function submitAddOrEdit(e, method){
	e.preventDefault();
	var data = getModalData(method);
	makeRequest("/employees", method.toUpperCase(), handleAddOrEdit, data);
}

function handleAddOrEdit(json, method) {
	var responseData = JSON.parse(json);
	if (responseData["success"] == "true") {
		var data = getModalData(method);
		var message = "";
		if (method == "POST") {
			message = "Added";
			data["id"] = responseData["id"];
			var newCardColumn = createCardColumn(data);
			insertCardColumn(newCardColumn);
		} else {
			message = "Updated";
			var card = document.getElementById("toBeEdited");
			card.querySelector(".card-header").innerHTML = data["name"];
			card.querySelector(".title").innerHTML = "Title: <strong>" + data["title"] + "</strong>";
			card.querySelector(".date-hired").innerHTML = "Hired Date: <strong>" + data["hired"] + "</strong>";

			var employeeData = getEmployeeData(card);
			findCardInput(employeeData, "name").value = data["name"];
			findCardInput(employeeData, "title").value = data["title"];
			findCardInput(employeeData, "hired").value = data["hired"];

			card.removeAttribute("id");
		}

		removeAlert();
		myAlert = createAlert("Employee " + message,"success");
		document.getElementById("alertBox").appendChild(myAlert);
	} else {
		alert("Something went wrong");
	}
	Array.from(document.getElementsByClassName("close-modal")).forEach(element => element.click());
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
        '	<p class="date-hired">Date Hired: <strong>' + new Date(data["hired"]).toLocaleDateString("en-US") + '</strong></p>' +
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

function insertCardColumn(column) {
	document.getElementById("mainRow").firstElementChild.after(column);
}

function handleGetEmployees(json) {
	if (json != null){
		var responseData = JSON.parse(json);

		// Sort by name in REVERSE alphabetical order.
		// This is because the first column added will end up at the bottom of the page.
		responseData = responseData.sort((a, b) => a["name"] > b["name"] ? -1 : 1);
		console.log(responseData);
		responseData.forEach(employee => insertCardColumn(createCardColumn(employee)));
	} else {
		alert("Something went wrong");
	}
}
