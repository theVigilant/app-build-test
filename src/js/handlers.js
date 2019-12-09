"use strict";


function saveAndModify() {
	console.log(this.dataset);
	if (this.parentNode.classList.contains("controls-bottom-wrap")) {
		updateOrModifyTask(this, false);
	} else {
		updateOrModifyTask(this, true)
	}
}

function removeTask() {
	let id = this.dataset.taskid;
	dataClosure().deleteItem(id);
	lsControl.setStore(dataClosure());
	renderTasks();
	// console.log("DELeTE");
}


//this is ugly, and I can't really DRY it
function editField() {
	// $(this).attr("disabled", "disabled")
	$(this).removeClass("disabled");
}

function commitFieldChanges() {
	$(this).addClass("disabled")
}

function keyCommit(key) {
	if (key.keyCode === 13) {
		commitFieldChanges.call(this);
		$(this).blur();
	}
}