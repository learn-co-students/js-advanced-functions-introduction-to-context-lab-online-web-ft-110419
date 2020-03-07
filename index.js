function createEmployeeRecord(array) {
    let object = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return object
}

function createEmployeeRecords(array) {
    return array.map(function(e){return createEmployeeRecord(e)})
}

function createTimeInEvent(record, dateTime) {
    record.timeInEvents.push({
        type: "TimeIn",
        date: dateTime.split(" ")[0], 
        hour: parseInt(dateTime.split(" ")[1])
    })
    return record
}

function createTimeOutEvent(record, dateTime) {
    record.timeOutEvents.push({
        type: "TimeOut",
        date: dateTime.split(" ")[0],
        hour: parseInt(dateTime.split(" ")[1])
    })
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(e => e.date === date);
    let timeOut = record.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour
}

function allWagesFor(record) {
    let workDays = record.timeInEvents.map(function(e){return e.date});
    let dailyWages = workDays.map(function(e){return wagesEarnedOnDate(record, e)});
    return dailyWages.reduce(function(p, e){return p + e})
}

function calculatePayroll(records) {
    let wages = records.map(function(e){return allWagesFor(e)});
    return wages.reduce(function(p, e){return p + e})
}

function findEmployeeByFirstName(records, firstName) {
    return records.find(record => record.firstName === firstName)
}
