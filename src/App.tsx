import { FormEvent, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import "./App.css";

function App() {
  const [url, setUrl] = useState("https://github.com/BlankRiser");

  const [image, setImage] = useState(
    "https://ram.codes/static/favicons/apple-touch-icon.png"
  );

  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (e: FormEvent) => {
    e.preventDefault();
    if (qrRef.current === null) return;
    let canvas = qrRef.current.querySelector("canvas");
    if (canvas === null) return;
    // let image = canvas.toDataURL("image/png");
    let image = canvas.toDataURL();
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `QR-Code.png`;
    anchor.href = image;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>
        <QRCodeCanvas
          value={"https://ram.codes/static/favicons/apple-touch-icon.png"}
          size={128}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
          // imageSettings={{
          //   src: image,
          //   // x: undefined,
          //   // y: undefined,
          //   height: 24,
          //   width: 24,
          //   excavate: true,
          // }}
        />
      </div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL"
          />
          {/* <label>Enter Image Url</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter a URL"
          /> */}

          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
