import React, { useRef } from 'react';
import { FiPhone } from 'react-icons/fi';
import players from './players';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PlayerPdf = () => {
  const pdfRef = useRef();
const waitForImagesToLoad = (element) => {
  const images = element.querySelectorAll('img');
  return Promise.all(
    Array.from(images).map((img) => {
      if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    })
  );
};

 const downloadPDF = async () => {
  const input = pdfRef.current;

  await waitForImagesToLoad(input);
  await new Promise((res) => setTimeout(res, 500)); // Optional wait

  const canvas = await html2canvas(input, {
  scale: 3,
  useCORS: true,
  scrollY: -window.scrollY
});

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  while (heightLeft > 0) {
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    position -= pdfHeight;

    if (heightLeft > 0) {
      pdf.addPage();
    }
  }

  pdf.save('players.pdf');
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      

      <div
        ref={pdfRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {players.map((player, index) => {
          const idMatch =
            player.photo.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
            player.photo.match(/\/d\/([a-zA-Z0-9_-]+)/);
// const url = `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;

          const url = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w400`

          return (
            <div
              key={index}
              className="rounded-3xl shadow-xl overflow-hidden bg-white"
            >
              <div className="flex items-center justify-center pt-6 relative rounded-t-2xl">
                <img
                  src={url}
                  alt={player.name}
                  crossOrigin="anonymous"
                  className="w-40 h-40 object-cover rounded-full border-4 border-black shadow-lg"
                />
              </div>

              <div
                className="p-6 text-center flex flex-col gap-4 items-center"
                style={{ backgroundColor: 'rgb(8, 145, 178)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-1">
                  Name: {player.name}
                </h3>
                <p className="text-xl text-white font-bold mb-1">
                  Position: {player.playing_Role}
                </p>
                <p className="text-xl font-bold text-white mb-4">
                  Club: {player.club}
                </p>
                <div className="flex justify-center space-x-4 mb-2 text-white text-xl font-bold">
                  <div className="flex items-center">
                    <FiPhone className="mr-2" />
                    <span>{player.phone_Number}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={downloadPDF}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PlayerPdf; 
