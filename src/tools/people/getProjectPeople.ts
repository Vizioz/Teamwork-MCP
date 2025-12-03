/**
 * getProjectPeople tool
 * Retrieves people assigned to a specific project from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getProjectPeopleDefinition = {
  name: "getProjectPeople",
  description: "Get all people assigned to a specific project from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The ID of the project to get people from"
      },
      userType: {
        type: "string",
        enum: ["account", "collaborator", "contact"],
        description: "Filter by user type"
      },
      searchTerm: {
        type: "string",
        description: "Filter by name or email"
      },
      orderMode: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Order mode"
      },
      orderBy: {
        type: "string",
        enum: ["name", "namecaseinsensitive", "company"],
        description: "Order by field"
      },
      pageSize: {
        type: "integer",
        description: "Number of items per page"
      },
      page: {
        type: "integer",
        description: "Page number"
      },
      includeObservers: {
        type: "boolean",
        description: "Include project observers"
      }
    },
    required: ["projectId"]
  },
  annotations: {
    title: "Get People in a Project",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetProjectPeople(input: any) {
  logger.info('=== getProjectPeople tool called ===');
  logger.info(`Input parameters: ${JSON.stringify(input || {})}`);
  
  try {
    if (!input.projectId) {
      logger.error('Missing required parameter: projectId');
      return {
        content: [{
          type: "text",
          text: "Error: Missing required parameter 'projectId'"
        }]
      };
    }
    
    const projectId = parseInt(input.projectId, 10);
    if (isNaN(projectId)) {
      logger.error(`Invalid projectId: ${input.projectId}`);
      return {
        content: [{
          type: "text",
          text: `Error: Invalid projectId. Must be a number.`
        }]
      };
    }
    
    // Extract projectId from input and create a new params object without it
    const { projectId: _, ...params } = input;
    
    logger.info(`Calling teamworkService.getProjectPeople(${projectId})`);
    const people = await teamworkService.getProjectPeople(projectId, params);
    
    // Debug the response
    logger.info(`Project people response type: ${typeof people}`);
    
    if (people === null || people === undefined) {
      logger.warn(`No people found for project ID ${projectId} or API returned empty response`);
      return {
        content: [{
          type: "text",
          text: `No people found for project ID ${projectId} or API returned empty response.`
        }]
      };
    }
    
    try {
      const jsonString = JSON.stringify(people, null, 2);
      logger.info(`Successfully stringified project people response`);
      logger.info('=== getProjectPeople tool completed successfully ===');
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
    return createErrorResponse(error, 'Retrieving project people');
  }
} 