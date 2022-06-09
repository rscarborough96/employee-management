function makeRequest(url, method, responseHandler, data) {
	method = method.toUpperCase();
	httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert("Cannot create an XMLHTTP instance");
		return false;
	}
	httpRequest.onreadystatechange = function() {
		try {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					responseHandler(httpRequest.responseText);
				} else {
					alert('There was a problem with the request.');
				}
			}
		} catch(e) {
			alert('Caught Exception: ' + e.description);
		}
	}

	switch(method) {
		case "GET":
			httpRequest.open("GET", url);
			httpRequest.send();
			break;
		case "POST":
			httpRequest.open("POST", url);
			httpRequest.setRequestHeader("Content-Type", "application/json");
			httpRequest.send(JSON.stringify(data));
			break;
		case "PUT":
			httpRequest.open("PUT", url);
			httpRequest.setRequestHeader("Content-Type", "application/json");
			httpRequest.send(JSON.stringify(data));
			break;
		case "DELETE":
			httpRequest.open("DELETE", url);
			httpRequest.setRequestHeader("Content-Type", "application/json");
			httpRequest.send(JSON.stringify(data));
			break;
		default:
			return false;
	}
}
