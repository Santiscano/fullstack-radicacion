import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import { saveAs } from 'file-saver';
import { dividerURL } from "../../Utilities/formatted.utility";

const QRCodeComponent = () => {
  const [value, setValue] = useState<string>("");
  const [isQR, setIsQR] = useState(false);
  const qrCodeRef = useRef(null);

  const handleCreateQR = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsQR(true);
  };

  const handleNewQR = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsQR(false);
    setValue("");
  };

  const handleDownLoadQR = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    saveAs(value, `image.jpg`);
  };

  const handleDownLoadQR2 = (e:any) => {
    const canvas = qrCodeRef.current;
// @ts-ignore
    const blob = new Blob(canvas, { type: 'image/svg+xml' });
    const downloadLink = document.createElement('a');
    console.log('downloadLink: ', downloadLink);
    // console.log('blob: ', blob);
    // const canvas = qrCodeRef.current
    // const pngUrl = canvas.toDataURL('image/png');

    // const downloadLink = document.createElement('a');
    // downloadLink.href = pngUrl;
    // downloadLink.download = 'qrcode.png';
    // downloadLink.click();
    // console.log('aqui llego')
  };
  const handleDowndLoadQR3 = (e:any) => {
    e.preventDefault();
    const canvas = qrCodeRef.current;
    console.log('canvas: ', canvas);
    if (canvas) {
      // @ts-ignore
      const dataURL = canvas.toDataURL('image/png');
      const blob = dataURLtoBlob(dataURL);
      saveAs(blob, 'qr.png');
    }
  };
  const handleDowndLoadQR4 = (e:any) => {
    e.preventDefault();
    const canvas = qrCodeRef.current;
    // @ts-ignore
    const svgString = new XMLSerializer().serializeToString(canvas);
    console.log('svgString: ', svgString);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const name = dividerURL(value);
    console.log('name: ', name);
    saveAs(blob, `${name}.svg`);
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };



  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {!isQR && (
          <form className="w-[75%]">
            <div className="mb-1">
              <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                Ingrese la URL para generar el codigo QR
              </label>
              <TextFieldOutlined
                type={"text"}
                label={"Ingrese URL"}
                value={value}
                setValue={setValue}
                required
              />
            </div>
            <div className="w-full grid place-items-center">
              <button
                onClick={handleCreateQR}
                className="p-4 mb-6 bg-blue-800 text-white rounded cursor-pointer"
              >
                {" "}
                Generar nuevo radicado
              </button>
            </div>
          </form>
        )}

        {isQR && (
          <>
            <button
              className="p-4 mb-6  bg-blue-800 text-white rounded cursor-pointer"
              onClick={handleNewQR}
            >
              Crear Otro QR
            </button>
            <QRCode
              size={256}
              style={{ height: "450px", width: "450px" }}
              value={value}
              viewBox={`0 0 256 256`}
              ref={qrCodeRef}
              id="my-qr"
            />
            <h3>{value}</h3>
            <button
              onClick={handleDowndLoadQR4}
              className="p-4 mt-4  bg-green-600 text-white rounded cursor-pointer"
            >
              {" "}
              Descargar QR
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default QRCodeComponent;
