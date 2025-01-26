import { useEffect } from 'react';


const DisqusComments = () => {
  useEffect(() => {
    // Load Cusdis script
    const script = document.createElement('script');
    script.src = 'https://cusdis.com/js/cusdis.es.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script
      script.remove();

      // Optional: remove the div container if needed
      const cusdisThread = document.getElementById('cusdis_thread');
      if (cusdisThread) {
        cusdisThread.remove();
      }
    };
  }, []);

  return (
    <div
      id="cusdis_thread"
      data-host="https://cusdis.com"
      data-app-id="e048e64e-1b6a-4db2-a0b8-fcd6ef3fc325"
      data-page-id={window.location.pathname}
      data-page-url={window.location.href}
      data-page-title={document.title}
    ></div>
  );
};

export default DisqusComments;

