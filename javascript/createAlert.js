function createAlert(message, type){
	var myAlert = document.createElement("div");
	var removeButton = '  <button id="closeAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
	myAlert.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' + message + removeButton +'</div>';
	return myAlert;
}

function removeAlert() {
	var closeAlertButton = document.getElementById("closeAlert");
	if (closeAlertButton) {
        	closeAlertButton.click();
	}
}
