import { getPeopleMetricsPerformance } from '../../services/people/getPeopleMetricsPerformance.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

export const getProjectsPeopleMetricsPerformanceDefinition = {
  name: "getProjectsPeopleMetricsPerformance",
  description: "Performance of users completing the most tasks. Count the number of completed tasks by user for the provided period. By default the user with the most completed tasks is shown first.",
  inputSchema: {
    type: 'object',
    properties: {
      startDate: {
        type: 'string',
        description: 'Start date for the performance metrics period'
      },
      endDate: {
        type: 'string',
        description: 'End date for the performance metrics period'
      },
      orderMode: {
        type: 'string',
        description: 'Order mode for sorting results',
        enum: [
          'asc',
          'desc'
        ]
      }
    }
  },
  annotations: {
    title: "Get the Metrics of People's Performance in Projects",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

export async function handleGetProjectsPeopleMetricsPerformance(input: any) {
  try {
    const response = await getPeopleMetricsPerformance(input);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving people performance metrics');
  }
} 