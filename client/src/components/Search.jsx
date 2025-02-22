import React, { useState } from "react";
import { search } from "../api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ users: [], companies: [] });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await search(query);
      setResults(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Search Users & Companies</h2>
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </form>

      <h3>Users</h3>
      <ul>
        {results.users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <br />
            <ul>
                <li>Role: {user.role}</li>
                <li>Company: {user.companyId.name}</li>
            </ul>
          </li>
        ))}
        {results.users.length === 0 && <p style={{textAlign: 'center'}}>No users found</p>}
      </ul>

      <h3>Companies</h3>
      <ul>
        {results.companies.map((company) => (
          <li key={company._id}>
            {company.name} (Level {company.hierarchyLevel})
            <br />
            <ul>
                <li>Parent Company: {company.parentCompanyId?.name || "N/A"}</li>
                <li>Associated Users:
                    <ul>
                        {company.associatedUsers.map((user) => (
                            <li key={user._id}>
                                {user.name} - {user.email} ({user.role})
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
          </li>
        ))}
        {results.companies.length === 0 && <p style={{textAlign: 'center'}}>No companies found</p>}
      </ul>
    </div>
  );
};

export default Search;
