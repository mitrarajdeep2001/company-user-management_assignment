import React, { useState } from "react";
import { createUser } from "../api";

const RegisterUser = () => {
  const [user, setUser] = useState({ name: "", email: "", companyId: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert("User Registered Successfully!");
      setUser({ name: "", email: "", companyId: "" });
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company ID"
          value={user.companyId}
          onChange={(e) => setUser({ ...user, companyId: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
