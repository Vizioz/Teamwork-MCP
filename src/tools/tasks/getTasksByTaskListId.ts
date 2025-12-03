/**
 * Get a specific tasklist's tasks.
 * Return multiple tasks according to the provided filter.
 *
 * On this endpoint you can filter by custom fields. The syntax for the
 * query parameter is the following:
 *
 *     customField[id][op]=value
 *
 * Where:
 *   - [id] is the custom field ID
 *   - [op] is the operator to apply when filtering, different operators are
 *     allowed according to the custom field type
 *   - [value] is the value to apply when filtering
 *
 * For example, if I want to filter a dropdown custom field with ID 10 to only
 * return entries that have the value "Option1" we would do the following:
 *
 *     customField[10][eq]=Option1
 *
 * The allowed operators are:
 *   - like
 *   - not-like
 *   - eq
 *   - not
 *   - lt
 *   - gt
 *   - any
 */

import logger from "../../utils/logger.js";
import { getApiClientForVersion } from "../../services/core/apiClient.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTasksByTaskListIdDefinition = {
  name: "getTasksByTaskListId",
  description: "Get all tasks from a specific task list in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      tasklistId: {
        type: "integer",
        description: "The ID of the task list to get tasks from"
      },
      page: {
        type: "integer",
        description: "Page number for pagination"
      },
      pageSize: {
        type: "integer",
        description: "Number of items per page"
      },
      includeCompletedTasks: {
        type: "boolean",
        description: "Include completed tasks in the results"
      }
    },
    required: ["tasklistId"]
  },
  annotations: {
    title: "Get Tasks by Task List ID",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTasksByTaskListId(input: any) {
  try {
    const { tasklistId, page, pageSize, includeCompletedTasks, ...otherParams } = input;
    
    logger.info(`Getting tasks for task list ID: ${tasklistId}`);
    
    // Build query parameters
    const queryParams: Record<string, any> = {
      page,
      pageSize,
      includeCompletedTasks,
      ...otherParams
    };
    
    // Filter out undefined values
    Object.keys(queryParams).forEach(key => 
      queryParams[key] === undefined && delete queryParams[key]
    );
    
    // Make API call
    const apiClient = getApiClientForVersion();
    const response = await apiClient.get(
      `/tasklists/${tasklistId}/tasks.json`, 
      { params: queryParams }
    );
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response.data, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving tasks by task list');
  }
} 