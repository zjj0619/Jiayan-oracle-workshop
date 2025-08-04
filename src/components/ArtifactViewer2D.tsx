import React from 'react';

interface ArtifactViewer2DProps {
  imageUrl: string;
  altText: string;
}

const ArtifactViewer2D: React.FC<ArtifactViewer2DProps> = ({ imageUrl, altText }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-oracle-brown/10 to-bronze-blue/10 flex items-center justify-center rounded-lg overflow-hidden">
      <img src={imageUrl} alt={altText} className="w-full h-full object-contain" />
    </div>
  );
};

export default ArtifactViewer2D;