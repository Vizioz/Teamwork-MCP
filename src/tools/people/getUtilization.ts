import getUtilization from '../../services/people/getUtilization.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

export const getProjectsReportingUtilizationDefinition = {
  name: "getProjectsReportingUtilization",
  description: "Generate utilization report in various formats (CSV, HTML, PDF, XLSX). Generates a utilization report containing all people for the provided filters. Only the people that the logged-in user can access will be returned.",
  inputSchema: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        description: 'The format of the report',
        enum: ['csv', 'html', 'pdf', 'xlsx']
      },
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
        description: 'SkipCounts allows you to skip doing counts on a list API endpoint for performance reasons.'
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
        description: 'filter by userIds'
      },
      teamIds: {
        type: 'array',
        description: 'filter by team ids'
      },
      selectedColumns: {
        type: 'array',
        description: 'customise the report by selecting columns to be displayed.'
      },
      projectIds: {
        type: 'array',
        description: 'filter by project ids'
      },
      jobRoleIds: {
        type: 'array',
        description: 'filter by jobrole ids'
      },
      include: {
        type: 'array',
        description: 'include'
      },
      fieldsUtilizations: {
        type: 'array',
        description: 'Query parameter: fields[utilizations]'
      },
      fieldsUsers: {
        type: 'array',
        description: 'Query parameter: fields[users]'
      },
      companyIds: {
        type: 'array',
        description: 'filter by company ids'
      }
    },
    required: ['format']
  },
  annotations: {
    title: "Get the Utilization of People in Projects",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetProjectsReportingUtilization(input: any) {
  try {
    const data = await getUtilization({ ...input, format: input.format.toLowerCase() });
    return {
      content: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Getting utilization report');
  }
} 