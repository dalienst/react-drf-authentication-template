/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { api } from "../api/axios";

function Dashboard() {
  const { user, tokens, logout } = useContext(AuthContext);
  const [person, setPerson] = useState([]);

  // authentication and uploading files
  const config = {
    headers: {
      Authorization: "Bearer" + " " + tokens.access, // Assuming you're using a Bearer token
      "Content-Type": "multipart/form-data",
    },
  };

  // fetch user details
  const fetchPerson = async () => {
    if (!user?.user_id) {
      return;
    }
    try {
      const response = await api.get(`me/${user?.user_id}/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      });
      setPerson(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPerson();
  }, [user]);

  return (
    <>
    <div className="container">
      <h1 className="fw-bold">Welcome {person.username}</h1>
      <hr />
      <p className="fw-semibold">This is your Dashboard</p>
    </div>
    </>
  );
}

export default Dashboard;
