import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, RotateCcw, Check, ArrowLeft, ArrowRight } from "lucide-react";

interface CameraCaptureProps {
  onComplete: (photos: { front: string; side: string }) => void;
  onBack: () => void;
}

type CaptureStep = "front" | "side";

const CameraCapture = ({ onComplete, onBack }: CameraCaptureProps) => {
  const [step, setStep] = useState<CaptureStep>("front");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [sidePhoto, setSidePhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle viewport resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Start camera when needed
  useEffect(() => {
    const shouldStartCamera = 
      (step === "front" && !frontPhoto && !stream) || 
      (step === "side" && !sidePhoto && !stream);
    
    if (shouldStartCamera) {
      startCamera();
    }
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (e) {
            console.error("Error stopping track:", e);
          }
        });
      }
    };
  }, [step, frontPhoto, sidePhoto, stream]);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setIsVideoReady(false);
      
      // Stop existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }
      
      // Request camera with optimal settings
      const constraints = {
        video: { 
          facingMode: "user",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false
      };
      
      let mediaStream: MediaStream;
      
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (initialError) {
        console.warn("Failed with ideal settings, trying basic:", initialError);
        // Fallback to basic video
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      
      setStream(mediaStream);
      
    } catch (error: any) {
      console.error("Error accessing camera:", error);
      
      // Clear stream on error
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      // Set user-friendly error messages
      let message = "Unable to access camera. ";
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        message = "Camera access denied. Please allow camera access in your browser settings and refresh the page.";
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        message = "No camera detected. Please connect a camera and try again.";
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        message = "Camera is being used by another application. Please close other apps using your camera.";
      } else if (error.message) {
        message += error.message;
      } else {
        message += "Please check your camera permissions and try again.";
      }
      
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [stream]);

  // Prepare the video element once a stream is available
  useEffect(() => {
    let cancelled = false;
    const prepareVideo = async () => {
      if (!stream) return;
      try {
        setIsVideoReady(false);
        setErrorMessage(null);

        // Wait for the video element to mount after stream triggers re-render
        const waitForVideoElement = async (): Promise<HTMLVideoElement> => {
          if (videoRef.current) return videoRef.current;
          await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
          return waitForVideoElement();
        };

        const video = await waitForVideoElement();
        if (cancelled) return;

        video.srcObject = stream;

        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Video load timeout"));
          }, 10000);

          video.onloadedmetadata = () => {
            clearTimeout(timeout);
            video.play()
              .then(() => resolve())
              .catch((err) => reject(err));
          };

          video.onerror = () => {
            clearTimeout(timeout);
            reject(new Error("Video error occurred"));
          };
        });

        if (!cancelled) {
          console.log("Video playing successfully");
          setIsVideoReady(true);
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error("Error preparing video element:", e);
          setErrorMessage(e?.message || "Unable to start camera preview.");
          setIsVideoReady(false);
        }
      }
    };

    prepareVideo();

    return () => {
      cancelled = true;
      if (videoRef.current) {
        videoRef.current.onloadedmetadata = null;
        videoRef.current.onerror = null;
      }
    };
  }, [stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.error("Error stopping track:", e);
        }
      });
      setStream(null);
    }
    setIsVideoReady(false);
    
    // Clear video srcObject
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas reference not available");
      setErrorMessage("Camera error: Could not capture photo. Please try again.");
      return;
    }
    
    if (!isVideoReady) {
      setErrorMessage("Camera not ready. Please wait a moment.");
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Check if video is playing and has dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error("Video dimensions are zero");
        setErrorMessage("Camera error: Video stream not ready. Please wait and try again.");
        return;
      }
      
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Could not get canvas context");
        setErrorMessage("Browser error: Canvas not supported. Please try a different browser.");
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to JPEG with quality setting
      const photoData = canvas.toDataURL("image/jpeg", 0.85);

      // Validate captured data
      if (photoData.length < 100 || photoData === 'data:,') {
        console.error("Invalid photo capture, data length:", photoData.length);
        setErrorMessage("Failed to capture photo. Please try again.");
        return;
      }

      console.log("Photo captured successfully, size:", Math.round(photoData.length / 1024), "KB");
      
      // Save the captured photo
      if (step === "front") {
        setFrontPhoto(photoData);
        console.log("Front photo saved");
      } else {
        setSidePhoto(photoData);
        console.log("Side photo saved");
      }

      // Stop the camera after successful capture
      stopCamera();
    } catch (error) {
      console.error("Error during photo capture:", error);
      setErrorMessage("Failed to capture photo. Please try again.");
    }
  }, [step, isVideoReady, stopCamera]);

  const retakePhoto = useCallback(() => {
    // Clear current photo
    if (step === "front") {
      setFrontPhoto(null);
    } else {
      setSidePhoto(null);
    }
    
    setErrorMessage(null);
    setIsVideoReady(false);
    
    // Small delay before restarting camera
    setTimeout(() => {
      startCamera();
    }, 100);
  }, [step, startCamera]);

  const handleNext = () => {
    if (step === "front" && frontPhoto) {
      stopCamera();
      setStep("side");
    } else if (frontPhoto && sidePhoto) {
      console.log("Completing with photos");
      stopCamera();
      onComplete({ front: frontPhoto, side: sidePhoto });
    }
  };

  const handleBack = () => {
    stopCamera();
    if (step === "side") {
      setStep("front");
    } else {
      onBack();
    }
  };

  const currentPhoto = step === "front" ? frontPhoto : sidePhoto;
  const progress = step === "front" ? 50 : 100;
  const photoLabel = step === "front" ? "Front" : "Side";

  // Debug logging
  useEffect(() => {
    console.log("Component state:", {
      step,
      hasStream: !!stream,
      frontPhoto: !!frontPhoto,
      sidePhoto: !!sidePhoto,
      isLoading,
      isVideoReady,
      hasError: !!errorMessage
    });
  }, [step, stream, frontPhoto, sidePhoto, isLoading, isVideoReady, errorMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-4 sm:px-6 sm:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <Card className="max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full p-3 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-8 lg:space-y-10 bg-white shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-1 sm:space-y-2 lg:space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Take Your {photoLabel} Photo
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {step === "front" 
              ? "Position your face in the frame and capture a clear front photo" 
              : "Now turn slightly to the side and capture your side profile"}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm lg:text-base text-gray-600">
            <span>Photo {step === "front" ? "1" : "2"} of 2</span>
            <span>{progress}% complete</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
        </div>

        {/* Camera/Photo Display */}
        {!currentPhoto ? (
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[4/5] sm:aspect-video border-2 sm:border-4 border-gray-200 shadow-xl">
            {/* Error State */}
            {errorMessage && (
              <div className="absolute inset-0 flex items-center justify-center flex-col p-3 sm:p-6 bg-gray-900 bg-opacity-95 z-10">
                <div className="bg-red-100 border-2 border-red-500 rounded-lg p-3 sm:p-6 max-w-md">
                  <p className="text-red-700 text-center mb-3 sm:mb-4 text-sm sm:text-base font-medium">{errorMessage}</p>
                  <Button 
                    onClick={startCamera} 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Try Again
                  </Button>
                </div>
              </div>
            )}
            
            {/* No Stream - Start Button */}
            {!stream && !isLoading && !errorMessage && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <Button 
                  onClick={startCamera} 
                  size="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-lg px-6 sm:px-12 py-3 sm:py-6"
                >
                  <Camera className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" /> Start Camera
                </Button>
              </div>
            )}
            
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-b-4 border-white mx-auto mb-3 sm:mb-4"></div>
                  <p className="text-white text-sm sm:text-lg">Starting camera...</p>
                </div>
              </div>
            )}

            {/* Video Stream */}
            {stream && !errorMessage && (
              <div className="relative h-full">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover" 
                  style={{ transform: 'scaleX(-1)' }} // Mirror effect
                />
                
                {/* Face Guide Overlay - Smaller on mobile */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 sm:border-4 border-dashed border-white opacity-50 rounded-full w-48 h-56 sm:w-64 sm:h-80"></div>
                </div>
                
                {/* Capture Button - Smaller on mobile */}
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 px-2 sm:px-4">
                  <Button
                    onClick={capturePhoto}
                    size="default"
                    disabled={!isVideoReady}
                    className="bg-white text-purple-600 hover:bg-gray-100 px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-bold shadow-xl sm:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVideoReady ? (
                      <>
                        <Camera className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" /> Capture Photo
                      </>
                    ) : (
                      <>Loading camera...</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Photo Preview
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/5] sm:aspect-video border-2 sm:border-4 border-green-500 shadow-xl">
            <img 
              src={currentPhoto} 
              alt={`${photoLabel} photo`} 
              className="w-full h-full object-cover" 
              style={{ transform: 'scaleX(-1)' }} // Mirror effect for consistency
              onError={(e) => {
                console.error("Error loading photo:", e);
                setErrorMessage("Error displaying captured photo. Please retake.");
              }}
            />
            
            {/* Success Badge - Smaller on mobile */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg">
              <Check className="w-3 h-3 sm:w-5 sm:h-5" /> Photo Captured!
            </div>
            
            {/* Retake Button - Smaller on mobile */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 px-2 sm:px-4">
              <Button 
                onClick={retakePhoto} 
                variant="outline" 
                className="bg-white hover:bg-gray-100 border-2 border-gray-300 px-3 sm:px-5 md:px-6 py-2 sm:py-3 text-xs sm:text-sm shadow-lg"
              >
                <RotateCcw className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Retake Photo
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 lg:p-5 rounded text-xs sm:text-sm lg:text-base">
          <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 lg:mb-3">📸 Photo Tips:</h4>
          <ul className="text-blue-800 space-y-0.5 sm:space-y-1 lg:space-y-2">
            <li>• Make sure you're in a well-lit area</li>
            <li>• Position your face clearly within the guide</li>
            <li>• Remove glasses or accessories if possible</li>
            <li>• Keep your face neutral and relaxed</li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 lg:gap-6 pt-2 sm:pt-4 lg:pt-6">
          <Button 
            onClick={handleBack} 
            variant="outline" 
            size="default"
            className="w-full sm:w-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 border-2 text-sm sm:text-base lg:text-lg"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            {step === "front" ? "Back to Questions" : "Previous Photo"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!currentPhoto}
            size="default"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === "front" ? (
              <>
                Next Photo <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </>
            ) : (
              <>
                Get My Results <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Card>
    </div>
  );
};

export default CameraCapture;