import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Others = ({ data: propsData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!propsData);
  const [activities, setActivities] = useState(propsData?.Activities || []);
  const [responsibilities, setResponsibilities] = useState(propsData?.Responsibilities || []);
  const [contribution, setContribution] = useState(propsData?.Contribution || []);
  const [awards, setAwards] = useState(propsData?.Awards || []);
  const [activityMarks, setActivityMarks] = useState(propsData?.ActivityMarks || 0);
  const [responsibilityMarks, setResponsibilityMarks] = useState(propsData?.ResponsibilityMarks || 0);
  const [contributionMarks, setContributionMarks] = useState(propsData?.ContributionMarks || 0);

  useEffect(() => {
    if (!propsData) {
      const fetchAll = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/others/data', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setActivities(data.Activities);
            setResponsibilities(data.Responsibilities);
            setContribution(data.Contribution);
            setAwards(data.Awards);
            setActivityMarks(data.ActivityMarks);
            setResponsibilityMarks(data.ResponsibilityMarks);
            setContributionMarks(data.ContributionMarks);
          } else {
            console.error('Error fetching Data');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAll();
    }
  }, [propsData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {/** Activities Table **/}
      <div className="mb-6 relative">
        <h2 className="font-bold text-base">
          6. Outreach Activities - (Resource Person/Session Chairs/Invited Talks/Guest Lecture / National / International Collaboration etc.) (1 activity outside AUS – 5 marks)
        </h2>
        <div className="flex justify-end items-center mb-2 gap-2">
          <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8">Upload</button>
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8" onClick={() => navigate('/addactivity')}>
            + Add
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center" style={{ width: '400px' }}>
                S.NO
              </th>
              <th className="border p-2 text-center">Activity Details</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((act, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">{act.activityDetails}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="2">
                  No data found..
                </td>
              </tr>
            )}
            <tr>
              <td className="p-2 border text-center font-bold" colSpan="1">
                Self-Assessment Marks (Max: 10)
              </td>
              <td className="p-2 border text-center font-bold">{activityMarks}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/** Responsibilities Table **/}
      <div className="mb-6 relative">
        <h2 className="font-bold text-base">
          7. Additional responsibilities in the Department / College: (College activity/Committee Convenor: 10, Committee member/Dept. Incharge – 5 marks)
        </h2>
        <div className="flex justify-end items-center mb-2 gap-2">
          <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8">Upload</button>
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8" onClick={() => navigate('/addresponsibility')}>
            + Add
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center" style={{ width: '80px' }}>
                S.NO
              </th>
              <th className="border p-2 text-center">Responsibility</th>
              <th className="border p-2 text-center">Assigned By</th>
            </tr>
          </thead>
          <tbody>
            {responsibilities.length > 0 ? (
              responsibilities.map((res, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">{res.Responsibility}</td>
                  <td className="p-2 border text-center">{res.assignedBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="3">
                  No data found..
                </td>
              </tr>
            )}
            <tr>
              <td className="p-2 border text-center font-bold" colSpan="2">
                Self-Assessment Marks (Max: 10)
              </td>
              <td className="p-2 border text-center font-bold">{responsibilityMarks}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/** Contributions Table **/}
      <div className="mb-6 relative">
        <h2 className="font-bold text-base">
          8. Any special contribution to the Department/College which leverage the existing process/System. (Innovation in Teaching / Technology Development / Taking GATE classes / e-content preparation / guiding students for Hackathons / Consultancy / Preparing students for Project challenges / Community Service etc. – Each activity 5 marks)
        </h2>
        <div className="flex justify-end items-center mb-2 gap-2">
          <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8">Upload</button>
          <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8" onClick={() => navigate('/addcontribution')}>
            + Add
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center" style={{ width: '80px' }}>
                S.NO
              </th>
              <th className="border p-2 text-center">Contribution Details</th>
              <th className="border p-2 text-center">Benefit to College/Department</th>
            </tr>
          </thead>
          <tbody>
            {contribution.length > 0 ? (
              contribution.map((cont, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">{cont.contributionDetails}</td>
                  <td className="p-2 border text-center">{cont.Benefit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="3">
                  No data found..
                </td>
              </tr>
            )}
            <tr>
              <td className="p-2 border text-center font-bold" colSpan="2">
                Self-Assessment Marks (Max: 10)
              </td>
              <td className="p-2 border text-center font-bold">{contributionMarks}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/** Awards Table **/}
      <div className="mb-6 relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-base">9. Awards received by Faculty:</h2>
          <div className="flex items-center gap-2">
            <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
            <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8">Upload</button>
            <button className="p-1 bg-blue-500 text-white rounded text-sm w-24 h-8" onClick={() => navigate('/addaward')}>
              + Add
            </button>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center" style={{ width: '80px' }}>
                S.NO
              </th>
              <th className="border p-2 text-center">Award Name</th>
              <th className="border p-2 text-center">Awarded By</th>
              <th className="border p-2 text-center">Level</th>
              <th className="border p-2 text-center">Description</th>
              <th className="border p-2 text-center">Upload</th>
            </tr>
          </thead>
          <tbody>
            {awards.length > 0 ? (
              awards.map((award, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">{award.awardName}</td>
                  <td className="p-2 border text-center">{award.awardedBy}</td>
                  <td className="p-2 border text-center">{award.level}</td>
                  <td className="p-2 border text-center">{award.description}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="5">
                  No data found..
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Others;
