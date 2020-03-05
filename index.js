// Your code here
function createEmployeeRecord(row){
  return{
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(empRowData){
  return empRowData.map(row =>
    createEmployeeRecord(row)
  )
}

function createTimeInEvent(employee, time) {
  return timeStamp(time, "TimeIn", "timeInEvents", employee);
}

function createTimeOutEvent(employee, time){
  return timeStamp(time, "TimeOut", "timeOutEvents", employee)
}

function timeStamp(time, timeType, timeEvent, employee){
  employee[timeEvent].push({
    type: timeType,
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1], 10)
  })
  return employee
}

function hoursWorkedOnDate(employee, date){
  const timeIn = employee.timeInEvents.find(obj => obj.date == date).hour
  const timeOut = employee.timeOutEvents.find(obj => obj.date == date).hour
  return(timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date){
  const hourlyWage = employee.payPerHour
  const hoursWorked = hoursWorkedOnDate(employee, date)
  return hourlyWage * hoursWorked
}

function allWagesFor(employee){
  let timeInDates = employee.timeInEvents.map(obj => obj.date)
  const total = timeInDates.reduce((sum, date) =>{
    return wagesEarnedOnDate(employee, date) + sum
  }, 0)
  return total
}

function findEmployeeByFirstName(records, name){
  return records.find(record => record.firstName == name)
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
function calculatePayroll(employees) {
  return employees.reduce((sum, employeeRecord) => sum + allWagesFor(employeeRecord), 0);
}
