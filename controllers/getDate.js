// const dateModel = require("../models/dateModel")
// const moment = require('moment');


// const getDate = async (req, res) => {

//     try {
//         const { startDate, endDate } = req.query;
//         const filteredRecords = await getRecordsInDateRange(startDate, endDate);
//         console.log("filteredRecords",filteredRecords);
//         // res.json(filteredRecords);
//         res.json({ filteredRecords });
//     } catch (error) {
//         res.status(500).json({ 
//             status: 'Internal Server Error',
//             error:error.message
//          });
//     }

//     async function getRecordsInDateRange(startDate, endDate) {
//         // const startMoment = moment(startDate, 'YYYY-MM-DD HH:mm:ss').utc().toDate();
//         // const endMoment = moment(endDate, 'YYYY-MM-DD HH:mm:ss').utc().toDate();

//         const startMoment = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
//         const endMoment = moment(endDate, 'YYYY-MM-DD HH:mm:ss');

//         console.log("startMoment",startMoment);
//         console.log("endMoment",endMoment);

//         return

//         console.log('Query being executed:', {
//             date: { $gte: startUtc, $lte: endUtc }
//           });

//         // Fetch records from the database within the date range
//         const records = await dateModel.find({
//             date: { $gte: startUtc, $lte: endUtc }
//         });

//         return records;
//     }

// }

// module.exports = getDate


///////////////////////////////////////////

// original code is below

// const dateModel = require("../models/dateModel");
// const moment = require('moment');

// const getDate = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.query;
//         const filteredRecords = await getRecordsInDateRange(startDate, endDate);
//         console.log("filteredRecords",filteredRecords);
//         res.json({ filteredRecords });
//     } catch (error) {
//         res.status(500).json({ 
//             status: 'Internal Server Error',
//             error: error.message
//          });
//     }
// }

// async function getRecordsInDateRange(startDate, endDate) {
//     try {
//         // Construct start and end moments based on the provided formats
//         const startMoment = moment.tz(startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Kolkata');
//         const endMoment = moment.tz(endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Kolkata').endOf('day');

//         console.log("startMoment", startMoment.toDate());
//         console.log("endMoment", endMoment.toDate());

//         const records = await dateModel.find({
//             date: { $gte: startMoment, $lte: endMoment }
//         });

//         return records;
//     } catch (error) {
//         console.error('Error fetching records:', error);
//         throw error;
//     }
// }


// module.exports = getDate;


// end of original code here.


const dateModel = require("../models/dateModel");
const moment = require('moment');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const publicFolder = path.join(__dirname, '..', 'public');
// console.log("publicFolder",publicFolder);

const getDate = async (req, res) => {

    try {

        const { startDate, endDate } = req.query;
        const data = await getRecordsInDateRange(startDate, endDate);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        // Add headers
        worksheet.addRow(['Name', 'Date']);

        // Add data to the worksheet
        data.forEach(item => {
            worksheet.addRow([item.name, item.date]);
        });

        const filePath = path.join(publicFolder, 'data.xlsx');

        // Save the workbook to a file
        await workbook.xlsx.writeFile(filePath);

        // Check if the file was saved successfully
        if (fs.existsSync(filePath)) {
            res.status(200).send('File saved successfully.');
        } else {
            res.status(500).send('Error saving the file.');
        }
        
    } catch (error) {
        res.status(500).json({
            status: 'Internal Server Error',
            error: error.message
        });
    }
}

async function getRecordsInDateRange(startDate, endDate) {
    try {
        // Construct start and end moments based on the provided formats
        const startMoment = moment.tz(startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Kolkata');
        const endMoment = moment.tz(endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Kolkata').endOf('day');

        // console.log("startMoment", startMoment.toDate());
        // console.log("endMoment", endMoment.toDate());

        const records = await dateModel.find({
            date: { $gte: startMoment, $lte: endMoment }
        });

        return records;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
}


module.exports = getDate;




// const { startDate, endDate } = req.query;
//         const data = await getRecordsInDateRange(startDate, endDate);

//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Data');

//         // Add headers
//         worksheet.addRow(['Name', 'Date']);

//         // Add data to the worksheet
//         data.forEach(item => {
//             worksheet.addRow([item.name, item.date]);
//         });

//         const filePath = path.join(publicFolder, 'data.xlsx');

//         // Save the workbook to a file
//         await workbook.xlsx.writeFile(filePath);

//         // Check if the file was saved successfully
//         if (fs.existsSync(filePath)) {
//             res.status(200).send('File saved successfully.');
//         } else {
//             res.status(500).send('Error saving the file.');
//         }


