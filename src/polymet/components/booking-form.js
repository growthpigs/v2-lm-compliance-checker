"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BookingForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
function BookingForm({ onSubmit, isSubmitting, isSubmitted, }) {
    const [formData, setFormData] = (0, react_1.useState)({
        name: "",
        email: "",
        phone: "",
        website: "",
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    if (isSubmitted) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center p-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckIcon, { className: "h-8 w-8 text-green-600 dark:text-green-400" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold mb-2", children: "Booking Confirmed!" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "We've sent a confirmation email with all the details." }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "If you need to reschedule or cancel, please use the link in the email." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Full Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", name: "name", placeholder: "John Smith", value: formData.name, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "Email Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", name: "email", type: "email", placeholder: "john@example.com", value: formData.email, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "Phone Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", name: "phone", type: "tel", placeholder: "(555) 123-4567", value: formData.phone, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "website", children: "Website URL" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "website", name: "website", type: "url", placeholder: "https://yourfirm.com", value: formData.website, onChange: handleChange, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "message", children: "What would you like to discuss?" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "message", name: "message", placeholder: "Tell us about your website and what you're looking to achieve...", value: formData.message, onChange: handleChange, rows: 4 })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-500 hover:bg-green-600 text-white", disabled: isSubmitting, children: isSubmitting ? "Confirming..." : "Confirm Booking" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-center text-gray-500 dark:text-gray-400 mt-4", children: ["By booking a call, you agree to our", " ", (0, jsx_runtime_1.jsx)("a", { href: "#", className: "underline", children: "Terms of Service" }), " ", "and", " ", (0, jsx_runtime_1.jsx)("a", { href: "#", className: "underline", children: "Privacy Policy" }), "."] })] }));
}
