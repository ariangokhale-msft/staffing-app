"use client";

import React from "react";

export default function SubmitButton() {
  return (
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "12px",
        border: "none",
        backgroundColor: "#0070f3",
        color: "white",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      Submit
    </button>
  );
}
