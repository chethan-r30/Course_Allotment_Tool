// import { useEffect, useState } from "react";
// import axios from "axios";

const RulesSection = () => {
    return (
        <div style={{ padding: "20px", textAlign: "left" }}>
            <h2>📜 Rules for Uploading Files</h2>

            <h3>Scheme File (Courses List)</h3>
            <ul>
                <li>Must be an <strong>Excel (.xlsx)</strong> file.</li>
                <li>Required Columns:
                    <ul>
                        <li><strong>Course Title</strong> – Exact course name.</li>
                        <li><strong>A Section</strong>, <strong>B Section</strong>, <strong>C Section</strong> – Faculty name or “No faculty assigned”.</li>
                    </ul>
                </li>
                <li>Each course should appear <strong>only once</strong> (no duplicates).</li>
                <li>Course names must match exactly (no typos or abbreviations).</li>
                <li>Pre-assigned faculty (if any) will not be replaced.</li>
            </ul>

            <h3>📂 Preferences File (Faculty Preferences)</h3>
            <ul>
                <li>Must be an <strong>Excel (.xlsx)</strong> file.</li>
                <li>Required Columns:
                    <ul>
                        <li><strong>Faculty Name</strong> – Full name.</li>
                        <li><strong>Designation</strong> – Assistant/Associate/Professor.</li>
                        <li><strong>Subject Preference 1-4</strong> – Courses in order of preference.</li>
                    </ul>
                </li>
                <li>Faculty must select at least <strong>4 preferences</strong> to increase the chance of being assigned.</li>
                <li>Course names must <strong>match exactly</strong> (no typos or abbreviations).</li>
                <li>Each faculty will be assigned to <strong>only one section</strong> per course.</li>
            </ul>

            <h3>⚠️ Important Notes</h3>
            <ul>
                <li>Faculties who do not submit valid preferences will remain unassigned.</li>
                <li>Courses with more sections than available faculty may stay unfilled.</li>
                <li>If a course is full, lower-priority faculty will not be assigned.</li>
            </ul>
        </div>
    );
};

export default RulesSection;