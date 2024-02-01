"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./services/database"));
const application_1 = require("./services/application");
dotenv_1.default.config();
const app = (0, express_1.default)();
const startServer = () => {
    (0, database_1.default)();
    (0, application_1.ApplicationService)(app);
};
startServer();
