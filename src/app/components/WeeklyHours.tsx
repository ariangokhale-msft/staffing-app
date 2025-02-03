interface WeeklyHoursInputProps {
  weeklyHours: number;
  setHoursAvailable: React.Dispatch<React.SetStateAction<number>>;
}

export default function WeeklyHoursInput({
  weeklyHours,
  setHoursAvailable,
}: WeeklyHoursInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoursAvailable(Number(e.target.value));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor="weekly-hours"
        style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
      >
        Weekly Available Hours:
      </label>
      <input
        type="number"
        id="weekly-hours"
        value={weeklyHours}
        onChange={handleChange}
        placeholder="Enter your available hours..."
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
