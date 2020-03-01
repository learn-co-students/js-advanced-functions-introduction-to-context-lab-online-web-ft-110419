function createEmployeeRecord(array){
	let employee = {}
	let attrs = ["firstName", "familyName", "title", "payPerHour"]
	const assign = ((element, index) => employee[element] = array[index])
	attrs.forEach(assign)
	employee.timeInEvents = []
	employee.timeOutEvents =  []
	return employee	
}// Your code here

function createEmployeeRecords(array) {
	let employees = []
	let attrs = ["firstName", "familyName", "title", "payPerHour"]
	for (let i = 0; i < array.length; i++) {
		if (typeof(array[i]) === "object") {
			let employee = {}
			let arr = array[i]
			attrs.forEach((element, index) => employee[element] = arr[index])
			employee.timeInEvents = []
			employee.timeOutEvents =  []
			employees.push(employee)
		}
	}
	return employees
}

function createTimeInEvent(employee, time) {
	function TimeIn(hour, date) {
		this.hour = hour
		this.date = date
	}
	let punchedIn = new TimeIn((Number(time.slice(time.length-4, time.length))), time.slice(0, time.length-5))
	punchedIn.type = "TimeIn"
	employee.timeInEvents.push(punchedIn)
	return employee
}


function createTimeOutEvent(employee, time) {
	let timeOut = {
		hour: Number(time.slice(time.length-4, time.length)),
		date: time.slice(0, time.length-5)
	}
	timeOut.type = "TimeOut"
	employee.timeOutEvents.push(timeOut)
	return employee
}

function hoursWorkedOnDate(employee, date) {
	let timesIn = employee.timeInEvents.filter(element => element.date === date)
	let timesOut = employee.timeOutEvents.filter(element => element.date === date)
	let timeWorked = timesIn.map((element, index) => (timesOut[index].hour - element.hour)/100)
	let sum = timeWorked.reduce((element, total=0) => element + total)
	return sum
}

function wagesEarnedOnDate(employee, date){
	let hoursWorked = hoursWorkedOnDate(employee, date)
	return hoursWorked*employee.payPerHour
}

function allWagesFor(employee){
	let earned = employee.timeOutEvents.map(element => wagesEarnedOnDate(employee, element.date))
	return earned.reduce((element, total=0) => element + total)
}

function calculatePayroll(employeeArray){
	let allWages = employeeArray.map(employee => allWagesFor(employee))
	return allWages.reduce((element, total=0) => element + total)
}

function findEmployeeByFirstName(employees, name){
	return employees.find(employee => employee.firstName === name)
}




