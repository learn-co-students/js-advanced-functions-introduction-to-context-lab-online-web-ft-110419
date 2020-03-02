// Your code here

let createEmployeeRecord = function(row){
    return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
    }
};

let createEmployeeRecords = function(employeeRow){
    return employeeRow.map(function(row){
        return createEmployeeRecord(row)
    });
};

let createTimeInEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, workDate){
    let inTime = employee.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let outTime = employee.timeOutEvents.find(function(e){
        return e.date === workDate
    })
    return (outTime.hour - inTime.hour) / 100
} 

let wagesEarnedOnDate = function(employee, workDate){
    let gross = hoursWorkedOnDate(employee, workDate) * employee.payPerHour
    return parseFloat(gross)
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payDue = eligibleDates.reduce(function(x, day){
        return x + wagesEarnedOnDate(employee, day);
    }, 0)
    return payDue;
}

let findEmployeeByFirstName = function(arr, name){
    return arr.find(e => e.firstName === name);
}

let calculatePayroll = function(employeeArr){
    return employeeArr.reduce(function(x, employee){
        return x + allWagesFor(employee)
    }, 0)
}


// let calculatePayRoll = 