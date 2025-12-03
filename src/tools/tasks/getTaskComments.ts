/**
 * getTaskComments tool
 * Retrieves comments for a specific task from Teamwork
 */

import logger from "../../utils/logger.js"; 
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTaskCommentsDefinition = {
  name: "getTaskComments",
  description: "Get comments for a specific task from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      taskId: {
        type: "integer",
        description: "The ID of the task to retrieve comments for"
      },
      page: {
        type: "integer",
        description: "Page number for pagination"
      },
      pageSize: {
        type: "integer",
        description: "Number of items per page"
      },
      orderBy: {
        type: "string",
        description: "Order by field",
        enum: ["all", "date", "project", "user", "type"]
      },
      orderMode: {
        type: "string",
        description: "Order mode",
        enum: ["asc", "desc"]
      },
      searchTerm: {
        type: "string",
        description: "Filter by comment content"
      },
      updatedAfter: {
        type: "string",
        description: "Filter by updated after date (ISO 8601 format)"
      },
      commentStatus: {
        type: "string",
        description: "Filter by comment status",
        enum: ["all", "read", "unread"]
      }
    },
    required: ["taskId"]
  },
  annotations: {
    title: "Get Task Comments",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTaskComments(input: any) {
  logger.info('Calling teamworkService.getTaskComments()');
  logger.info(`Task ID: ${input?.taskId}`);
  
  try {
    const taskId = String(input?.taskId);
    if (!taskId) {
      throw new Error("Task ID is required");
    }
    
    // Extract optional parameters
    const options: Record<string, any> = {};
    
    if (input.page) options.page = input.page;
    if (input.pageSize) options.pageSize = input.pageSize;
    if (input.orderBy) options.orderBy = input.orderBy;
    if (input.orderMode) options.orderMode = input.orderMode;
    if (input.searchTerm) options.searchTerm = input.searchTerm;
    if (input.updatedAfter) options.updatedAfter = input.updatedAfter;
    if (input.commentStatus) options.commentStatus = input.commentStatus;
    
    const comments = await teamworkService.getTaskComments(taskId, options);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(comments, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving task comments');
  }
} 