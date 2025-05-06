"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestDataControls;
const jsx_runtime_1 = require("react/jsx-runtime");
const test_data_1 = require("../utils/test-data");
const react_router_dom_1 = require("react-router-dom");
function TestDataControls() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handlePopulateAndNavigate = () => {
        (0, test_data_1.populateTestData)();
        navigate('/scan-results');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "fixed bottom-4 right-4 flex gap-2 bg-white p-4 rounded-lg shadow-lg z-50", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handlePopulateAndNavigate, className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: "Load Test Data & View Results" }), (0, jsx_runtime_1.jsx)("button", { onClick: test_data_1.clearTestData, className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600", children: "Clear Test Data" })] }));
}
