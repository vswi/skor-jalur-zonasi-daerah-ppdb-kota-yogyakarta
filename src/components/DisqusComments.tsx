import { useEffect } from 'react';

const DisqusComments = () => {
  useEffect(() => {
    // Load Cusdis script
    const script = document.createElement('script');
    script.src = 'https://cusdis.com/js/cusdis.es.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script
      script.remove();
    };
  }, []);

  return (
    <>
      <style>
        {`
          #cusdis_thread iframe {
            width: 100% !important;
            min-height: 600px !important;
            height: auto !important;
            border: none;
            overflow: hidden;
          }
        `}
      </style>
      <h2>Komentar:</h2>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="e048e64e-1b6a-4db2-a0b8-fcd6ef3fc325"
        data-page-id={window.location.pathname}
        data-page-url={window.location.href}
        data-page-title={document.title}
      ></div>
    </>
  );
};

export default DisqusComments;