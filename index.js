// Your code here

function createEmployeeRecord(employeeArray) {
    let newEmployee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return newEmployee;
}

function createEmployeeRecords(arrayOfEmployees) {
    return arrayOfEmployees.map(createEmployeeRecord);
}

function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let newTimeIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    record.timeInEvents.push(newTimeIn);
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let newTimeIn = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    record.timeOutEvents.push(newTimeIn);
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(time => time.date === date);
    const timeOut = record.timeOutEvents.find(time => time.date === date);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date);
    return hoursWorked * record.payPerHour;
}

function allWagesFor(record) {
    const datesWorked = record.timeOutEvents.map(event => event.date);
    const salaryforDates = datesWorked.map(date => wagesEarnedOnDate(record, date));
    return salaryforDates.reduce((memo, value) => value + memo);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee){
        return (employee.firstName === firstName)
    })
}

function calculatePayroll(employeeRecords) {
    const allSalaries = employeeRecords.map(allWagesFor);
    return allSalaries.reduce((memo, value) => value + memo);
}