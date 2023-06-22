import { useState } from 'react';

const WebViewer = () => {
  const [url, setUrl] = useState<string>('https://docs.google.com/document/d/1LvteW--LvV5B52u06nnd1NxqPFJRLHkoX1O0Qo4BbaI/edit#toolbar=0');

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
