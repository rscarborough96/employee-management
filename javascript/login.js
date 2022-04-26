function failedLogin() {
	var main = document.getElementById("main");

	if (!main.querySelector(".alert")) {
		main.appendChild(createAlert("<strong>Error:</strong> That username/password combination was not found","danger"));
	}
}
