import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const Landingpage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const roles = ['admin', 'ProjectManager', 'UIdeveloper', 'FrontendDeveloper', 'DBadmin', 'BackendDeveloper', 'guest'];

  const getColor = (index) => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF5757"];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://rbac-backend-dxeh.onrender.com/api/user/getallusers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        setUsers(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle error state here
      }
    };
    fetchUsers();
  }, []);

  const roleDistribution = roles.map(role => ({
    name: role,
    value: users.filter(user => user.role === role).length,
  }));

  const performanceData = users.map(user => ({
    username: user.username,
    taskPending: user.taskPending.length || 0,
    taskCompleted: user.taskCompleted.length || 0,
  }));

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800">Overview</h1>
      <div className="flex flex-col md:flex-row gap-6 mt-6">

  {/* Users Card */}
  <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-100">
    <h5 className="mb-2 text-2xl font-bold text-gray-700">Users</h5>
    <p className="text-3xl font-semibold text-blue-600">{users.length}</p>
    <Link to="./?tab=users" className="text-blue-600 hover:underline mt-4 block transition-transform transform hover:scale-105">View Users</Link>
  </div>
  {/* Pie Chart */}
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" style={{width:"800px"}}>
    <div className="p-6">
      <h5 className="text-xl font-bold mb-4 text-gray-700">Users by Role Distribution</h5>
      <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer>
  <PieChart>
    <Pie
      data={roleDistribution}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      {roleDistribution.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={getColor(index)} />
      ))}
    </Pie>
    <Tooltip />
    <Legend verticalAlign="bottom" align="center" layout="horizontal" />
  </PieChart>
</ResponsiveContainer>

      </div>
    </div>
  </div>
</div>


      {/* Performance Report */}
      <div className="mt-10">
        <h1 className="text-gray-800 text-3xl mb-6">Performance Report:</h1>
        <div className="performance-chart bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="username" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="taskPending" fill="#8884d8" />
              <Bar dataKey="taskCompleted" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
