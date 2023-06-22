import { useState } from 'react';

const BusinessGroup = () => {
  const [url, setUrl] = useState<string>('https://storage.googleapis.com/digitalizacion-enviexpress-bucket/grupoEmpresarial/solucionesEnviexpress/misionVisionPolitica.pdf#toolbar=0');

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
          style={{height:"100vh"}}
        />
      )}
    </>
  );
}

export default BusinessGroup
