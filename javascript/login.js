function failedLogin() {
	var main = document.getElementById("main");

	if (!document.getElementById("closeAlert")) {
		main.appendChild(createAlert("<strong>Error:</strong> That username/password combination was not found","danger"));
	}
}

function submitLogin(e) {
	e.preventDefault();
	
	var usernameInput = document.getElementById("username");
	var passwordInput = document.getElementById("password");
	var data = {};
	data[usernameInput.name] = usernameInput.value;
	data[passwordInput.name] = passwordInput.value;

	makeRequest("/", "POST", checkResponseOk, data);
}

function checkResponseOk(response) {
	if (response == "true") {
		document.getElementById("form").submit();
	} else {
		failedLogin();
	}
}
