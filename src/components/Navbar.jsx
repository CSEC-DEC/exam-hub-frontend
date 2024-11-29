import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center space-x-1">
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            Exam
          </span>
          <span className="bg-purple-700 text-white font-bold py-1 px-3 rounded-lg">
            Hub
          </span>
        </div>
      </Link>

      <div>
        <ul className="flex space-x-6">
          <Link to="/exams">
            <li className="text-black hover:text-gray-300 cursor-pointer">
              Exams
            </li>
          </Link>
          <Link to="/upload">
            <li className="text-black hover:text-gray-300 cursor-pointer">
              Upload
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
