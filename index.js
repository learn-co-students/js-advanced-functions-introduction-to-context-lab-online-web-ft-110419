// Your code here

function createEmployeeRecord(arr) {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arr) {
    return arr.map((arr2) => createEmployeeRecord(arr2))
}

function createTimeInEvent(emp, dateStm) {
    let [date, hour] = dateStm.split(" ")
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return emp
}

function createTimeOutEvent(emp, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return emp
}

let hoursWorkedOnDate = (emp, theDate) => {
    let clockIn = emp.timeInEvents.find((timeIn) => timeIn.date === theDate)
    let clockOut = emp.timeOutEvents.find(timeOut => timeOut.date === theDate)
    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = (emp, dateIn) => {
    let wage = hoursWorkedOnDate(emp, dateIn) * emp.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(emp) {
    let allDates = emp.timeInEvents.map(pay => pay.date)
    let payCheck = allDates.reduce((check, day) => check + wagesEarnedOnDate(emp, day), 0)
    return payCheck
}

function findEmployeeByFirstName(emp, firstNames) {
    return emp.find(info => info.firstName === firstNames)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((check, rec) => check + allWagesFor(rec), 0)
}