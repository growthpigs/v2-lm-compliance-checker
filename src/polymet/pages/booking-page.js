"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BookingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const aurora_background_1 = __importDefault(require("@/polymet/components/aurora-background"));
const booking_form_1 = __importDefault(require("@/polymet/components/booking-form"));
function BookingPage() {
    // Log that the component is rendering
    console.log('[DEBUG] BookingPage component rendering');
    const [currentStep, setCurrentStep] = (0, react_1.useState)(1);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [isSubmitted, setIsSubmitted] = (0, react_1.useState)(false);
    const handleContinueToForm = () => {
        setCurrentStep(2);
    };
    const handleBackToCalendar = () => {
        setCurrentStep(1);
    };
    const handleFormSubmit = (formData) => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Booking submitted:", {
                formData,
            });
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };
    return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 md:py-12 max-w-none", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col lg:flex-row items-start gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:w-1/2 w-full relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/Logo Legal Moustache COLOR.svg", alt: "Legal Moustache Logo", className: "w-auto h-16 md:h-20" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8 w-full", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-normal lg:tracking-wide", children: ["Book Your 20-Minute", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "Free Strategy Call" })] }), (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-3 md:space-y-2 lg:space-y-1 text-white flex flex-col md:flex-row md:space-x-4 md:items-center md:flex-wrap", children: [(0, jsx_runtime_1.jsxs)("li", { className: "flex items-start md:items-center md:w-auto", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0 mt-1 md:mt-0", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg md:text-base lg:text-sm", children: "Get a free SEO audit and AI opinion on your website" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start md:items-center md:w-auto", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0 mt-1 md:mt-0", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg md:text-base lg:text-sm", children: "Discuss hidden SEO opportunities without pressure" })] }), (0, jsx_runtime_1.jsxs)("li", { className: "flex items-start md:items-center md:w-auto", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0 mt-1 md:mt-0", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg md:text-base lg:text-sm", children: "Decide if our Hidden Gems offer is right for you" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative md:max-w-none mt-0 md:-mt-4 lg:-mt-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 right-0 transform rotate-12 z-0", children: (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/250-hidden-gem-icon.png", alt: "Pink Gem", className: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-90" }) }), (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/moustache-man.png", alt: "Legal Moustache Expert", className: "relative z-10 max-h-[400px] md:max-h-[500px] lg:max-h-[600px] w-auto object-contain" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-[120%]", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-green-500 text-white font-bold text-xs md:text-sm lg:text-base xl:text-lg px-6 py-2.5 rounded-full whitespace-nowrap md:tracking-wider lg:tracking-widest flex justify-center items-center w-full", children: "DOUBLE YOUR TRAFFIC OR IT'S FREE" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:w-1/2 w-full", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full bg-white dark:bg-gray-800 shadow-lg", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold mb-6", children: "Free 20-Minute Strategy Call" }), currentStep === 1 ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full min-h-[400px] rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)("iframe", { src: "https://tidycal.com/quick-chat/quick-chat-with-jonathan", width: "100%", height: "100%", frameBorder: "0", style: { minHeight: "400px" }, title: "Schedule Appointment" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleContinueToForm, className: "w-full bg-green-500 hover:bg-green-600 text-white", children: "Continue" })] })) : ((0, jsx_runtime_1.jsxs)("div", { children: [!isSubmitted && ((0, jsx_runtime_1.jsxs)("div", { className: "mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium mb-1", children: "Selected Time" }), (0, jsx_runtime_1.jsx)("p", { children: "Thursday, June 20, 2024 at 10:00 AM" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "link", onClick: handleBackToCalendar, className: "p-0 h-auto mt-1", children: "Change time" })] })), (0, jsx_runtime_1.jsx)(booking_form_1.default, { onSubmit: handleFormSubmit, isSubmitting: isSubmitting, isSubmitted: isSubmitted })] }))] }) }) })] }) }) }));
}
