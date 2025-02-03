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

interface OtherProjectsProps {
  otherProjects: Project[];
}

export default function OtherProjects({ otherProjects }: OtherProjectsProps) {
  return (
    <div style={{ marginTop: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "10px" }}>Other Projects You May Be Available For</h2>
      {otherProjects.length === 0 ? (
        <div>No other projects found.</div>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {otherProjects.map((proj) => (
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
