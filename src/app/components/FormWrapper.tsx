"use client";

import React, { useState } from "react";
import WeeklyHoursInput from "./WeeklyHours";
import StartDateInput from "./StartDateInput";
import SkillsInput from "./SkillsInput";
import SubmitButton from "./SubmitButton";
import RoleDropdown from "./TempRoleDropdown";
import MatchedProjects from "./MatchedProjects";
import OtherProjects from "./OtherProjects";

interface FormWrapperProps {}

export default function FormWrapper({}: FormWrapperProps) {
  // Form states
  const [skillsText, setSkillsText] = useState<string>("");
  const [hoursAvailable, setHoursAvailable] = useState<number>(0);
  const [earliestStartDate, setEarliestStartDate] = useState<string>("");
  const [requestedRoles, setRequestedRoles] = useState<string[]>([]);

  // Result states
  const [matchedProjects, setMatchedProjects] = useState<any[]>([]);
  const [otherProjects, setOtherProjects] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMatchedProjects([]);
    setOtherProjects([]);
    setErrorMsg("");

    // Build request body
    const body = {
      skillsText,
      hoursAvailable,
      earliestStartDate,
      requestedRoles,
    };

    try {
      const response = await fetch("/api/open-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "An error occurred");
        return;
      }

      // Expecting { matchedProjects: [...], otherProjects: [...] }
      setMatchedProjects(data.matchedProjects || []);
      setOtherProjects(data.otherProjects || []);
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <SkillsInput skillsText={skillsText} setSkillsText={setSkillsText} />
        <WeeklyHoursInput
          weeklyHours={hoursAvailable}
          setHoursAvailable={setHoursAvailable}
        />
        <StartDateInput
          startDate={earliestStartDate}
          setStartDate={setEarliestStartDate}
        />
        <RoleDropdown
          selectedRoles={requestedRoles}
          setSelectedRoles={setRequestedRoles}
        />
        <SubmitButton />
      </form>

      {errorMsg && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <strong>Error: </strong> {errorMsg}
        </div>
      )}

      {/* Render matched projects and other projects if present */}
      {matchedProjects.length > 0 && (
        <MatchedProjects matchedProjects={matchedProjects} />
      )}
      {otherProjects.length > 0 && (
        <OtherProjects otherProjects={otherProjects} />
      )}
    </div>
  );
}
