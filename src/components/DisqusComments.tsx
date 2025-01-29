import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = () => {
  const disqusShortname = 'ppdb-sleman';
  const disqusConfig = {
    url: window.location.href.replace('://', '/'),
    identifier: '1',
    title: 'Kalkulator Simulasi Skor PPDB SMP Negeri Sleman',
  };

  return (
    <div className="mt-8">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;