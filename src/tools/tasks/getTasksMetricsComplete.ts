/**
 * Total count of completed tasks
 * Returns the total number of completed tasks. Only the tasks that the
 * logged-in user can access will be counted.
 */

import logger from "../../utils/logger.js";
import { getApiClientForVersion } from "../../services/core/apiClient.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTasksMetricsCompleteDefinition = {
  name: "getTasksMetricsComplete",
  description: "Get the total count of completed tasks in Teamwork",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  annotations: {
    title: "Get the Total Count of Completed Tasks",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTasksMetricsComplete() {
  try {
    logger.info('Getting metrics for completed tasks');
    
    // Make API call
    const apiClient = getApiClientForVersion();
    const response = await apiClient.get('/tasks/metrics/complete.json');
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response.data, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving completed tasks metrics');
  }
} 