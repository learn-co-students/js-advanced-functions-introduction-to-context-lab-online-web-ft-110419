function createEmployeeRecord(array) {
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    } 
    return obj
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, datestamp) {
    let event = {
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, datestamp) {
    let event = {
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    record.timeOutEvents.push(event)
    return record
}

function hoursWorkedOnDate(record, date) {
    let start = record.timeInEvents.find( function(element) {
         return element.date === date
    })
    let end = record.timeOutEvents.find( function(element) {
        return element.date === date
    })
    let hours = (end.hour - start.hour) / 100
    return hours
}

function wagesEarnedOnDate(record, date) {
    let pay = hoursWorkedOnDate(record, date) * record.payPerHour
    return pay
}




// let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
// createTimeInEvent(testEmployee, "2014-02-28 1400")
// createTimeOutEvent(testEmployee, "2014-02-28 1700")
// createTimeInEvent(testEmployee, "2014-01-28 1000")
// createTimeOutEvent(testEmployee, "2014-01-28 1600")
// hoursWorkedOnDate(testEmployee, "2014-02-28")



