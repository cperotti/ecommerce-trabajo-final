import { addLoggerDev, addLoggerProd } from "../configServer/logger.js";
import { commander } from "./commander.js";

const {mode} = commander.opts()

export const logger = mode === 'development' ? addLoggerDev : addLoggerProd