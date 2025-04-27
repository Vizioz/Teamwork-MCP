/**
 * getTasks tool
 * Retrieves all tasks from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";

// Tool definition
export const getTasksDefinition = {
  name: "getTasks",
  description: "Get all tasks from Teamwork. Return multiple tasks according to the provided filter.\n\nOn this endpoint you can filter by custom fields. The syntax for the\nquery parameter is the following:\n\n    customField[id][op]=value\n\nWhere:\n  - [id] is the custom field ID\n  - [op] is the operator to apply when filtering, different operators are\n    allowed according to the custom field type\n  - [value] is the value to apply when filtering\n\nFor example, if I want to filter a dropdown custom field with ID 10 to only\nreturn entries that have the value \"Option1\" we would do the following:\n\n    customField[10][eq]=Option1\n\nThe allowed operators are:\n  - like\n  - not-like\n  - eq\n  - not\n  - lt\n  - gt\n  - any",
  inputSchema: {
    type: 'object',
    properties: {
      updatedBefore: {
        type: 'string',
        description: 'filter by updated before date'
      },
      updatedAfter: {
        type: 'string',
        description: 'filter by updated after date'
      },
      today: {
        type: 'string',
        description: 'filter by today'
      },
      taskFilter: {
        type: 'string',
        description: 'filter by a taskFilter',
        enum: [
          'all',
          'anytime',
          'completed',
          'created',
          'overdue',
          'today',
          'yesterday',
          'started',
          'tomorrow',
          'thisweek',
          'within7',
          'within14',
          'within30',
          'within365',
          'nodate',
          'noduedate',
          'nostartdate',
          'newTaskDefaults',
          'hasDate'
        ]
      },
      startDate: {
        type: 'string',
        description: 'filter on start date'
      },
      searchTerm: {
        type: 'string',
        description: 'filter by search term'
      },
      reportType: {
        type: 'string',
        description: 'define the type of the report',
        enum: [
          'plannedvsactual',
          'task',
          'tasktime'
        ]
      },
      reportFormat: {
        type: 'string',
        description: 'define the format of the report',
        enum: [
          'html',
          'pdf'
        ]
      },
      priority: {
        type: 'string',
        description: 'filter by task priority'
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
        description: 'order by',
        enum: [
          'startdate',
          'createdat',
          'priority',
          'project',
          'flattenedtasklist',
          'company',
          'manual',
          'active',
          'completedat',
          'duestartdate',
          'alldates',
          'tasklistname',
          'tasklistdisplayorder',
          'tasklistid',
          'duedate',
          'updatedat',
          'taskname',
          'createdby',
          'completedby',
          'assignedto',
          'taskstatus',
          'taskduedate',
          'customfield',
          'estimatedtime',
          'boardcolumn',
          'taskgroupid',
          'taskgroupname',
          'taskgroup',
          'displayorder',
          'projectmanual',
          'stagedisplayorder',
          'stage'
        ]
      },
      projectIds: {
        type: 'array',
        description: 'filter by project ids'
      },
      page: {
        type: 'integer',
        description: 'page number'
      },
      pageSize: {
        type: 'integer',
        description: 'number of items in a page'
      },
      includeCompletedTasks: {
        type: 'boolean',
        description: 'include completed tasks'
      }
    },
    required: []
  }
};

// Tool handler
export async function handleGetTasks() {
  logger.info('Calling teamworkService.getTasks()');
  
  try {
    const tasks = await teamworkService.getTasks();
    logger.info(`Tasks response received`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  } catch (error: any) {
    logger.error(`Error in getTasks handler: ${error.message}`);
    return {
      content: [{
        type: "text",
        text: `Error retrieving tasks: ${error.message}`
      }]
    };
  }
} 