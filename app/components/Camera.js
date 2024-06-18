import { useRef, useState, useEffect } from 'react';
import Button from "@/app/components/Camera/Button";
import NutritionDetails from "@/app/components/NutritionDetails";

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // State to hold the captured image
    const [serverResponse, setServerResponse] = useState(null);

    const startCamera = async () => {
        // Check if getUserMedia is supported
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                // Specify the video constraints, preferring the back camera
                const constraints = {
                    video: { facingMode: "environment" } // This attempts to use the back camera
                };

                // Get the video stream using the specified constraints
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                // If a video element is available, assign the stream to it
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
            setCapturedImage(imageData); // Save the image data in state
            stopCamera(); // Optionally stop the camera
        }
    };

    const handleUsePhoto = async () => {
        await sendImageToServer(capturedImage);
        setCapturedImage(null); // Clear the captured image after sending
    };

    const handleRetake = () => {
        setCapturedImage(null); // Clear the captured image
        setIsCameraOn(true); // Restart the camera
    };

    const sendImageToServer = async (imageData) => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            });
            const data = await response.json(); // Parse JSON response
            if (!response.ok) throw new Error(data.message || 'Network response was not ok.');
            setServerResponse(JSON.parse(data.result.candidates[0].content.parts[0].text));
        } catch (error) {
            console.error("Error sending image:", error);
        }
    };

    return (
        <div>
            {!isCameraOn ? (
                <div className="py-8 flex flex-col items-center text-center">
                    <p>Food is more than just fuel.</p>
                    <p>It plays a crucial role in how we feel throughout the day.</p>
                    <p>Take a moment to explore the substances you are putting into your body.</p>
                    <p>Start by clicking the button below to open your camera and snap a photo of a nutrition facts
                        label.</p>
                </div>
            ) : (
                <div>

                </div>
            )}
            <div className="flex flex-col items-center justify-center">
                {serverResponse && (
                    <NutritionDetails data={serverResponse} />
                )}
                {capturedImage ? (
                    <div>
                        <img src={capturedImage} alt="Captured" style={{maxWidth: '100%'}}/>
                        <div className="flex justify-center space-x-4 mt-4">
                            <Button buttonText="Use Photo" onClick={handleUsePhoto}></Button>
                            <Button buttonText="Retake" onClick={handleRetake}></Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {isCameraOn ? (
                            <div>
                                <video ref={videoRef} autoPlay playsInline></video>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <Button buttonText="Take Picture" onClick={takePicture}></Button>
                                    <Button buttonText="Stop Camera" onClick={stopCamera}></Button>
                                </div>
                            </div>
                        ) : (
                            <Button buttonText="Start Camera" onClick={() => setIsCameraOn(true)}></Button>
                        )}
                    </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
        </div>
    );
}
