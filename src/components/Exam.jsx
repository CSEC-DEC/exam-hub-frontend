import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaEye, FaFileDownload } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const Exam = () => {
  const [fullScreenPhoto, setFullScreenPhoto] = useState(null);
  const [exam, setExam] = useState({
    name: "",
    code: "",
    course: "",
    instructor: "",
    type: "",
    likes: [],
    photos: [],
  });

  const { examId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/exam/${examId}`)
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [examId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{exam.name}</h1>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold">Code:</span> {exam.code}
        </p>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold">Course:</span> {exam.course}
        </p>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold">Instructor:</span> {exam.instructor}
        </p>
        <p className="text-gray-600 text-lg">
          <span className="font-semibold">Type:</span> {exam.type}
        </p>
      </div>

      {exam.photos?.length > 0 && (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="relative w-full flex flex-wrap justify-center gap-4 p-4">
            {exam.photos.map((photoUrl, i) => (
              <div key={i} className="relative w-48 h-48">
                {/* Photo */}
                <img
                  src={photoUrl}
                  alt={`Photo ${i}`}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Buttons Overlay */}
                <div className="absolute bottom-0 w-full bg-opacity-50 flex items-center justify-around space-x-4 p-2 rounded-b-lg">
                  {/* View Button */}
                  <button
                    onClick={() => setFullScreenPhoto(photoUrl)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <FaEye size={16} />
                  </button>

                  {/* Download Button */}
                  <a
                    href={photoUrl}
                    download={`Photo-${i}`}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  >
                    <FaFileDownload size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Full-Screen Modal */}
          {fullScreenPhoto && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setFullScreenPhoto(null)}
            >
              <img
                src={fullScreenPhoto}
                alt="Full Size"
                className="max-w-full max-h-full rounded-lg"
              />
            </div>
          )}
        </div>
      )}

      {/* Likes Section */}
      <div className="flex items-center justify-center mt-4">
        <FaThumbsUp className="text-blue-500 mr-2" size={24} />
        <span className="text-gray-800 text-xl font-medium">
          {exam.likes?.length || 0} Likes
        </span>
      </div>
    </div>
  );
};

export default Exam;
