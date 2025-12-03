/**
 * getTasksByProjectId tool
 * Retrieves tasks from a specific project in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTasksByProjectIdDefinition = {
  name: "getTasksByProjectId",
  description: "Get all tasks from a specific project in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "integer",
        description: "The ID of the project to get tasks from"
      }
    },
    required: ["projectId"]
  },
  annotations: {
    title: "Get Tasks by Project ID",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTasksByProjectId(input: any) {
  logger.info('Calling teamworkService.getTasksByProjectId()');
  logger.info(`Project ID: ${input?.projectId}`);
  
  try {
    const projectId = String(input?.projectId);
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    
    const tasks = await teamworkService.getTasksByProjectId(projectId);
    logger.info(`Tasks response received for project ID: ${projectId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving tasks for project');
  }
} 