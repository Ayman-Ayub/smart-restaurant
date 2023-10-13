import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/qrcode.css"
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const QrCodeReader = ({value}) => {

  const [url, setUrl] = useState("");
  const [number, setNumber] = useState(0);
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const PrintQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };
  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };
  const numbers=[
2000,
4000, 
1000, 2999,
3000, 4000, 34343,3434356,23232,5654,232
  ]
 
  

  useEffect(() => {
   
   
    
  }, []);
  console.log(number)
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={"https://www.youtube.com/watch?v=7Ntot5ClGIY&ab_channel=HeartOfProgramming"}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container justify-center w-full h-screen -pt-40  bg-primary">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        {/* <form onSubmit={downloadQRCode}> */}
         {/* <input value={url} onChange={qrCodeEncoder}/> */}
          <button type="submit" disabled={!number} onClick={downloadQRCode}>
            Download QR code
          </button>
          <ReactToPrint content={() => qrRef.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <button onClick={handlePrint}>Print this out!</button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>

       
      
      </div>
    </div>
  );
};

export default QrCodeReader;