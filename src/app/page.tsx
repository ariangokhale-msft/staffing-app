"use client";

import React from "react";
import FormWrapper from "./components/FormWrapper";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#0070f3" }}>Staffing Match</h1>
        <p style={{ fontSize: "1.2rem" }}>
          Please fill out the form to see available project roles.
        </p>
      </header>

      <main style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "20px", color: "#ffffff" }}>Your Details</h2>
        <FormWrapper />
      </main>
    </div>
  );
}
