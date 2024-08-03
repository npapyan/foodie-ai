import { useRef, useState, useEffect } from 'react';
import Button from "@/app/components/Common/Button";
import { CircularProgress } from "@mui/material";

export default function Camera({ apiPath, onData, onClick, scanText }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const constraints = { video: { facingMode: "environment" } };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraOn(true);
                }
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        } else {
            console.error("getUserMedia not supported");
        }
    };

    const onScanClick = () => {
        setIsCameraOn(true);
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    useEffect(() => {
        if (isCameraOn && videoRef.current) {
            startCamera();
        }
        return () => stopCamera();
    }, [isCameraOn]);

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');
            setCapturedImage(imageData);
            stopCamera();
        }
    };

    const handleUsePhoto = async () => {
        setLoading(true);
        try {
            const base64Image = capturedImage.split(',')[1];
            const jsonBase64Image = JSON.stringify({ image: base64Image });
            const response = await fetch(apiPath, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonBase64Image,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Network response was not ok.');
            const parsedData = JSON.parse(data.result.candidates[0].content.parts[0].text)
            onData(parsedData);
        } catch (error) {
            console.error("Error sending image:", error);
        } finally {
            setLoading(false);
            setCapturedImage(null);
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setIsCameraOn(true);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {capturedImage ? (
                            <div>
                                <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
                                <div className="flex justify-center space-x-4 mt-4 pb-4">
                                    <Button buttonText="Retake" onClick={handleRetake} />
                                    <Button buttonText="Analyze" onClick={handleUsePhoto} />
                                </div>
                            </div>
                        ) : (
                            <div className="p-5">
                                {isCameraOn ? (
                                    <div>
                                        <video ref={videoRef} autoPlay playsInline></video>
                                        <div className="flex justify-center space-x-4 mt-4 pb-4">
                                            <Button buttonText="Stop" onClick={stopCamera} />
                                            <Button buttonText="Capture" onClick={takePicture} />
                                        </div>
                                    </div>
                                ) : (
                                    <Button buttonText={scanText} onClick={onScanClick} />
                                )}
                            </div>
                        )}
                    </>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
        </div>
    );
}
