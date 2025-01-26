import { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS: any;
    disqus_config: any;
  }
}

const DisqusComments = () => {
  useEffect(() => {
    // Reset any existing Disqus instance
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
      });
      return;
    }

    // Configure Disqus
    window.disqus_config = function () {
      this.page.url = window.location.href; // Use the current page URL
      this.page.identifier = window.location.pathname; // Use unique identifier for the page
    };

    // Load Disqus script
    const script = document.createElement('script');
    script.src = 'https://ppdbsleman.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    script.crossOrigin = 'anonymous'; // Add cross-origin attribute

    // Error handling for script loading
    script.onload = () => {
      if (!window.DISQUS) {
        console.error('Disqus did not initialize properly. Check your configuration.');
      }
    };
    script.onerror = () => {
      console.error('Error loading Disqus script. Possible CORS issue or incorrect domain setup.');
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        disqusThread.remove();
      }

      const disqusScript = document.querySelector('script[src*="disqus.com/embed.js"]');
      if (disqusScript) {
        disqusScript.remove();
      }

      if (window.DISQUS) {
        delete window.DISQUS;
      }

      delete window.disqus_config;
    };
  }, []);

  return (
    <>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </>
  );
};

export default DisqusComments;
