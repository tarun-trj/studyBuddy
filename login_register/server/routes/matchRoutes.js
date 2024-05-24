import mongoose from 'mongoose';
import express from 'express';
import EmployeeModel from '../models/EmployeeModel.js';
import SubjectModel from '../models/SubjectModel.js';
import MatchedModel from '../models/MatchedModel.js'
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
                freeStudents.push(matches.get(preferredSubject)); // Push the currently matched student back to the free pool
                matches.set(preferredSubject, student);
            } else {
                freeStudents.push(student);
            }
        }
    }

    // Convert the matches from a Map to an array of objects with email1 and email2
    let result = [];
    matches.forEach((value, key) => {
        result.push({ email1: value, email2: key });
    });
    return result;
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
    // Fetch employees and subjects from the database
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
                    // Assuming joinData properly merges and formats these arrays
                    return joinData(employees, subjects);
                });
        })
        .then(joinedData => {
            if (!joinedData) return; // If there's no data to process, exit
            // Process the data to get it ready for matching
            const processedData = processData(joinedData);
            const emails = processedData.map(d => d.email);
            const studentEmails = emails.slice(0, Math.floor(emails.length / 2));
            const subjectEmails = emails.slice(Math.floor(emails.length / 2));

            // Generate stable matches
            return stableMarriage(studentEmails, subjectEmails);
        })
        .then(stableMatching => {
            if (!stableMatching || stableMatching.length === 0) {
                console.log("No stable matches found");
                return;
            }

            // Save each matching pair to the database
            return Promise.all(stableMatching.map(match => {
                const newMatch = new MatchedModel({
                    email1: match.email1,
                    email2: match.email2,
                    time: 1 // Here we ensure the time is set to the current timestamp
                });
                return newMatch.save();
            }));
        })
        .then(savedMatches => {
            console.log("Matches saved to the database:", savedMatches);
            // Optional: Further actions or logging can be performed here
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
