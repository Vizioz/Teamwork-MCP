/**
 * deletePerson tool
 * Deletes a person from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const deletePersonDefinition = {
  name: "deletePerson",
  description: "Delete a person from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      personId: {
        type: "integer",
        description: "The ID of the person to delete"
      }
    },
    required: ["personId"]
  },
  annotations: {
    title: "Delete Person",
    readOnlyHint: false,
    destructiveHint: true,
    openWorldHint: false
  }
};

// Tool handler
export async function handleDeletePerson(input: any) {
  logger.info('=== deletePerson tool called ===');
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
    
    logger.info(`Calling teamworkService.deletePerson(${personId})`);
    const result = await teamworkService.deletePerson(personId);
    
    // Debug the response
    logger.info(`Delete person response type: ${typeof result}`);
    
    try {
      const jsonString = JSON.stringify(result || { success: true, message: "Person deleted successfully" }, null, 2);
      logger.info(`Successfully stringified response`);
      logger.info('=== deletePerson tool completed successfully ===');
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
    return createErrorResponse(error, 'Deleting person');
  }
} 