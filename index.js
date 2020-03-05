function createEmployeeRecord(employee) {
    const [firstName, familyName, title, payPerHour] = employee
    const record = {
        firstName : firstName,
        familyName : familyName,
        title : title,
        payPerHour : payPerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
    return record
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeInEvent = {
        type : 'TimeIn',
        hour : parseInt(hour, 10),
        date : date
    }
    record.timeInEvents.push(timeInEvent)
    return record
}

function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeOutEvent = {
        type : 'TimeOut',
        hour : parseInt(hour, 10),
        date : date
    }
    record.timeOutEvents.push(timeOutEvent)
    return record
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find( record => record.date === date)
    const timeOut = record.timeOutEvents.find( record => record.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    const hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour
}

function allWagesFor(record) {
    console.log(record.timeInEvents)
    console.log(record.timeOutEvents)
    return record.timeInEvents.reduce(wagesEarnedOnDate)
}