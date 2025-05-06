"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserInstance = getBrowserInstance;
const puppeteer_1 = __importDefault(require("puppeteer"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
let browserInstance = null;
async function getBrowserInstance() {
    // Use existing instance if available
    if (browserInstance && browserInstance.isConnected()) {
        return browserInstance;
    }
    // Check if running locally vs in production
    const isLocal = process.env.NODE_ENV === 'development';
    const options = {
        args: chrome_aws_lambda_1.default.args,
        executablePath: isLocal ? puppeteer_1.default.executablePath() : await chrome_aws_lambda_1.default.executablePath,
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    };
    try {
        browserInstance = await puppeteer_1.default.launch(options);
        return browserInstance;
    }
    catch (error) {
        console.error('Error launching browser:', error);
        throw error;
    }
}
