import { useState } from 'react';

const WebViewer = () => {
  const [url, setUrl] = useState<string>('https://docs.google.com/document/d/0B1FctSuhAmqfWWJ3X3Y3R2p6b28/edit?resourcekey=0-LeaK-G_nTmbp3dW9kB0Pzw');

  return (
    <>
      {!url && (
        <>
          <h3>porfavor indica donde quieres ir</h3>
        </>
      )}
      {url && (
        <iframe
          src={url}
          width="100%"
          style={{height:"87vh"}}
        />
      )}
    </>
  );
};

export default WebViewer;
