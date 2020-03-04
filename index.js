// Your code here
function createEmployeeRecord(employee) {
  const [firstName, familyName, title, payPerHour] = employee;
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(sourceArray) {
  return sourceArray.map(employee => { return createEmployeeRecord(employee) });
}

function createTimeInEvent(employeeRecord, dateTime) {
  const record = Object.assign({}, employeeRecord);

  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0]
  });
  return record;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const record = Object.assign({}, employeeRecord);

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0]
  });
  return record;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEventOnDate = employeeRecord.timeInEvents.find(e => e.date === date);
  const timeOutEventOnDate = employeeRecord.timeOutEvents.find(e => e.date === date);
  return (timeOutEventOnDate.hour - timeInEventOnDate.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const wagesArray = employeeRecord.timeInEvents.map(e => {
    return wagesEarnedOnDate(employeeRecord, e.date);
  })

  return wagesArray.reduce((acc, curr) => acc + curr);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => e.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  const allEmployeeWages = employeeRecords.map(e => {
    return allWagesFor(e);
  })

  return allEmployeeWages.reduce((acc, curr) => acc + curr);
}