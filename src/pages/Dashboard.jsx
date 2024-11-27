import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Exam Hub
        </h1>
        <p className="text-gray-600 text-lg">
          Your one-stop platform for accessing past exams and resources.
        </p>
      </header>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <Link to="/exams">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Browse Exams
            </h2>
            <p className="text-gray-500">
              Find exams by course, instructor, or type.
            </p>
          </div>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Upload Exams
          </h2>
          <p className="text-gray-500">
            Contribute by sharing your past exams.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>
          Developed by{" "}
          <Link
            target="_blank"
            to="https://t.me/decCoders"
            className="text-blue-600"
          >
            Decoders
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
