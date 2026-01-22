/**
 * getPersonById tool
 * Retrieves a specific person by ID from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getPersonByIdDefinition = {
  name: "getPersonById",
  description: "Get a specific person by ID from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      personId: {
        type: "integer",
        description: "The ID of the person to retrieve"
      }
    },
    required: ["personId"]
  },
  annotations: {
    title: "Get a Person by their ID",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetPersonById(input: any) {
  logger.info('=== getPersonById tool called ===');
  logger.info(`Input parameters: ${JSON.stringify(input || {})}`);
  
  try {
    if (!input.personId) {
      logger.error('Missing required parameter: personId');
      return {
        content: [{
          type: "text",
          text: "Error: Missing required parameter 'personId'"
        }]
      };
    }
    
    const personId = parseInt(input.personId, 10);
    if (isNaN(personId)) {
      logger.error(`Invalid personId: ${input.personId}`);
      return {
        content: [{
          type: "text",
          text: `Error: Invalid personId. Must be a number.`
        }]
      };
    }
    
    logger.info(`Calling teamworkService.getPersonById(${personId})`);
    const person = await teamworkService.getPersonById(personId);
    
    // Debug the response
    logger.info(`Person response type: ${typeof person}`);
    
    if (person === null || person === undefined) {
      logger.warn(`Person with ID ${personId} not found or API returned empty response`);
      return {
        content: [{
          type: "text",
          text: `No person found with ID ${personId} or API returned empty response.`
        }]
      };
    }
    
    try {
      const jsonString = JSON.stringify(person, null, 2);
      logger.info(`Successfully stringified person response`);
      logger.info('=== getPersonById tool completed successfully ===');
      return {
        content: [{
          type: "text",
          text: jsonString
        }]
      };
    } catch (jsonError: any) {
      logger.error(`JSON stringify error: ${jsonError.message}`);
      return {
        content: [{
          type: "text",
          text: `Error formatting response: ${jsonError.message}`
        }]
      };
    }
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving person');
  }
} 