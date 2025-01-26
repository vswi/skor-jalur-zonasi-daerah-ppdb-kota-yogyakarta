import { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS: any;
  }
}

const DisqusComments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ppdbsleman.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(+new Date()));
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        while (disqusThread.firstChild) {
          disqusThread.removeChild(disqusThread.firstChild);
        }
      }
      script.remove();
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