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
        reload: true
      });
      return;
    }

    // Configure Disqus
    window.disqus_config = function() {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
      this.callbacks = {
        onReady: () => {
          console.log('Disqus is ready');
        },
        onError: () => {
          console.error('Disqus failed to load');
        }
      };
    };

    // Load Disqus script
    const script = document.createElement('script');
    script.src = 'https://ppdbsleman.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(+new Date()));
    script.async = true;
    
    // Add error handling for script loading
    script.onerror = () => {
      console.error('Error loading Disqus script');
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
      script.remove();

      // Reset DISQUS if it exists
      if (window.DISQUS) {
        window.DISQUS.reset();
      }

      // Clean up the config
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