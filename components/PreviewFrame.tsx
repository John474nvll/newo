
import React, { useEffect, useRef, useState } from 'react';

interface PreviewFrameProps {
  html: string;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ html }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [html]);

  return (
    <div className="w-full h-full bg-white relative flex flex-col group transition-all">
      {/* Browser Chrome Simulator */}
      <div className="h-8 bg-[#0f172a] border-b border-white/5 flex items-center px-4 gap-2 z-20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/10"></div>
        </div>
        <div className="mx-auto bg-slate-900 border border-white/5 rounded-lg h-5 px-10 flex items-center text-[8px] font-bold text-slate-600 uppercase tracking-widest truncate max-w-[300px]">
          https://builder-ai.neural/workspace-preview
        </div>
      </div>

      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          title="Website Preview"
          className={`w-full h-full border-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sandbox="allow-scripts allow-same-origin"
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewFrame;
