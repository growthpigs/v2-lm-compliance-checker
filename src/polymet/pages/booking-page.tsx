import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AuroraBackground from "@/polymet/components/aurora-background";
import BookingForm, {
  BookingFormData,
} from "@/polymet/components/booking-form";

export default function BookingPage() {
  // Enhanced component logging
  console.log('[DEBUG-BOOKING] BookingPage component initial render');
  
  // Add useEffect to track component mounting
  useEffect(() => {
    console.log('[DEBUG-BOOKING] BookingPage mounted');
    
    // Check if the error message container exists - using textContent instead of :contains
    const errorElements = Array.from(document.querySelectorAll('div')).filter(el => 
      el.textContent?.includes('Legal Website Compliance Checker')
    );
    console.log('[DEBUG-BOOKING] Error element exists:', errorElements.length > 0);
    
    // Log DOM structure
    console.log('[DEBUG-BOOKING] Root element:', document.getElementById('root'));
    
    return () => {
      console.log('[DEBUG-BOOKING] BookingPage unmounted');
    };
  }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContinueToForm = () => {
    console.log('[DEBUG-BOOKING] Continue to form clicked, changing step from 1 to 2');
    setCurrentStep(2);
  };

  const handleBackToCalendar = () => {
    console.log('[DEBUG-BOOKING] Back to calendar clicked, changing step from 2 to 1');
    setCurrentStep(1);
  };

  const handleFormSubmit = (formData: BookingFormData) => {
    console.log('[DEBUG-BOOKING] Form submission started with data:', formData);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('[DEBUG-BOOKING] Form submission completed');
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  console.log('[DEBUG-BOOKING] Current rendering state - step:', currentStep, 'isSubmitting:', isSubmitting, 'isSubmitted:', isSubmitted);

  return (
    <AuroraBackground>
      {console.log('[DEBUG-BOOKING] Rendering AuroraBackground')}
      <div className="container mx-auto px-6 md:px-10 py-8 md:py-12 max-w-none">
        <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-16 lg:gap-20">
          {/* Left side - Moustache Man and Info */}
          <div className="lg:w-1/2 w-full relative pl-4 md:pl-6">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="https://storage.googleapis.com/legal-moustache/Logo Legal Moustache COLOR.svg"
                alt="Legal Moustache Logo"
                className="w-auto h-16 md:h-20"
                onLoad={() => console.log('[DEBUG-BOOKING] Logo image loaded')}
                onError={(e) => console.error('[DEBUG-BOOKING] Logo image failed to load:', e)}
              />
            </div>

            {/* Heading - reduced size */}
            <div className="mb-8 w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-normal lg:tracking-wide">
                Book Your 20-Minute{" "}
                <span className="text-white">Free Strategy Call</span>
              </h1>

              {/* Replaced bullet points with descriptive paragraphs */}
              <div className="text-white space-y-4">
                <p className="text-lg md:text-base">
                  Our complimentary strategy session includes a focused SEO audit and AI-powered 
                  analysis of your law firm's website. We'll identify hidden opportunities that could 
                  significantly improve your online visibility and client acquisition.
                </p>
                <p className="text-lg md:text-base">
                  This no-pressure conversation helps you understand your website's potential and 
                  whether our specialized services are the right fit for your firm's growth objectives.
                  Schedule your call today to start improving your digital presence.
                </p>
              </div>
            </div>

            {/* Moustache Man Image with repositioned banner */}
            <div className="relative md:max-w-none mt-0 md:-mt-4 lg:-mt-8">
              {/* Moustache Man image */}
              <img
                src="https://storage.googleapis.com/legal-moustache/moustache-man.png"
                alt="Legal Moustache Expert"
                className="relative z-10 max-h-[400px] md:max-h-[500px] lg:max-h-[600px] w-auto object-contain"
                onLoad={() => console.log('[DEBUG-BOOKING] Moustache man image loaded')}
                onError={(e) => console.error('[DEBUG-BOOKING] Moustache man image failed to load:', e)}
              />

              {/* Green square banner positioned to cover only 3/5 of the column from the left */}
              <div className="absolute bottom-0 left-0 w-3/5 z-20">
                <div className="bg-green-500 text-white font-bold text-sm md:text-base px-4 py-2 flex justify-center items-center w-full">
                  DOUBLE YOUR TRAFFIC OR IT'S FREE
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Booking Form */}
          <div className="lg:w-1/2 w-full">
            {console.log('[DEBUG-BOOKING] Rendering right side booking form, currentStep:', currentStep)}
            <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Free 20-Minute Strategy Call
                </h2>

                {currentStep === 1 ? (
                  <div className="space-y-8">
                    {console.log('[DEBUG-BOOKING] Rendering TidyCal embed')}
                    {/* TidyCal Embed */}
                    <div className="w-full min-h-[400px] rounded-lg overflow-hidden">
                      <iframe
                        src="https://tidycal.com/quick-chat/quick-chat-with-jonathan"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ minHeight: "400px" }}
                        title="Schedule Appointment"
                        onLoad={() => console.log('[DEBUG-BOOKING] TidyCal iframe loaded')}
                        onError={(e) => console.error('[DEBUG-BOOKING] TidyCal iframe failed to load:', e)}
                      ></iframe>
                    </div>

                    <Button
                      onClick={handleContinueToForm}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <div>
                    {console.log('[DEBUG-BOOKING] Rendering form step')}
                    {!isSubmitted && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h3 className="font-medium mb-1">Selected Time</h3>
                        <p>Thursday, June 20, 2024 at 10:00 AM</p>
                        <Button
                          variant="link"
                          onClick={handleBackToCalendar}
                          className="p-0 h-auto mt-1"
                        >
                          Change time
                        </Button>
                      </div>
                    )}

                    <BookingForm
                      onSubmit={handleFormSubmit}
                      isSubmitting={isSubmitting}
                      isSubmitted={isSubmitted}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
