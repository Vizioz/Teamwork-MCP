import { getTime as getTimeService } from '../../services/time/getTime.js';
import logger from '../../utils/logger.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

/**
 * Tool definition for getting all time entries
 */
export const getTimeDefinition = {
  name: "getTime",
  description: "Get all time entries. Return all logged time entries for all projects. Only the time entries that the logged-in user can access will be returned.",
  inputSchema: {
    type: 'object',
    properties: {
      updatedAfter: {
        type: 'string',
        description: 'filter by updated after date'
      },
      startDate: {
        type: 'string',
        description: 'filter by a starting date'
      },
      reportFormat: {
        type: 'string',
        description: 'define the format of the report'
      },
      projectStatus: {
        type: 'string',
        description: 'filter by project status',
        enum: [
          'active',
          'current',
          'late',
          'upcoming',
          'completed',
          'deleted'
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
      invoicedType: {
        type: 'string',
        description: 'filter by invoiced type',
        enum: [
          'all',
          'invoiced',
          'noninvoiced'
        ]
      },
      endDate: {
        type: 'string',
        description: 'filter by an ending date'
      },
      billableType: {
        type: 'string',
        description: 'filter by billable type',
        enum: [
          'all',
          'billable',
          'non-billable'
        ]
      },
      updatedBy: {
        type: 'integer',
        description: 'filter by the user who updated the timelog'
      },
      ticketId: {
        type: 'integer',
        description: 'filter by ticket id'
      },
      tasklistId: {
        type: 'integer',
        description: 'filter by tasklist id'
      },
      taskId: {
        type: 'integer',
        description: 'filter by task id (deprecated, use taskIds)'
      },
      projectId: {
        type: 'integer',
        description: 'filter by project id (deprecated, use projectIds)'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page'
      },
      page: {
        type: 'integer',
        description: 'page number'
      },
      invoiceId: {
        type: 'integer',
        description: 'filter by invoice id'
      },
      budgetId: {
        type: 'integer',
        description: 'filter by budget id'
      },
      allocationId: {
        type: 'integer',
        description: 'filter by allocation id'
      }
    },
    required: []
  },
  annotations: {
    title: "Get Time Entries",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

/**
 * Handler for getting all time entries
 */
export async function handleGetTime(input: any) {
  try {
    logger.info('Handling getTime tool request');
    const response = await getTimeService(input);
    
    logger.info('Successfully handled getTime request');
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Getting time entries');
  }
} 