import React, { useState } from "react";

const AddUserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || isNaN(formData.age) || formData.age < 0) {
      setError("Invalid input.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      setFormData({ name: "", email: "", age: "" });
      setError("");
      alert("User added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;