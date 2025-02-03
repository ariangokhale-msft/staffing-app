"use client";

import React from "react";

interface Project {
  id: number;
  projectName: string;
  requestedRole: string;
  requestedStartDate: string;
  primarySkill: string;
  hoursPerWeek: number;
}

interface MatchedProjectsProps {
  matchedProjects: Project[];
}

export default function MatchedProjects({ matchedProjects }: MatchedProjectsProps) {
  return (
    <div style={{ marginTop: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "10px" }}>Skill-Matched Projects</h2>
      {matchedProjects.length === 0 ? (
        <div>No matched projects found.</div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {matchedProjects.map((proj) => (
            <li
              key={proj.id}
              style={{
                backgroundColor: "#2e2e2e",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            >
              <strong>{proj.projectName}</strong> <br />
              Role: {proj.requestedRole} <br />
              Start Date: {proj.requestedStartDate} <br />
              Skill: {proj.primarySkill} <br />
              Hours/Week: {proj.hoursPerWeek}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
