import React, { useEffect, useState } from 'react';
import './DisplayCourses.css'; // Import the CSS file
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
const DisplayFeedback = ({ feedbackData }) => {
    const [data, setData] = useState(feedbackData || []); // Initialize with props data if available

    useEffect(() => {
        if (!feedbackData) {
            // Fetch data from API only if no data is passed via props
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No token found in localStorage");
                        return;
                    }

                    const response = await fetch('http://localhost:5000/update/fdata', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        console.error(`Failed to fetch data: ${response.statusText}`);
                        const errorMessage = await response.text();
                        console.error('Error message:', errorMessage);
                        return;
                    }

                    const data2 = await response.json();
                    console.log("Fetched Data:", data2); // Debugging log

                    if (Array.isArray(data2.data)) {
                        setData(data2.data);
                    } else {
                        console.error("Unexpected API response format:", data2);
                        setData([]);
                    }

                } catch (error) {
                    console.error('Error occurred while fetching data:', error);
                }
            };

            fetchData();
        }
    }, [feedbackData]);
    const handleEdit = async (id) => {
        const data = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (data.ok) {
            toast.success("Feedback updated successfully");
        } else {
            toast.error("Failed to update feedback");
        }
    };

    const handleDelete = async (id) => {
        const data = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.ok) {
            toast.success("Feedback deleted successfully");
        } else {
            toast.error("Failed to delete feedback");
        }
    };
    return (
        <div>
            <ToastContainer />
            <table className="courses-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Sem-Branch-Sec</th>
                        <th>Course Name</th>
                        <th>No. of students</th>
                        <th>Feedback %</th>
                        {data.length > 0 && <th>Average %</th>} {/* Only show header if data exists */}
                        {data.length > 0 && <th>Self-Assessment Marks</th>} {/* Same as above */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((feedback, index) => (
                            <tr key={feedback.id || index}>
                                <td>{index + 1}</td> {/* Serial Number */}
                                <td>{feedback.semester}</td>
                                <td>{feedback.courseName}</td>
                                <td>{feedback.numberOfStudents}</td>
                                <td>{feedback.feedbackPercentage}</td>

                                {/* Show Average % and Self-Assessment Marks only in the last row */}
                                {index === 0 && (
                                    <>
                                        <td rowSpan={data.length}>{data[data.length - 1].averagePercentage}</td>
                                        <td rowSpan={data.length}>{data[data.length - 1].selfAssessmentMarks}</td>
                                    </>
                                )}
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleEdit(feedback.id)} style={{ width: 'auto' }}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(feedback.id)} style={{ width: 'auto', backgroundColor: 'red', color: 'white' }}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayFeedback;
