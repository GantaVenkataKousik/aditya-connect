import React, { useEffect, useState } from 'react';
import './DisplayWorkshops.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
const DisplayWorkshops = ({ data: propsData }) => {
  const [workshops, setWorkshops] = useState(propsData?.workshops || []);
  const [totalMarks, setTotalMarks] = useState(propsData?.totalMarks || 0);
  const [loading, setLoading] = useState(!propsData);
  const navigate = useNavigate();

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "-";
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const start = new Date();
    start.setHours(startHours, startMinutes, 0);
    const end = new Date();
    end.setHours(endHours, endMinutes, 0);
    let diff = (end - start) / (1000 * 60);
    if (diff < 0) diff += 24 * 60;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    if (!propsData) {
      const fetchWorkshops = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/workshop/data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setWorkshops(data.Workshops);
          setTotalMarks(data.TotalMarks);
        } catch (error) {
          console.error('Error fetching workshops:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkshops();
    }
  }, [propsData]);

  const handleEdit = async (id) => {
    const data = await fetch(`http://localhost:5000/workshop/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (data.ok) {
      toast.success("Workshop updated successfully");
    } else {
      toast.error("Failed to update workshop");
    }
  };


  const handleDelete = async (id) => {
    const data = await fetch(`http://localhost:5000/workshop/delete/${id}`, {
      method: 'DELETE',
    });
    if (data.ok) {
      toast.success("Workshop deleted successfully");
    } else {
      toast.error("Failed to delete workshop");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="workshops-container">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-base">5. Workshops/FDPs/STTP/Refresher Courses Attended:</h2>
          <div className="flex items-center gap-2">
            <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
            <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8">Upload</button>
            <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8" onClick={() => navigate('/addworkshop')}>+ Add</button>
          </div>
        </div>

        {loading ? (
          <p>Loading workshops...</p>
        ) : (
          <div className="workshop-table-container">
            <table className="workshop-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Program</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date & Place</th>
                  <th>Organized by</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workshops.length > 0 ? (
                  workshops.map((workshop, index) => (
                    <tr key={workshop._id}>
                      <td>{index + 1}</td>
                      <td>{workshop.title || '-'}</td>
                      <td>{workshop.Description || '-'}</td>
                      <td>{workshop.Category || '-'}</td>
                      <td>
                        {new Date(workshop.Date).toLocaleDateString()} <br />
                        {workshop.Venue || '-'}
                      </td>
                      <td>{workshop.OrganizedBy || '-'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleEdit(workshop._id)} style={{ width: 'auto' }}>
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(workshop._id)} style={{ width: 'auto', backgroundColor: 'red', color: 'white' }}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">No workshops available</td>
                  </tr>
                )}
                {/* Self-Assessment Marks row */}
                <tr>
                  <td colSpan="5" className="text-right font-bold">Self-Assessment Marks (Max: 20):</td>
                  <td className="font-bold">{totalMarks}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayWorkshops;
