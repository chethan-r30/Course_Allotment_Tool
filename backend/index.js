const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }).fields([
    { name: 'scheme', maxCount: 1 },
    { name: 'preferences', maxCount: 1 }
]);

app.post('/upload', upload, async (req, res) => {
    try {
        if (!req.files || !req.files['scheme'] || !req.files['preferences']) {
            return res.status(400).json({ message: "Both files are required!" });
        }

        const schemePath = req.files['scheme'][0].path;
        const preferencesPath = req.files['preferences'][0].path;

        const schemeWorkbook = xlsx.readFile(schemePath);
        const schemeSheet = schemeWorkbook.Sheets[schemeWorkbook.SheetNames[0]];
        const schemeData = xlsx.utils.sheet_to_json(schemeSheet);

        const preferencesWorkbook = xlsx.readFile(preferencesPath);
        const preferencesSheet = preferencesWorkbook.Sheets[preferencesWorkbook.SheetNames[0]];
        const preferencesData = xlsx.utils.sheet_to_json(preferencesSheet);

        fs.unlinkSync(schemePath);
        fs.unlinkSync(preferencesPath);

        let courses = schemeData.map(row => ({
            title: row['Course Title'],
            sections: { 'A Section': 'No faculty assigned', 'B Section': 'No faculty assigned', 'C Section': 'No faculty assigned' }
        }));

        let assignedFaculties = new Set();

        preferencesData.forEach(faculty => {
            let facultyName = faculty['Faculty Name'];
            let assigned = false;

            for (let i = 1; i <= 4; i++) {
                let preference = faculty[`Subject Preference ${i}`];
                if (!preference) continue;

                let courseIndex = courses.findIndex(course => course.title.includes(preference));
                if (courseIndex !== -1 && !assigned) {
                    if (courses[courseIndex].sections['A Section'] === 'No faculty assigned') {
                        courses[courseIndex].sections['A Section'] = facultyName;
                    } else if (courses[courseIndex].sections['B Section'] === 'No faculty assigned') {
                        courses[courseIndex].sections['B Section'] = facultyName;
                    } else if (courses[courseIndex].sections['C Section'] === 'No faculty assigned') {
                        courses[courseIndex].sections['C Section'] = facultyName;
                    }
                    assignedFaculties.add(facultyName);
                    assigned = true;
                }
            }
        });

        let unassignedFaculties = preferencesData
            .filter(faculty => !assignedFaculties.has(faculty['Faculty Name']))
            .map(faculty => ({
                'Faculty Name': faculty['Faculty Name'],
                'Designation': faculty['Designation']
            }));

        const resultWorkbook = xlsx.utils.book_new();
        const resultSheet = xlsx.utils.json_to_sheet(courses.map(course => ({
            'Course Title': course.title,
            ...course.sections
        })));
        xlsx.utils.book_append_sheet(resultWorkbook, resultSheet, 'Course Assignments');

        if (unassignedFaculties.length > 0) {
            const unassignedSheet = xlsx.utils.json_to_sheet(unassignedFaculties);
            xlsx.utils.book_append_sheet(resultWorkbook, unassignedSheet, 'Unassigned Faculties');
        }

        function autoFitColumns(workbook) {
            Object.keys(workbook.Sheets).forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const range = xlsx.utils.decode_range(sheet['!ref']);
                let colWidths = new Array(range.e.c + 1).fill(10);
                
                for (let R = range.s.r; R <= range.e.r; ++R) {
                    for (let C = range.s.c; C <= range.e.c; ++C) {
                        let cellAddress = xlsx.utils.encode_cell({ r: R, c: C });
                        let cell = sheet[cellAddress];
                        if (cell && cell.v) {
                            let cellValue = cell.v.toString();
                            colWidths[C] = Math.max(colWidths[C], cellValue.length + 5);
                        }
                    }
                }
                
                sheet['!cols'] = colWidths.map(width => ({ wch: width }));
            });
        }

        autoFitColumns(resultWorkbook);

        const resultPath = path.join(__dirname, 'processed_allotment.xlsx');
        xlsx.writeFile(resultWorkbook, resultPath);

        res.download(resultPath, 'processed_allotment.xlsx', () => {
            fs.unlinkSync(resultPath);
        });

    } catch (error) {
        console.error("Error processing files:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
