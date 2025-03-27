import express from "express";
import ExcelJS from "exceljs";
import fs from "fs";

const router = express.Router();

// Mock Data (Replace with actual course allotment logic)
const sampleAllotment = [
  { studentId: "S001", name: "Alice", course: "Math 101" },
  { studentId: "S002", name: "Bob", course: "Physics 102" },
];

// API Endpoint to Generate and Download Excel File
router.get("/download-allotment", async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Allotment");

  // Add Headers
  worksheet.columns = [
    { header: "Student ID", key: "studentId", width: 15 },
    { header: "Name", key: "name", width: 20 },
    { header: "Course", key: "course", width: 25 },
  ];

  // Add Data Rows
  sampleAllotment.forEach((data) => {
    worksheet.addRow(data);
  });

  // Save file temporarily
  const filePath = "./allotment.xlsx";
  await workbook.xlsx.writeFile(filePath);

  // Send file as response
  res.download(filePath, "Course_Allotment.xlsx", (err) => {
    if (err) {
      console.error("Download Error:", err);
    }
    fs.unlinkSync(filePath); // Delete file after download
  });
});

export default router;
