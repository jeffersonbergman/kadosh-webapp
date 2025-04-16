
import React from 'react';

interface LyricsPreviewProps {
  content: string;
}

export const LyricsPreview: React.FC<LyricsPreviewProps> = ({ content }) => {
  // Format the content to highlight chords
  const formatContent = () => {
    const lines = content.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Check if line mostly contains chords
      const words = line.trim().split(/\s+/);
      const isChordLine = words.some(word => /^[A-G][#b]?(m|maj|min|M|aug|dim|sus[24]|add\d+|7|9|11|13|6|5|-5|\+5|°|ø|Δ)?([\/][A-G][#b]?)?$/.test(word));
      
      if (isChordLine) {
        return (
          <div key={lineIndex} className="text-church-primary font-bold mb-0">
            {line}
          </div>
        );
      }
      
      // If it's a section marker (e.g. [Verse], [Chorus])
      if (line.match(/^\[(Verse|Chorus|Bridge|Intro|Outro|Pre-Chorus|Interlude|Solo)[0-9]?\]$/i)) {
        return (
          <div key={lineIndex} className="text-gray-600 font-semibold uppercase text-sm mt-4 mb-2">
            {line.replace(/[\[\]]/g, '')}
          </div>
        );
      }
      
      // Regular lyrics line
      return (
        <div key={lineIndex} className="mb-1">
          {line || '\u00A0'}
        </div>
      );
    });
  };
  
  return (
    <div className="font-mono whitespace-pre-wrap text-sm">
      {formatContent()}
    </div>
  );
};
