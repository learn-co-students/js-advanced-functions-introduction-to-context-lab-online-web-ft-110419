// Your code here
function createEmployeeRecord(employeeRecordArry) {
  employeeRecordArry.push(...[[], []]);
  let employeeObj = {};
  const recordKeys = [
    "firstName",
    "familyName",
    "title",
    "payPerHour",
    "timeInEvents",
    "timeOutEvents"
  ];
  employeeRecordArry.map((val, i, arr) => {
    recordKeys.map((key, index, arr2) => (employeeObj[arr2[i]] = arr[i]));
  });
  return employeeObj;
}

function createEmployeeRecords(twoRecords) {
  return twoRecords.map(employeeRecordArry =>
    createEmployeeRecord(employeeRecordArry)
  );
}

function createTimeInEvent(employeeRecord, time) {
  return employeeTimeStamp(time, "TimeIn", "timeInEvents", employeeRecord);
}

function createTimeOutEvent(employeeRecord, time) {
  return employeeTimeStamp(time, "TimeOut", "timeOutEvents", employeeRecord);
}

function employeeTimeStamp(time, timeType, timeEvent, employeeRecord) {
  employeeRecord[timeEvent].push({
    type: timeType,
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1], 10)
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(obj => obj.date == date).hour;
  const timeOut = employeeRecord.timeOutEvents.find(obj => obj.date == date)
    .hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hourlyRate = employeeRecord.payPerHour;
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hourlyRate * hoursWorked;
}

function allWagesFor(employeeRecord) {
  let timeInDates = employeeRecord.timeInEvents.map(obj => obj.date);
  //   let timeOutDates = employeeRecord.timeOutEvents.map(obj => obj.date);
  //   timeInDates.push(...timeOutDates);
  //   const uniqDates = timeInDates.filter((a, b) => timeInDates.indexOf(a) === b);

  const grandTotal = timeInDates.reduce((sum, date) => {
    return wagesEarnedOnDate(employeeRecord, date) + sum;
  }, 0);
  return grandTotal;
}

function calculatePayroll(employees) {
  debugger;
  return employees.reduce((sum, employee) => sum + allWagesFor(employee), 0);
}

function findEmployeeByFirstName(records, employeeName) {
  return records.find(record => record.firstName == employeeName);
}
