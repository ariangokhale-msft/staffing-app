"use client";

import React from "react";

interface SkillsInputProps {
  skillsText: string;
  setSkillsText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SkillsInput({
  skillsText,
  setSkillsText,
}: SkillsInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkillsText(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor="skills"
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Describe Your Skills:
      </label>
      <textarea
        id="skills"
        rows={5} // Use a number, not a string
        value={skillsText}
        onChange={handleChange}
        placeholder="Describe your skills, experience, and expertise..."
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #333",
          borderRadius: "8px",
          backgroundColor: "#2b2b2b",
          color: "white",
          resize: "none",
        }}
      />
    </div>
  );
}
