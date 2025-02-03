"use client";

import React from "react";

interface StartDateInputProps {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function StartDateInput({
  startDate,
  setStartDate,
}: StartDateInputProps) {
  const handleChange = (e: React.ChangeEvent<any>) => {
    setStartDate(e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor="start-date"
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Earliest Start Date:
      </label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #333",
          borderRadius: "8px",
          backgroundColor: "#2b2b2b",
          color: "white",
        }}
      />
    </div>
  );
}
