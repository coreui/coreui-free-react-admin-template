export const addPrintStyles = () => {
  const styleId = 'map-print-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .map-container, .map-container * {
          visibility: visible;
        }
        .map-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .print-hide {
          display: none !important;
        }
        .ol-control {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

