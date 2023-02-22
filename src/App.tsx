import { FormEvent, useRef, useState } from "react";

import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (e: FormEvent) => {
    e.preventDefault();
    let canvas = qrRef?.current?.querySelector("canvas");
    let image = canvas!.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrcode = (
    <QRCodeCanvas
      value={"https://github.com/BlankRiser"}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
    />
  );

  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL"
          />
          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
