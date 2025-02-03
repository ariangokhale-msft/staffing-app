import React from "react";

interface RoleDropdownProps {
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  selectedRoles,
  setSelectedRoles,
}) => {
  const roles = [
    "Consultant",
    "Senior Consultant",
    "Domain Solution Architect",
    "Program Architect",
    "Program Director",
    "Consulting Product Manager",
    "Senior Consulting Product Manager",
    "Senior Domain Solution Architect",
    "Senior Project Manager",
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const role = e.target.value;
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ display: "block", marginBottom: "10px", color: "#fff" }}>
        Requested Role(s):
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {roles.map((role, index) => (
          <div
            key={role}
            style={{
              display: "flex",
              alignItems: "center",
              width: "48%", // Ensures two columns
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              value={role}
              checked={selectedRoles.includes(role)}
              onChange={handleCheckboxChange}
              style={{
                marginRight: "8px",
                accentColor: "#0070f3",
              }}
            />
            <label
              style={{
                color: "#fff",
                fontSize: "14px", // Slightly smaller text
              }}
            >
              {role}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleDropdown;
