import { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS: any;
    disqus_config: any;
  }
}

const DisqusComments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ppdbsleman.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    
    // Add error handling for script loading
    script.onerror = () => {
      console.error('Error loading Disqus script');
    };

    // Configure Disqus
    window.disqus_config = function() {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        while (disqusThread.firstChild) {
          disqusThread.removeChild(disqusThread.firstChild);
        }
      }
      // Remove the script
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('ppdbsleman.disqus.com')) {
          scripts[i].remove();
        }
      }
      // Reset DISQUS if it exists
      if (window.DISQUS) {
        window.DISQUS.reset();
      }
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