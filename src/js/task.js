"use strict";


function Task(title, taskBody, statusNumber, priorityNumber, taskId) {
	this.title = title;
	this.taskBody = taskBody;
	this.status = dataClosure().status[statusNumber] || dataClosure().status[0];
	this.priority = dataClosure().priorities[priorityNumber] || dataClosure().priorities[0];
	this.taskId = taskId;
}