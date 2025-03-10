import React from 'react';
import ClassInfo from './ClassInfo';
import ResearchText from './ResearchText';
import Navbar from './Navbar';
import Others from './Others';
import Workshops from './Workshops';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';

const DisplayAll = () => {

  const downloadPDF = () => {
    const input = document.getElementById('contentToDownload');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const currentDate = new Date().toISOString().split('T')[0];
      pdf.save(`report_${currentDate}.pdf`);
    });
  };

  return (
    <>
      <div id="contentToDownload">
        <Navbar />
        <div>
          <h1 style={{ padding: '15px', marginTop: '30px', fontFamily: 'YourFontFamily' }}>PART B: Performance Attributes </h1>

        </div>
        <div className='flex justify-end'>
          <button onClick={downloadPDF} style={{ width: 'auto', margin: '20px', padding: '10px', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <FaDownload style={{ marginRight: '8px' }} /> Report
          </button>
        </div>
        <ClassInfo />
        <div style={{ margin: '20px 0' }} />
        <ResearchText />
        <Workshops />
        <div style={{ margin: '20px 0' }} />
        <Others />
      </div>

    </>
  );
};

export default DisplayAll;