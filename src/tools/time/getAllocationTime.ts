import { getAllocationTime as getAllocationTimeService } from '../../services/time/getAllocationTime.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

export const getProjectsAllocationsTimeDefinition = {
  name: "getProjectsAllocationsTime",
  description: "Get time entries for a specific allocation. Return logged time entries for a specific allocation. Only the time entries that the logged-in user can access will be returned.",
  inputSchema: {
    type: 'object',
    properties: {
      allocationId: {
        type: 'integer',
        description: 'filter by allocation id'
      },
      updatedAfter: {
        type: 'string',
        description: 'filter by updated after date'
      },
      startDate: {
        type: 'string',
        description: 'filter by a starting date'
      },
      endDate: {
        type: 'string',
        description: 'filter by an ending date'
      },
      orderBy: {
        type: 'string',
        description: 'sort order',
        enum: [
          'company',
          'date',
          'dateupdated',
          'project',
          'task',
          'tasklist',
          'user',
          'description',
          'billed',
          'billable',
          'timespent'
        ]
      },
      orderMode: {
        type: 'string',
        description: 'order mode',
        enum: [
          'asc',
          'desc'
        ]
      },
      page: {
        type: 'integer',
        description: 'page number'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page'
      },
      includeTotals: {
        type: 'boolean',
        description: 'include totals'
      },
      includePermissions: {
        type: 'boolean',
        description: 'include permissions'
      }
    },
    required: ['allocationId']
  },
  annotations: {
    title: "Get Time Entries for a Specific Allocation",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

export async function handleGetProjectsAllocationsTime(input: any) {
  try {
    const response = await getAllocationTimeService(input);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Getting allocation time entries');
  }
} 