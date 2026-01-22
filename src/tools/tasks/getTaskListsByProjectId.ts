/**
 * getTaskListsByProjectId tool
 * Retrieves task lists from a specific project in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTaskListsByProjectIdDefinition = {
  name: "getTaskListsByProjectId",
  description: "Get all task lists by project ID",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The ID of the project to get task lists from"
      }
    },
    required: ["projectId"]
  },
  annotations: {
    title: "Get Task Lists by Project ID",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTaskListsByProjectId(input: any) {
  logger.info('Calling teamworkService.getTaskListsByProjectId()');
  logger.info(`Project ID: ${input?.projectId}`);
  
  try {
    const projectId = input?.projectId;
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    
    const taskLists = await teamworkService.getTaskListsByProjectId(projectId);
    logger.info(`Task lists response received for project ID: ${projectId}`);
    
    if (taskLists) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify(taskLists, null, 2)
        }]
      };
    } else {
      return {
        content: [{
          type: "text",
          text: `Error getting task lists for project ID: ${projectId}`
        }]
      };
    }
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving task lists');
  }
} 