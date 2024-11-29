import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    code: "",
    instructor: "",
    type: "",
  });
  const [filterBox, setFilterBox] = useState(false);

  useEffect(() => {
    axios
      .get("https://exam-hub-backend.onrender.com/exams")
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filtered exams based on all fields
  const filteredExams = exams.filter((exam) => {
    return (
      (!filters.name ||
        exam.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.code ||
        exam.code?.toLowerCase().includes(filters.code.toLowerCase())) &&
      (!filters.instructor ||
        exam.instructor
          ?.toLowerCase()
          .includes(filters.instructor.toLowerCase())) &&
      (!filters.type || exam.type === filters.type)
    );
  });

  // Update filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilterBox = () => {
    setFilterBox(!filterBox);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Exam List</h1>
        <button
          onClick={toggleFilterBox}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FaFilter className="mr-2" />
          {filterBox ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {filterBox && (
        <div className="max-w-6xl mx-auto px-4 mb-8 grid gap-4 sm:grid-cols-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by Exam Title"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="code"
            placeholder="Filter by Course Code"
            value={filters.code}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="instructor"
            placeholder="Filter by Instructor Name"
            value={filters.instructor}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Exam Type (All)</option>
            <option value="mid">Mid</option>
            <option value="final">Final</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam, index) => (
          <div
            key={index}
            className="exam-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-start"
          >
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {exam.name}
            </h1>
            <div className="flex justify-between items-center w-full mb-2">
              <p className="text-gray-600">Code: {exam.code}</p>
              <p className="text-gray-600 px-2 py-1 bg-green-200 rounded-sm text-sm font-medium">
                {exam.type}
              </p>
            </div>

            <p className="text-gray-600 mb-5">
              Instructor: {exam.instructor ? exam.instructor : "Not Specified"}
            </p>

            <div className="relative w-full h-28 mb-4">
              {exam.photos?.slice(0, 6).map((photoUrl, i) => (
                <img
                  key={i}
                  src={photoUrl}
                  alt={`Photo ${i}`}
                  className={`absolute rounded-lg shadow-lg w-24 h-28 object-cover transition-transform duration-300`}
                  style={{
                    left: `${i * 30}px`,
                    zIndex: `${100 - i}`,
                    transform: `rotate(${i * 3}deg)`,
                  }}
                />
              ))}

              {exam.photos?.length > 7 && (
                <div className="absolute left-0 top-0 w-24 h-28 bg-gray-800 text-white flex items-center justify-center rounded-lg shadow-lg">
                  +{exam.photos.length - 7}
                </div>
              )}
            </div>

            <div className="mt-auto w-full flex items-center justify-between pt-4">
              <div className="flex items-center">
                <FaThumbsUp className="text-blue-500 mr-2" size={20} />
                <span className="text-gray-800 font-medium">
                  {exam.likes?.length || 0}
                </span>
              </div>

              <div>
                <Link to={`/exams/${exam._id}`}>
                  <button className="border border-gray-950 py-2 px-6 text-blue-500 font-medium hover:underline">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
