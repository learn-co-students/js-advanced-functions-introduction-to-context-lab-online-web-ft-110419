function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrayOfArrays) {
  let employeeRecords = [];
  for (const array of arrayOfArrays) {
    employeeRecords.push(createEmployeeRecord(array));
  }
  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(function(timeIn) {
    return timeIn.date === date;
  });
  const timeOutEvent = employeeRecord.timeOutEvents.find(function(timeOut) {
    return timeOut.date === date;
  });
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map(function(timeIn) {
    return timeIn.date;
  });
  return dates.reduce(function(memo, date) {
    return memo + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(memo, employeeRecord) {
    return memo + allWagesFor(employeeRecord);
  }, 0);
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(function(employeeRecord) {
    return employeeRecord.firstName === firstName;
  });
}
