/**
 * getTimezones tool
 * Retrieves all timezones available in Teamwork
 */

import logger from '../../utils/logger.js';
import teamworkService from '../../services/index.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

// Tool definition
export const getTimezonesDefinition = {
  name: "getTimezones",
  description: "Get all timezones available in Teamwork. This is useful when you need to update a user's timezone and need to know the available options.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: []
  },
  annotations: {
    title: "Get Timezones",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTimezones() {
  logger.info('Calling teamworkService.getTimezones()');
  
  try {
    const result = await teamworkService.getTimezones();
    logger.info('Successfully retrieved timezones');
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving timezones');
  }
} 