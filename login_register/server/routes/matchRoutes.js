import mongoose from 'mongoose';
import express from 'express';
import EmployeeModel from '../models/EmployeeModel.js';
import SubjectModel from '../models/SubjectModel.js';

const router = express.Router();

function processData(joinedData) {
    return joinedData.map(item => ({
        ...item,
        subjectCount: item.subjects.length
    }));
}

function joinData(employees, subjects) {
    // Create a Set of emails from subjects for quick lookup
    const subjectEmails = new Set(subjects.map(subject => subject.email));

    // Filter employees to include only those whose email exists in the subjectEmails Set
    return employees.filter(emp => subjectEmails.has(emp.email)).map(emp => ({
        ...emp.toObject(),
        subjects: subjects.filter(sub => sub.email === emp.email).map(sub => sub.subjects).flat()
    }));
}

router.get('/process-data', (req, res) => {
    console.log("Fetching employees...");
    EmployeeModel.find().select('email branch')
    .then(employees => {
        if (employees.length === 0) {
            throw new Error('No employees found');
        }
        console.log("Employees fetched:", employees);
        console.log("Fetching subjects...");
        return SubjectModel.find().select('email subjects')
        .then(subjects => {
            if (subjects.length === 0) {
                throw new Error('No subjects found');
            }
            console.log("Subjects fetched:", subjects);
            return joinData(employees, subjects);
        }).catch(err => {
            console.error("Error fetching subjects:", err);
            throw err; // Rethrow to be caught by the final catch
        });
    })
    .then(joinedData => {
        console.log("Data joined:", joinedData);
        const processedData = processData(joinedData);
        console.log("Data processed:", processedData);
        res.json(processedData);
    })
    .catch(error => {
        console.error('Error during data handling operation:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    });
});

export default router;
