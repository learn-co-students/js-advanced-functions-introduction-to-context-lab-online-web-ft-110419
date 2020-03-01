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

function allWagesFor(record) {
    let dates = record.timeInEvents.map(function(event) {
        return event.date
    })

    let eachPay = dates.map(date => {return wagesEarnedOnDate(record, date)})

    return eachPay.reduce(function(memo, i) { return memo + i })
}

function calculatePayroll(records) {
    let paySum = records.map(record => {return allWagesFor(record)}).reduce(function(memo, i) { return memo + i })
    return paySum
}

function findEmployeeByFirstName(records, name) {
    return records.find( function(record) {
        return record.firstName === name
   })
}
