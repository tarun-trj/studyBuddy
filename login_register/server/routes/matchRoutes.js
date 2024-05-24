import EmployeeModel from '../models/EmployeeModel.js';
import SubjectModel from '../models/SubjectModel.js';
import * as d3 from 'd3';

const app = express();

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

function createAdjacencyList(matrix, emails) {
    const adjacencyList = {};

    for (let i = 0; i < matrix.length; i++) {
        adjacencyList[emails[i]] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > 0) {
                adjacencyList[emails[i]].push({ email: emails[j], weight: matrix[i][j] });
            }
        }
    }

    return adjacencyList;
}

function greedyMaximumWeightMatching(adjacencyList) {
    const edges = [];

    // Convert adjacency list to an edge list
    for (const [email, neighbors] of Object.entries(adjacencyList)) {
        for (const neighbor of neighbors) {
            edges.push([email, neighbor.email, neighbor.weight]);
        }
    }

    // Sort edges by weight in descending order
    edges.sort((a, b) => b[2] - a[2]);

    const matched = new Set();
    const matching = [];

    for (const [email1, email2, weight] of edges) {
        if (!matched.has(email1) && !matched.has(email2)) {
            matching.push({ email1, email2, weight });
            matched.add(email1);
            matched.add(email2);
        }
    }

    return matching;
}

function handleData() {
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

