/**
 * addPeopleToProject tool
 * Adds people to a specific project in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService, { AddPeopleToProjectPayload } from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const addPeopleToProjectDefinition = {
  name: "addPeopleToProject",
  description: "Add people to a specific project in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The ID of the project to add people to"
      },
      userIds: {
        type: "array",
        items: {
          type: "integer"
        },
        description: "Array of user IDs to add to the project"
      },
      checkTeamIds: {
        type: "array",
        items: {
          type: "integer"
        },
        description: "Optional array of team IDs to check"
      }
    },
    required: ["projectId", "userIds"]
  },
  annotations: {
    title: "Add People to Project",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleAddPeopleToProject(input: any) {
  logger.info('=== addPeopleToProject tool called ===');
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
    
    if (!input.userIds || !Array.isArray(input.userIds) || input.userIds.length === 0) {
      logger.error('Missing or invalid required parameter: userIds');
      return {
        content: [{
          type: "text",
          text: "Error: Missing or invalid required parameter 'userIds'. Must be a non-empty array of user IDs."
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
    
    // Prepare the payload with proper typing
    const payload: AddPeopleToProjectPayload = {
      userIds: input.userIds
    };
    
    // Add checkTeamIds if provided
    if (input.checkTeamIds && Array.isArray(input.checkTeamIds)) {
      payload.checkTeamIds = input.checkTeamIds;
    }
    
    logger.info(`Calling teamworkService.addPeopleToProject(${projectId}, ${JSON.stringify(payload)})`);
    const result = await teamworkService.addPeopleToProject(projectId, payload);
    
    // Debug the response
    logger.info(`Add people to project response type: ${typeof result}`);
    
    try {
      const jsonString = JSON.stringify(result, null, 2);
      logger.info(`Successfully stringified response`);
      logger.info('=== addPeopleToProject tool completed successfully ===');
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
    return createErrorResponse(error, 'Adding people to project');
  }
} 