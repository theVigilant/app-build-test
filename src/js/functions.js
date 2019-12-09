"use strict";

const renderTasks = () => {

	$("#wrap").html("");

	let data = dataClosure();
	data.tasks.forEach((t) => {
		console.log(t);
		console.log("params");
		// title, taskBody, statusNumber, priorityNumber, taskId
		let {title: p1, taskBody: p2, status: p3, priority: p4, taskId: p5} = t;
		let task = new Task(p1, p2, p3, p4, p5);
		renderTask(task);
	});

	let bottomCtrlWrap = $(".controls-bottom-wrap").remove();

	let createNewBtn = createElement("<div></div>", "Add new task", "controls addnew", null, {"click": saveAndModify}, null);

	$(bottomCtrlWrap).append(createNewBtn);

	$(createElement("<div></div>", null, "controls-bottom-wrap", null, null, $("body"))).append(createNewBtn);


};


const lsControl = {
		getStore: () => JSON.parse(localStorage.getItem("storage")),
		setStore: (info) => {
			localStorage.setItem("storage", JSON.stringify(info));
		}
	}
;


let storageMethods = {
	deleteItem: function (id) {
		let indexForDeletion = this.tasks.findIndex(function (element) {
			return element.taskId === id;
		});
		this.tasks.splice(indexForDeletion, 1);
	},
	modifyItem: function (id, valuesObject) {
		let foundTask = this.tasks.find(function (element) {
			return element.taskId.toString() === id.toString();
		});
		Object.assign(foundTask, valuesObject);
		lsControl.setStore(dataClosure())
	}
};


const dataClosure = (() => {
	let data = Object.create(storageMethods);
	return (dataObject) => {
		if (dataObject) {
			Object.assign(data, dataObject);
		}

		return data;
	}
})();


//page element rendering, no time to make it prettier
const createUpperPart = (task) => {
	let currentTask = createElement("<div></div>", null, "task", null, null, "#wrap");

	createElement("<div></div>", null, "remove", {"data-taskId": task.taskId}, {"click": removeTask}, currentTask).html("&times;");


	createElement("<input>", null, "task-header edit-field disabled", {
		type: "text",
		id: `th-${task.taskId}`,
		placeholder: (task.title || "change title"),
		value: (task.title || "change title"),
		"data-edit-header": task.taskId,
	}, {"blur": commitFieldChanges, "keypress": keyCommit, "click": editField}, currentTask);

	createElement("<input>", null, "task-body edit-field disabled", {
		type: "text",
		id: `tb-${task.taskId}`,
		placeholder: (task.taskBody || "change body"),
		value: (task.taskBody || "change body"),
		"data-edit-body": task.taskId,
	}, {"blur": commitFieldChanges, "keypress": keyCommit, "click": editField}, currentTask);

	return currentTask;
};

const createLowerPart = (task, taskInfo) => {

	console.log("checking id");
	console.log(task.id);

	let status = $(createElement("<div></div>", null, "status-wrap", null, null, null));

	$(status).html("");

	createElement("<div></div>", task.status, "status open", null, null, status);

	let changeStatus = createElement("<select></select>", null, "status-change", {id: `s-${task.taskId}`}, null, status);

	taskInfo.status.forEach(function (status, iteration) {
		createElement("<option></option>", status, null, {value: iteration}, null, changeStatus)
	});
	createElement("<div></div>", null, "break", null, null, status);

	createElement("<div></div>", `Priority: ${task.priority}`, "priority", null, null, status);

	let changePriority = createElement("<select></select>", null, "priority-change", {id: `p-${task.taskId}`}, null, status);

	taskInfo.priorities.forEach(function (priority, iteration) {
		createElement("<option></option>", priority, null, {value: iteration}, null, changePriority)
	});

	createElement("<div></div>", "SAVE", "controls save", {"data-item-id": task.taskId}, {"click": saveAndModify}, status);

	return status;
};

//as the saying goes.. same song, different verse
const createElement = (tag, elementText, elementClass, propertiesObj, handlerObj, parent) => {
	let props = propertiesObj || {};
	props.text = elementText;
	props.class = elementClass;

	let element = $(tag, props);

	for (let event in handlerObj) {
		if (handlerObj.hasOwnProperty(event)) {
			$(element)[event](handlerObj[event])
		}
	}
	if (parent) {
		$(parent).append(element);
	}
	return element;
};

const updateOrModifyTask = (context, modify) => {

	let id = context.dataset.itemId;
	console.log(id);

	let fields = {
		title: $(`#th-${id}`).val(),
		taskBody: $(`#tb-${id}`).val(),
		status: parseInt($(`#s-${id}`).val()),
		priority: parseInt($(`#p-${id}`).val()),
	};

	console.log(fields);


	if (modify) {
		console.log(context);
		dataClosure().modifyItem(id, fields);
		renderTasks();
	} else {
		let newTask = new Task("Enter task name", "Enter task body", 0, 0, dataClosure().tasks.length + 1);
		dataClosure().tasks.push(newTask);
		lsControl.setStore(dataClosure());
		renderTasks()
	}
};

