import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadPDF: React.FC = () => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const title = 'CRM Dashboard Charts';
    const description = 'This PDF contains the charts from the CRM Dashboard project.';

    // Seleccionar los botones de "Edit Data"
    const buttons = document.querySelectorAll('.edit-data-button');

    // Guardar los estilos originales de los botones
    const originalStyles = Array.from(buttons).map(button => ({
      display: (button as HTMLElement).style.display,
    }));

    // Aplicar estilos para ocultar los botones
    buttons.forEach(button => {
      (button as HTMLElement).style.display = 'none'; // Ocultar los botones
    });

    doc.setFontSize(22);
    doc.text(title, 10, 10);
    doc.setFontSize(13);
    doc.text(description, 10, 20);

    // Capturar las imágenes de las gráficas
    const chartContainers = document.querySelectorAll('.chart-container');

    for (let i = 0; i < chartContainers.length; i++) {
      const container = chartContainers[i];
      const canvas = await html2canvas(container as HTMLElement);
      const imgData = canvas.toDataURL('image/png');

      // Agregar la imagen al PDF
      if (i > 0) {
        doc.addPage();
      }
      doc.addImage(imgData, 'PNG', 10, 30, 190, 0); // Ajusta el tamaño y posición según sea necesario
    }

    // Restaurar los estilos originales de los botones
    buttons.forEach((button, index) => {
      const originalStyle = originalStyles[index];
      (button as HTMLElement).style.display = originalStyle.display;
    });

    doc.save('charts.pdf');
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="w-2/3 md:w-52 2xl:w-52 px-4 py-2 bg-white text-blue-500 hover:bg-blue-200 hover:text-white dark:bg-teal-400 dark:hover:bg-teal-900 dark:hover:text-white dark:text-slate-800 rounded transition-colors duration-300"
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
