import { useEffect, useRef } from 'react';

const CusdisComments = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src="https://cusdis.com/js/cusdis.es.js"]')) {
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cusdis.com/js/cusdis.es.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    // Store reference to script
    scriptRef.current = script;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script if it exists and was added by this component
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div className="mt-8">
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
      <h2 className="text-xl font-semibold mb-4">Komentar:</h2>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="e048e64e-1b6a-4db2-a0b8-fcd6ef3fc325"
        data-page-id={window.location.pathname}
        data-page-url={window.location.href}
        data-page-title={document.title}
      ></div>
    </div>
  );
};

export default CusdisComments;