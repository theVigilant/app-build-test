"use strict";


(function () {
	$.ajax("json/data.json", {
		"method": "GET",
		"dataType": "text",
		"contentType": "application/json"
	}).done(function (response) {
		let json = $.parseJSON(response);
		// $("body")[0].innerHTML = "";
		let currentStorage = dataClosure(json);

		if (!lsControl.getStore()) {
			lsControl.setStore(currentStorage);
			console.log("saving to storage");

		} else {
			dataClosure(lsControl.getStore());
			console.log("loading from storage");

		}

		renderTasks();

	});
})();

const renderTask = (task) => {
	let taskInfo = dataClosure();

	$(createUpperPart(task)).append(createLowerPart(task, taskInfo));


};



