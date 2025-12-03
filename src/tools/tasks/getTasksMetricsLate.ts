/**
 * Get total count of late tasks
 * Returns the number of late tasks. Only the tasks that the logged-in user has
 * access to will be counted.
 */

import logger from "../../utils/logger.js";
import { getApiClientForVersion } from "../../services/core/apiClient.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTasksMetricsLateDefinition = {
  name: "getTasksMetricsLate",
  description: "Get the total count of late tasks in Teamwork",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  annotations: {
    title: "Get the Total Count of Late Tasks",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetTasksMetricsLate() {
  try {
    logger.info('Getting metrics for late tasks');
    
    // Make API call
    const apiClient = getApiClientForVersion();
    const response = await apiClient.get('/tasks/metrics/late.json');
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response.data, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving late tasks metrics');
  }
} 