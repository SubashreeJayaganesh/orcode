import { useEffect } from "react";
import { useRef, useState } from "react";

const OrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setloading] = useState(false);
    const [qrData, setQrData] = useState("https://youtube.in/");
    const [qrSize, setQrSize] = useState("150");
    const currentURlComponent = useRef(window.location.href);

    useEffect(() => {
        currentURlComponent.current = window.location.href;
        console.log(currentURlComponent.current)
    }, [currentURlComponent]);

    function currentOR() {
        currentURlComponent.current = window.location.href;
        setQrData(currentURlComponent.current);
        generateQr();
        

    }


    async function generateQr() {
        setloading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);

        } catch (error) {
            console.error("Error generating OR code", error);
        } finally {
            setloading(false);
        }
    }
    function downloadOR() {
        fetch(img)
            .then((Response) => Response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading OR code", error);
            });

    }
    return (
        <div className="app-container">
            <h1>OR CODE GENERATOR</h1>
            {loading && <p>Please wait..</p>}
            {img && <img src={img} className="image" />}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Data for Or code:
                </label>
                <input type="text" id="dataInput" value={qrData} onChange={(e) => setQrData(e.target.value)} placeholder="Enter data for OR code" />
                <label htmlFor="sizeInput" className="input-label">
                    Image size(e.g., 150);
                </label>
                <input type="text" id="sizeInput" value={qrSize} onChange={(e) => setQrSize(e.target.value)} placeholder="Enter image size" />
                <button className="generate-button" disabled={loading} onClick={generateQr}>Generate OR Code</button>
                <button className="download-button" onClick={downloadOR}>Download OR Code</button>
                <button className="download-button" onClick={currentOR} value={qrData}>Current OR Code</button>
                {/* <p >{currentURlComponent.current}</p> */}
            </div>

        </div>
    )
}

export default OrCode
