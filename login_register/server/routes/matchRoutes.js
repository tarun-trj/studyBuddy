import mongoose from 'mongoose';
import express from 'express';
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

function createAdjacencyMatrix(data, emails) {
    const matrix = emails.map(email1 =>
        emails.map(email2 => {
            if (email1 === email2) return 0; // No self-loops
            const subjects1 = new Set(data.find(d => d.email === email1).subjects);
            const subjects2 = new Set(data.find(d => d.email === email2).subjects);
            const commonSubjects = [...subjects1].filter(subject => subjects2.has(subject)).length;
            return commonSubjects;
        })
    );
    return matrix;
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

function stableMarriage(students, subjects) {
    let freeStudents = [...students];
    let studentPreferences = initializePreferences(students, subjects);
    let subjectPreferences = initializePreferences(subjects, students);
    let matches = new Map();

    while (freeStudents.length > 0) {
        let student = freeStudents.shift();
        let preferredSubject = studentPreferences[student].shift();
        
        if (!matches.has(preferredSubject)) {
            matches.set(preferredSubject, student);
        } else {
            let currentMatch = matches.get(preferredSubject);
            if (subjectPreferences[preferredSubject].indexOf(student) < subjectPreferences[preferredSubject].indexOf(currentMatch)) {
                matches.set(preferredSubject, student);
                freeStudents.push(currentMatch);
            } else {
                freeStudents.push(student);
            }
        }
    }
    return matches;
}

function initializePreferences(primaryList, secondaryList) {
    const preferences = {};
    primaryList.forEach(primary => {
        preferences[primary] = [...secondaryList].sort(() => Math.random() - 0.5); // Random preferences for demonstration
    });
    return preferences;
}

function displayMatching(matching, emails) {
    const matchMap = new Map();
    matching.forEach((value, key) => {
        matchMap.set(key, value);
        matchMap.set(value, key);
    });

    console.log("Email Matching:");
    emails.forEach(email => {
        const match = matchMap.get(email);
        if (match) {
            console.log(`${email} <-> ${match}`);
        } else {
            console.log(`${email} has no match`);
        }
    });
}

function handleData() {
    EmployeeModel.find().select('email branch')
        .then(employees => {
            if (employees.length === 0) {
                console.log("No employees found");
                return; // Exit if no employees are found
            }
            return SubjectModel.find().select('email subjects')
                .then(subjects => {
                    if (subjects.length === 0) {
                        console.log("No subjects found");
                        return; // Exit if no subjects are found
                    }
                    return joinData(employees, subjects);
                });
        })
        .then(joinedData => {
            if (!joinedData) return; // If there's no data to process, exit
            const processedData = processData(joinedData);
            const emails = processedData.map(d => d.email);
            const matrix = createAdjacencyMatrix(processedData, emails);
            const adjacencyList = createAdjacencyList(matrix, emails);
            console.log("Data joined:", joinedData);
            console.log("Adjacency List:", adjacencyList);

            const studentEmails = emails.slice(0, Math.floor(emails.length / 2)); // Example split
            const subjectEmails = emails.slice(Math.floor(emails.length / 2));

            const stableMatching = stableMarriage(studentEmails, subjectEmails);
            console.log("Stable Matching:", stableMatching);

            displayMatching(stableMatching, emails);
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
