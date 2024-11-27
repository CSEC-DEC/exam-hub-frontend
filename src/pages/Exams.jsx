import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Exams = () => {
  const [exams, setExams] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam, index) => (
          <div
            key={index}
            className="exam-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-start"
          >
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {exam.name}
            </h1>
            <p className="text-gray-600 mb-4">{exam.code}</p>
            {/* Overlapping Photos */}
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
