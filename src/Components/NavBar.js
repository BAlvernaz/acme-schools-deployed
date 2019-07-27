import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { popularHelper, topSchoolHelper } from "../helpers";
import axios from "axios";

const NavBar = ({ students, schools }) => {
  const mostPopular = popularHelper(students, schools);
  const topSchool = topSchoolHelper(students, schools);
  const logout = async () => {
    const response = await axios.delete("/api/session");
    delete document.cookie;
    console.log(response.data)

  };
  return (
    <div id="NavbarContainer">
      <h1>Acme Schools</h1>
      <NavLink activeClassName="active" to="/login">
        {document.cookie ? (
          <button onClick={() => logout()}>Logout {document.cookie}</button>
        ) : (
          "Login"
        )}{" "}
      </NavLink>
      <NavLink activeClassName="active" to="/">
        <h3>Home</h3>
      </NavLink>
      <NavLink activeClassName="active" to="/schools">
        <h3>{`Schools (${schools.length})`}</h3>
      </NavLink>
      <NavLink activeClassName="active" to="/students">
        <h3>{`Students (${students.length})`}</h3>
      </NavLink>
      {mostPopular ? (
        <NavLink activeClassName="active" to={`/schools/${mostPopular.id}`}>
          <h3>
            Most Popular: {mostPopular.name}(
            {
              students.filter(student => student.schoolId === mostPopular.id)
                .length
            }
            )
          </h3>
        </NavLink>
      ) : (
        ""
      )}
      {topSchool ? (
        <NavLink activeClassName="active" to={`/schools/${topSchool.id}`}>
          <h3>Top School ({topSchool.name}) </h3>
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

const stateToProps = ({ students, schools }) => {
  return {
    students,
    schools
  };
};

export default connect(stateToProps)(NavBar);
