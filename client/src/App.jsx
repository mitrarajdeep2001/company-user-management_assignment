import React from "react";
import RegisterUser from "./components/RegisterUser";
import CreateCompany from "./components/CreateCompany";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Company & User Management
      </h1>
      <CreateCompany />
      <RegisterUser />
      <Search />
    </div>
  );
}

export default App;
