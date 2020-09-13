//createEmployeeRecord
//Argument(s)
//A 4 - element Array of a String, String, String, and Number corresponding to a
//first name, family name, title, and pay rate per hour
function createEmployeeRecord(record){
    /* Behavior
    Loads Array elements into corresponding Object properties.
    Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.*/
    let clockIn = [];
    let clockOut = [];
    let details = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: clockIn,
        timeOutEvents: clockOut};
        //Returns - Object with keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
    return details;
}
//createEmployeeRecords
//Argument(s) - Array of Arrays
function createEmployeeRecords(records){
    //createEmployeeRecord and accumulates it to a new Array
    const array  = records.map(createEmployeeRecord);
    //Behavior - Converts each nested Array into an employee record using
    //Returns - Array of Objects
    return array;
}

//createTimeInEvent
//Argument(s) - An employee record Object, A date stamp("YYYY-MM-DD HHMM")
function createTimeInEvent(record, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    record.timeInEvents.push({
        //Add an Object with keys to the timeInEvents Array on the record Object:
        //type: Set to "TimeIn"
        //hour: Derived from the argument
        //date: Derived from the argument
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    });
    //Returns -The employee record
    return record;
}
//createTimeOutEvent
//Argument(s) - An employee record Object, A date stamp("YYYY-MM-DD HHMM")
function createTimeOutEvent(record, dateStamp){
    let [date, hour] =dateStamp.split(' ')
    record.timeOutEvents.push({
        //Add an Object with keys to the timeOutEvents Array on the record Object:
        //type: Set to "TimeOut"
        //hour: Derived from the argument
        //date: Derived from the argument
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    });
    //Returns - The employee record
    return record;
}
//hoursWorkedOnDate
//Argument(s) -An employee record Object, A date of the form "YYYY-MM-DD"
function hoursWorkedOnDate(record, date){
//Given a date, find the number of hours elapsed between that date 's timeInEvent and timeOutEvent
    let hours = 0;
    let clockIn = record.timeInEvents.find(function(key){
        return key.date === date;
    });
    let clockOut = record.timeOutEvents.find(function(key){
        return key.date === date;
    });
    hours = (clockOut.hour - clockIn.hour) / 100;
//Returns - Hours worked, an Integer
    return hours;
}
//wagesEarnedOnDate
//Argument(s) - An employee record Object, A date of the form "YYYY-MM-DD"
function wagesEarnedOnDate(record, date){
    //Using hoursWorkedOnDate, multiply the hours by the record 's payRate to determine
    //amount owed. Amount should be returned as a number.
    let wages = hoursWorkedOnDate(record, date) * record.payPerHour;
    //Returns - Pay owed
    return wages;
}
//allWagesFor
//Argument(s) - An employee record Object
function allWagesFor(record){
    //Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee
    //in the record used as context.Amount should be returned as a number.
    //HINT: You will need to find the available dates somehow...
    let workedDates = record.timeInEvents.map(function(key){
        return key.date;
    });
    let totalWages = workedDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(record, date);
    }, 0);
    //Returns - Pay owed for all dates
    return totalWages;
}
//findEmployeeByFirstName
//Argument(s) - srcArray: Array of employee records,
//              firstName: String representing a first name held in an employee record
function findEmployeeByFirstName(records, firstName){
//Test the firstName field for a match with the firstName argument
    return records.find(function(record){
        return record.firstName == firstName;
    }, 0);
//Returns - Matching record or undefined
}
//calculatePayroll
//Argument(s) -Array of employee records
function calculatePayroll(records){
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee
//in the record used as context.Amount should be returned as a number.

    return records.reduce(function(memo, record){
        return memo + allWagesFor(record);
    }, 0);

//Returns -Sum of pay owed to all employees for all dates, as a number
};