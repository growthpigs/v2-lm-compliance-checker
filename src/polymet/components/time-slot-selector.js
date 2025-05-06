"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimeSlotSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function TimeSlotSelector({ date, onTimeSelected, selectedTimeSlot, }) {
    // Mock time slots - in a real app, these would be fetched based on the selected date
    const mockTimeSlots = [
        { id: "1", time: "9:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: true },
        { id: "3", time: "11:30 AM", available: true },
        { id: "4", time: "1:00 PM", available: true },
        { id: "5", time: "2:30 PM", available: false },
        { id: "6", time: "4:00 PM", available: true },
        { id: "7", time: "5:30 PM", available: true },
    ];
    const handleTimeSlotClick = (timeSlot) => {
        if (!timeSlot.available)
            return;
        onTimeSelected(timeSlot);
    };
    if (!date) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ClockIcon, { className: "mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: "Please select a date to view available time slots" })] }));
    }
    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-medium mb-3", children: ["Available times for ", formattedDate] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: mockTimeSlots.map((slot, index) => ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: selectedTimeSlot?.id === slot.id ? "default" : "outline", className: `
              ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}
              ${selectedTimeSlot?.id === slot.id ? "bg-blue-600 text-white" : ""}
            `, disabled: !slot.available, onClick: () => handleTimeSlotClick(slot), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ClockIcon, { className: "mr-2 h-4 w-4" }), slot.time] }, slot.id))) })] }));
}
