/**
 * deleteTask tool
 * Deletes a task from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const deleteTaskDefinition = {
  name: "deleteTask",
  description: "Delete a task from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      taskId: {
        type: "integer",
        description: "The ID of the task to delete"
      }
    },
    required: ["taskId"]
  },
  annotations: {
    title: "Delete a Task",
    readOnlyHint: false,
    destructiveHint: true,
    openWorldHint: false
  }
};

// Tool handler
export async function handleDeleteTask(input: any) {
  logger.info('Calling teamworkService.deleteTask()');
  logger.info(`Task ID: ${input?.taskId}`);
  
  try {
    const taskId = String(input?.taskId);
    if (!taskId) {
      throw new Error("Task ID is required");
    }
    
    const result = await teamworkService.deleteTask(taskId);
    logger.info(`Task deleted successfully for task ID: ${taskId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ success: result }, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Deleting task');
  }
} 