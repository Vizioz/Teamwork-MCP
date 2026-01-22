import getUserTaskCompletion from '../../services/reporting/getUserTaskCompletion.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

export const getProjectsReportingUserTaskCompletionDefinition = {
  name: "getProjectsReportingUserTaskCompletion",
  description: "Returns task completions for a given user. Retrieve a person record and its task completion stats.",
  inputSchema: {
    type: 'object',
    properties: {
      userId: {
        type: 'integer',
        description: 'Path parameter: userId'
      },
      userType: {
        type: 'string',
        description: 'user type',
        enum: ['account', 'collaborator', 'contact']
      },
      updatedAfter: {
        type: 'string',
        description: 'date time'
      },
      startDate: {
        type: 'string',
        description: 'start date for task completion report'
      },
      endDate: {
        type: 'string',
        description: 'end date for task completion report'
      },
      searchTerm: {
        type: 'string',
        description: 'filter by comment content'
      },
      reportFormat: {
        type: 'string',
        description: 'define the format of the report'
      },
      orderMode: {
        type: 'string',
        description: 'order mode',
        enum: ['asc', 'desc']
      },
      orderBy: {
        type: 'string',
        description: 'order by',
        enum: ['id', 'name', 'namecaseinsensitive', 'overduetasks', 'assignedtasks', 'completedtasks', 'projects', 'activeprojects']
      },
      lastLoginAfter: {
        type: 'string',
        description: 'Query parameter: lastLoginAfter'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page (not used when generating reports)'
      },
      page: {
        type: 'integer',
        description: 'page number (not used when generating reports)'
      },
      skipCounts: {
        type: 'boolean',
        description: 'SkipCounts allows you to skip doing counts on a list API endpoint for performance reasons.'
      },
      showDeleted: {
        type: 'boolean',
        description: 'include deleted items'
      },
      searchUserJobRole: {
        type: 'boolean',
        description: 'Include user job role in search'
      },
      orderPrioritiseCurrentUser: {
        type: 'boolean',
        description: 'Force to have the current/session user in the response'
      },
      onlySiteOwner: {
        type: 'boolean',
        description: 'Query parameter: onlySiteOwner'
      },
      onlyOwnerCompany: {
        type: 'boolean',
        description: 'return people only from the owner company. This will replace any provided company ID.'
      },
      isReportDownload: {
        type: 'boolean',
        description: 'generate a report document'
      },
      inclusiveFilter: {
        type: 'boolean',
        description: 'make the filter inclusive for user ids, teamIds, companyIds'
      },
      includeServiceAccounts: {
        type: 'boolean',
        description: 'include service accounts'
      },
      includePlaceholders: {
        type: 'boolean',
        description: 'include placeholder users'
      },
      includeCollaborators: {
        type: 'boolean',
        description: 'exclude collaborators types, returning only account and contact.'
      },
      includeClients: {
        type: 'boolean',
        description: 'include clients'
      },
      includeArchivedProjects: {
        type: 'boolean',
        description: 'include archived projects in the report'
      },
      filterByNoCostRate: {
        type: 'boolean',
        description: 'Returns users who are missing cost rates(OCA only)'
      },
      excludeContacts: {
        type: 'boolean',
        description: 'exclude contact types, returning only account and collaborator.'
      },
      teamIds: {
        type: 'array',
        description: 'team ids'
      },
      selectedColumns: {
        type: 'array',
        description: 'customise the report by selecting columns'
      },
      projectIds: {
        type: 'array',
        description: 'filter by project ids'
      },
      jobRoleIds: {
        type: 'array',
        description: 'filter by job role ids'
      },
      include: {
        type: 'array',
        description: 'include (not used when generating reports)'
      },
      ids: {
        type: 'array',
        description: 'filter by user ids'
      },
      fieldsTeams: {
        type: 'array',
        description: 'Query parameter: fields[teams]'
      },
      fieldsPerson: {
        type: 'array',
        description: 'Query parameter: fields[person]'
      },
      fieldsPeople: {
        type: 'array',
        description: 'Query parameter: fields[people]'
      },
      fieldsCompanies: {
        type: 'array',
        description: 'Query parameter: fields[companies]'
      },
      fieldsProjectPermissions: {
        type: 'array',
        description: 'Query parameter: fields[ProjectPermissions]'
      },
      excludeProjectIds: {
        type: 'array',
        description: 'exclude people assigned to certain project id'
      },
      excludeIds: {
        type: 'array',
        description: 'exclude certain user ids'
      },
      companyIds: {
        type: 'array',
        description: 'company ids'
      }
    },
    required: ['userId']
  },
  annotations: {
    title: "Get the Tasks Completed by a User",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

export async function handleGetProjectsReportingUserTaskCompletion(input: any) {
  try {
    const response = await getUserTaskCompletion(input);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving user task completion');
  }
} 