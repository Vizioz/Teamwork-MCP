import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Check if logging is disabled via environment variable or command line
const isLoggingDisabled = process.env.DISABLE_LOGGING === 'true' || 
                         process.argv.includes('--disable-logging') || 
                         process.argv.includes('--no-logging');

// Ensure logs directory exists only if logging is enabled
const logsDir = path.join(process.cwd(), 'logs');
if (!isLoggingDisabled && !fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define file log format
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Function to write initial log file headers
const writeLogFileHeader = (filePath: string) => {
  const header = `# Teamwork MCP Log File
# 
# This log file is automatically generated by the Teamwork MCP server.
# 
# To disable logging completely, you can use one of the following methods:
# 1. Command line: --disable-logging or --no-logging
# 2. Environment variable: DISABLE_LOGGING=true
# 
# Example: npx @vizioz/teamwork-mcp --disable-logging
# 
# Generated on: ${new Date().toISOString()}
# ================================================================

`;
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }
};

// Create logger instance - only log to files if logging is enabled, never to console
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: fileFormat,
  defaultMeta: { service: 'teamwork-mcp' },
  transports: isLoggingDisabled ? [] : [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') })
  ]
});

// Write headers to log files if logging is enabled
if (!isLoggingDisabled) {
  writeLogFileHeader(path.join(logsDir, 'error.log'));
  writeLogFileHeader(path.join(logsDir, 'combined.log'));
}

export default logger;