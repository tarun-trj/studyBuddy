import EmployeeModel from '../models/EmployeeModel.js';
import SubjectModel from '../models/SubjectModel.js';


function processData(joinedData) {
    return joinedData.map(item => ({
        ...item,
        subjectCount: item.subjects.length
    }));
}

function joinData(employees, subjects) {
    const subjectEmails = new Set(subjects.map(subject => subject.email));
    return employees.filter(emp => subjectEmails.has(emp.email)).map(emp => ({
        ...emp.toObject(),
        subjects: subjects.filter(sub => sub.email === emp.email).map(sub => sub.subjects).flat()
    }));
}

function handleData() {
    console.log("Fetching employees...");
    EmployeeModel.find().select('email branch')
    .then(employees => {
        if (employees.length === 0) {
            console.log("No employees found");
            return; // Exit if no employees are found
        }
        console.log("Employees fetched:", employees);
        console.log("Fetching subjects...");
        return SubjectModel.find().select('email subjects')
        .then(subjects => {
            if (subjects.length === 0) {
                console.log("No subjects found");
                return; // Exit if no subjects are found
            }
            console.log("Subjects fetched:", subjects);
            return joinData(employees, subjects);
        });
    })
    .then(joinedData => {
        if (!joinedData) return; // If there's no data to process, exit
        console.log("Data joined:", joinedData);
        const processedData = processData(joinedData);
        console.log("Data processed:", processedData);
    })
    .catch(error => {
        console.error('Error during data handling operation:', error);
    });
}

function startScheduledTasks(time) {
    handleData(); // Run immediately when the server starts
    setInterval(handleData, time); // 600000 milliseconds = 10 minutes
}

export { startScheduledTasks };
