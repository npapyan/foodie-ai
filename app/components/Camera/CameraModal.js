// components/CameraModal.js
import { useRef, useState, useEffect } from 'react';
import Button from "@/app/components/Common/Button";
import { CircularProgress } from "@mui/material";

export default function CameraModal({ onCapture, onClose }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const constraints = {
                    video: { facingMode: "environment" }
                };
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

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

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

    const handleUsePhoto = () => {
        onCapture(capturedImage);
        setCapturedImage(null);
        setLoading(false);
        onClose();
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setIsCameraOn(true);
        startCamera();
    };

    return (
        <div className="camera-modal">
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
                                    <Button buttonText="Use Photo" onClick={handleUsePhoto} />
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
                                    <Button buttonText="Start Camera" onClick={startCamera} />
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
