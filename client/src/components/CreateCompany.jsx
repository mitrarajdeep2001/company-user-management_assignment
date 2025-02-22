import React, { useState } from "react";
import { createCompany } from "../api";

const CreateCompany = () => {
  const [company, setCompany] = useState({ name: "", parentCompanyId: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCompany(company);
      alert("Company Created Successfully!");
      setCompany({ name: "", parentCompanyId: "" });
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Create Company</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Parent Company ID (Optional)"
          value={company.parentCompanyId}
          onChange={(e) =>
            setCompany({ ...company, parentCompanyId: e.target.value })
          }
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCompany;
