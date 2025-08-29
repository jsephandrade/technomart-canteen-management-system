import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { UserPlus, Camera, CheckCircle, XCircle, ArrowLeft, RefreshCw, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/auth/Header';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';

const FaceRegistrationPage = () => {
  const [step, setStep] = useState('initial'); // initial, scanning, processing, complete, error
  const [capturedImages, setCapturedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const capturePositions = [
    { name: 'Center', instruction: 'Look straight at the camera', angle: 0 },
    { name: 'Left', instruction: 'Turn your head slightly to the left', angle: -15 },
    { name: 'Right', instruction: 'Turn your head slightly to the right', angle: 15 },
    { name: 'Up', instruction: 'Tilt your head slightly up', angle: 0 },
    { name: 'Smile', instruction: 'Smile naturally at the camera', angle: 0 }
  ];

  const startRegistration = async () => {
    try {
      setStep('scanning');
      setError('');
      setCapturedImages([]);
      setProgress(0);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Capture multiple face angles
      for (let i = 0; i < capturePositions.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            captureImage(i);
            setProgress(((i + 1) / capturePositions.length) * 100);
            resolve();
          }, 2000); // 2 seconds between captures
        });
      }

      // Stop camera
      stream.getTracks().forEach(track => track.stop());
      
      setStep('processing');
      
      // Simulate processing
      setTimeout(() => {
        // TODO: Replace with actual backend API call
        // This is where you would send the captured images to your backend
        // for face encoding and storage
        processFaceData();
      }, 2000);

    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setStep('error');
    }
  };

  const captureImage = (index) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImages(prev => [...prev, {
        id: index,
        position: capturePositions[index].name,
        data: imageData,
        timestamp: Date.now()
      }]);
    }
  };

  const processFaceData = async () => {
    try {
      // TODO: Replace with actual API call
      // Example backend integration:
      // const response = await fetch('/api/face/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: currentUser.id,
      //     faceImages: capturedImages,
      //     metadata: { device: navigator.userAgent }
      //   })
      // });
      
      // Simulate successful processing
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setStep('complete');
        toast({
          title: "Face registered successfully!",
          description: "You can now use face scan to log in.",
        });
      } else {
        throw new Error('Processing failed');
      }
    } catch (err) {
      setError('Failed to process face data. Please try again.');
      setStep('error');
    }
  };

  const resetRegistration = () => {
    setStep('initial');
    setCapturedImages([]);
    setProgress(0);
    setError('');
    setShowPreview(false);
  };

  const currentPosition = capturePositions[Math.floor((progress / 100) * capturePositions.length)];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header />
        
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-6">
            {/* Back button */}
            <Link to="/settings" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Link>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <UserPlus className="w-6 h-6 text-primary" />
                  Register Your Face
                </CardTitle>
                <CardDescription>
                  Set up face recognition for secure login
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress indicator */}
                {(step === 'scanning' || step === 'processing') && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                {/* Camera viewport */}
                <div className="relative">
                  <div className="w-full h-64 bg-muted rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-border">
                    {step === 'initial' && (
                      <div className="text-center text-muted-foreground">
                        <Camera className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Ready to capture your face</p>
                        <p className="text-xs text-muted-foreground mt-1">We'll take 5 photos from different angles</p>
                      </div>
                    )}
                    
                    {step === 'scanning' && (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute inset-0 border-4 border-primary rounded-lg animate-pulse" />
                        
                        {/* Current instruction */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-center">
                            <div className="text-sm font-medium text-foreground">
                              {currentPosition?.instruction || 'Hold still...'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {capturedImages.length + 1} of {capturePositions.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {step === 'processing' && (
                      <div className="text-center">
                        <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                        <p className="font-medium">Processing face data...</p>
                        <p className="text-sm text-muted-foreground">This may take a moment</p>
                      </div>
                    )}
                    
                    {step === 'complete' && (
                      <div className="text-center text-green-600">
                        <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                        <p className="font-medium">Registration complete!</p>
                        <p className="text-sm text-muted-foreground">Face scan login is now enabled</p>
                      </div>
                    )}
                    
                    {step === 'error' && (
                      <div className="text-center text-destructive">
                        <XCircle className="w-16 h-16 mx-auto mb-2" />
                        <p className="font-medium">Registration failed</p>
                        <p className="text-sm text-muted-foreground">Please try again</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Captured images preview */}
                {capturedImages.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Captured Images</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {showPreview && (
                      <div className="grid grid-cols-5 gap-2">
                        {capturedImages.map((img, index) => (
                          <div key={img.id} className="relative">
                            <img 
                              src={img.data} 
                              alt={`Face capture ${img.position}`}
                              className="w-full h-12 object-cover rounded border"
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border border-background rounded-full" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Instructions */}
                {step === 'initial' && (
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>• Ensure good lighting on your face</p>
                    <p>• Remove glasses if possible</p>
                    <p>• Look directly at the camera</p>
                    <p>• Follow the instructions during capture</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-3">
                  {step === 'initial' && (
                    <Button 
                      onClick={startRegistration} 
                      className="w-full"
                      size="lg"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Start Registration
                    </Button>
                  )}
                  
                  {step === 'complete' && (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => navigate('/login')} 
                        className="w-full"
                        size="lg"
                      >
                        Try Face Scan Login
                      </Button>
                      <Button 
                        onClick={() => navigate('/settings')} 
                        variant="outline"
                        className="w-full"
                      >
                        Back to Settings
                      </Button>
                    </div>
                  )}
                  
                  {(step === 'error') && (
                    <Button 
                      onClick={resetRegistration} 
                      className="w-full"
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                </div>

                {/* Alternative actions */}
                {step === 'initial' && (
                  <div className="text-center">
                    <Link 
                      to="/settings" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Skip for now
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security note */}
            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>Your face data is encrypted and stored securely.</p>
              <p>You can remove it anytime from settings.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FaceRegistrationPage;