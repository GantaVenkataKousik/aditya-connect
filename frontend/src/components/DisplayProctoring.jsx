import React, { useEffect, useState } from 'react';
import './DisplayProctoring.css'; // Import the CSS file
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const ProctoringTable = ({ proctoringData }) => {
    const [data, setData] = useState(proctoringData || []); // Initialize with props data if available

    useEffect(() => {
        if (!proctoringData) {
            // Fetch data from API only if no data is passed via props
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error("No token found in localStorage");
                        return;
                    }

                    const response = await fetch('http://localhost:5000/proc/proctoring-data', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        console.error(`Failed to fetch data: ${response.statusText}`);
                        return;
                    }

                    const fetchedData = await response.json();
                    if (Array.isArray(fetchedData.data)) {
                        setData(fetchedData.data);
                    } else {
                        console.error("Unexpected API response format:", fetchedData);
                        setData([]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [proctoringData]);

    // Function to calculate self-assessment marks
    const getSelfAssessmentMarks = (passPercentage) => {
        if (passPercentage >= 95) return 20;
        if (passPercentage >= 85) return 15;
        if (passPercentage >= 75) return 10;
        return 0;
    };


    const handleEdit = async (id) => {
        const data = await fetch(`http://localhost:5000/partb/proctoring/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (data.ok) {
            toast.success("Proctoring updated successfully");
        } else {
            toast.error("Failed to update proctoring");
        }
    };

    const handleDelete = async (id) => {
        const data = await fetch(`http://localhost:5000/partb/proctoring/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.ok) {
            toast.success("Proctoring deleted successfully");
        } else {
            toast.error("Failed to delete proctoring");
        }
    };
    return (
        <div>
            <ToastContainer />
            <table className="proctoring-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>No. of Students Allotted</th>
                        <th>Sem-Branch-Sec</th>
                        <th>No. of Students Eligible for End Exams (A)</th>
                        <th>No. of Students Passed (B)</th>
                        <th>Pass Percentage (B/A * 100)</th>
                        <th>Average %</th>
                        <th>Self-Assessment Marks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((proctor, index) => {
                            const passPercentage = ((proctor.passedStudents / proctor.eligibleStudents) * 100).toFixed(2);
                            const selfAssessmentMarks = getSelfAssessmentMarks(passPercentage);

                            return (
                                <tr key={proctor.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{proctor.totalStudents}</td>
                                    <td>{proctor.semesterBranchSec}</td>
                                    <td>{proctor.eligibleStudents}</td>
                                    <td>{proctor.passedStudents}</td>
                                    <td>{passPercentage}%</td>

                                    {/* Render "Average %" and "Self-Assessment Marks" only in the first row */}
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={data.length}>{data[data.length - 1]?.averagePercentage || 'N/A'}</td>
                                            <td rowSpan={data.length}>{data[data.length - 1]?.selfAssessmentMarks || selfAssessmentMarks}</td>
                                        </>
                                    )}
                                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => handleEdit(proctor.id)} style={{ width: 'auto' }}>   <FaEdit /></button>
                                            <button onClick={() => handleDelete(proctor.id)} style={{ width: 'auto', backgroundColor: 'red', color: 'white' }}><FaTrash /> </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProctoringTable;
