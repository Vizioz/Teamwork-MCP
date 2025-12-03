import { getPeopleUtilization } from '../../services/people/getPeopleUtilization.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

export const getProjectsPeopleUtilizationDefinition = {
  name: "getProjectsPeopleUtilization",
  description: "Return the user utilization data. This endpoint provides detailed information about user utilization, including billable and non-billable time, availability, and various utilization metrics.",
  inputSchema: {
    type: 'object',
    properties: {
      zoom: {
        type: 'string',
        description: 'determine the type of zoom filter used to display on the report',
        enum: [
          'week',
          'month',
          'last3months',
          'quarterbyweek',
          'quarterbymonth'
        ]
      },
      startDate: {
        type: 'string',
        description: 'filter by start date'
      },
      sortOrder: {
        type: 'string',
        description: 'order mode',
        enum: [
          'asc',
          'desc'
        ]
      },
      sort: {
        type: 'string',
        description: 'sort by (deprecated, use orderBy)',
        enum: [
          'name',
          'percentutilization',
          'percentestimatedutilization',
          'availableminutes',
          'unavailableminutes',
          'loggedminutes',
          'billableminutes',
          'unbillableminutes',
          'billableutilization',
          'nonbillableutilization'
        ]
      },
      searchTerm: {
        type: 'string',
        description: 'filter by user first or last name'
      },
      reportFormat: {
        type: 'string',
        description: 'define the format of the report',
        enum: [
          'pdf'
        ]
      },
      orderMode: {
        type: 'string',
        description: 'group by',
        enum: [
          'weekly',
          'monthly'
        ]
      },
      orderBy: {
        type: 'string',
        description: 'sort by',
        enum: [
          'name',
          'percentutilization',
          'percentestimatedutilization',
          'availableminutes',
          'unavailableminutes',
          'loggedminutes',
          'billableminutes',
          'unbillableminutes',
          'companycount',
          'achieved',
          'target',
          'allocatedutilization',
          'totalworkingminutes',
          'availableutilization',
          'unavailableutilization'
        ]
      },
      groupBy: {
        type: 'string',
        description: 'group by',
        enum: [
          'day',
          'week',
          'month'
        ]
      },
      endDate: {
        type: 'string',
        description: 'filter by end date'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page'
      },
      page: {
        type: 'integer',
        description: 'page number'
      },
      skipCounts: {
        type: 'boolean',
        description: 'skip doing counts on a list API endpoint for performance reasons'
      },
      legacyResponse: {
        type: 'boolean',
        description: 'return response without summary and its legacy body structure'
      },
      isReportDownload: {
        type: 'boolean',
        description: 'generate a report document'
      },
      isCustomDateRange: {
        type: 'boolean',
        description: 'determine if the query is for a custom date range'
      },
      includeUtilizations: {
        type: 'boolean',
        description: 'adds report rows for individual entities'
      },
      includeTotals: {
        type: 'boolean',
        description: 'adds report summary to response'
      },
      includeCollaborators: {
        type: 'boolean',
        description: 'include collaborators'
      },
      includeClients: {
        type: 'boolean',
        description: 'include client users'
      },
      includeArchivedProjects: {
        type: 'boolean',
        description: 'include archived projects'
      },
      IncludeCompletedTasks: {
        type: 'boolean',
        description: 'include completed tasks'
      },
      userIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by userIds'
      },
      teamIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by team ids'
      },
      selectedColumns: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'customise the report by selecting columns to be displayed'
      },
      projectIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by project ids'
      },
      jobRoleIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by jobrole ids'
      },
      include: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'include additional data'
      },
      fieldsUtilizations: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[utilizations] - specific utilization fields to include'
      },
      fieldsUsers: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Query parameter: fields[users] - specific user fields to include'
      },
      companyIds: {
        type: 'array',
        items: {
          type: 'integer'
        },
        description: 'filter by company ids'
      }
    }
  },
  annotations: {
    title: "Get the Utilization of People in Projects",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

export async function handleGetProjectsPeopleUtilization(input: any) {
  // Map camelCase field names back to API format
  const apiInput: Record<string, any> = { ...input };

  // Define the mapping for fields[...] parameters
  const fieldMappings: Record<string, string> = {
    fieldsUtilizations: "fields[utilizations]",
    fieldsUsers: "fields[users]",
  };

  for (const [camelCaseKey, apiKey] of Object.entries(fieldMappings)) {
    if (apiInput[camelCaseKey] !== undefined) {
      apiInput[apiKey] = apiInput[camelCaseKey];
      delete apiInput[camelCaseKey];
    }
  }

  try {
    const response = await getPeopleUtilization(apiInput);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Getting people utilization');
  }
} 