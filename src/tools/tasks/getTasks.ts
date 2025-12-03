/**
 * getTasks tool
 * Retrieves all tasks from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getTasksDefinition = {
  name: "getTasks",
  description: "Get tasks, Return multiple tasks according to the optional provided filter.",
  inputSchema: {
  type: "object",
  properties: {
    updatedBefore: {
      type: "string",
      description: "filter by updated before date"
    },
    updatedAfter: {
      type: "string",
      description: "filter by updated after date"
    },
    today: {
      type: "string",
      description: "filter by today"
    },
    taskFilter: {
      type: "string",
      description: "filter by a taskFilter",
      enum: [
        "all",
        "anytime",
        "completed",
        "created",
        "overdue",
        "today",
        "yesterday",
        "started",
        "tomorrow",
        "thisweek",
        "within7",
        "within14",
        "within30",
        "within365",
        "nodate",
        "noduedate",
        "nostartdate",
        "newTaskDefaults",
        "hasDate"
      ]
    },
    startDate: {
      type: "string",
      description: "filter on start date"
    },
    searchTerm: {
      type: "string",
      description: "filter by search term"
    },
    reportType: {
      type: "string",
      description: "define the type of the report",
      enum: [
        "plannedvsactual",
        "task",
        "tasktime"
      ]
    },
    reportFormat: {
      type: "string",
      description: "define the format of the report",
      enum: [
        "html",
        "pdf"
      ]
    },
    priority: {
      type: "string",
      description: "filter by task priority"
    },
    orderMode: {
      type: "string",
      description: "order mode",
      enum: [
        "asc",
        "desc"
      ]
    },
    orderBy: {
      type: "string",
      description: "order by",
      enum: [
        "startdate",
        "createdat",
        "priority",
        "project",
        "flattenedtasklist",
        "company",
        "manual",
        "active",
        "completedat",
        "duestartdate",
        "alldates",
        "tasklistname",
        "tasklistdisplayorder",
        "tasklistid",
        "duedate",
        "updatedat",
        "taskname",
        "createdby",
        "completedby",
        "assignedto",
        "taskstatus",
        "taskduedate",
        "customfield",
        "estimatedtime",
        "boardcolumn",
        "taskgroupid",
        "taskgroupname",
        "taskgroup",
        "displayorder",
        "projectmanual",
        "stagedisplayorder",
        "stage"
      ]
    },
    notCompletedBefore: {
      type: "string",
      description: "filter by projects that have not been completed before the given date"
    },
    endDate: {
      type: "string",
      description: "filter on end date"
    },
    dueBefore: {
      type: "string",
      description: "filter before a due date"
    },
    dueAfter: {
      type: "string",
      description: "filter after a due date"
    },
    deletedAfter: {
      type: "string",
      description: "filter on deleted after date"
    },
    createdFilter: {
      type: "string",
      description: "filter by created filter",
      enum: [
        "anytime",
        "today",
        "yesterday",
        "custom"
      ]
    },
    createdDateCode: {
      type: "string",
      description: "filter by created date code"
    },
    createdBefore: {
      type: "string",
      description: "filter by created before date"
    },
    createdAfter: {
      type: "string",
      description: "filter by created after date"
    },
    completedBefore: {
      type: "string",
      description: "filter by completed before date"
    },
    completedAfter: {
      type: "string",
      description: "filter by completed after date"
    },
    updatedByUserId: {
      type: "integer",
      description: "filter by updated user id"
    },
    parentTaskId: {
      type: "integer",
      description: "filter by parent task ids"
    },
    pageSize: {
      type: "integer",
      description: "number of items in a page"
    },
    page: {
      type: "integer",
      description: "page number"
    },
    orderByCustomFieldId: {
      type: "integer",
      description: "order by custom field id when orderBy is equal to custom field"
    },
    includeTaskId: {
      type: "integer",
      description: "include task id"
    },
    filterId: {
      type: "integer",
      description: "provide a user saved filter ID"
    },
    completedByUserId: {
      type: "integer",
      description: "filter by completed user id"
    },
    useTaskDateRange: {
      type: "boolean",
      description: "use date range logic from table when getting the tasks"
    },
    useStartDatesForTodaysTasks: {
      type: "boolean",
      description: "use start dates for todays tasks"
    },
    useFormulaFields: {
      type: "boolean",
      description: "use formula fields"
    },
    useAllProjects: {
      type: "boolean",
      description: "filter on all projects"
    },
    sortActiveFirst: {
      type: "boolean",
      description: "sort active tasks first"
    },
    skipCounts: {
      type: "boolean",
      description: "Skip counts allows you to skip doing counts on a list API endpoint for performance reasons."
    },
    showDeleted: {
      type: "boolean",
      description: "include deleted items"
    },
    showCompletedLists: {
      type: "boolean",
      description: "include tasks from completed lists"
    },
    searchCompaniesTeams: {
      type: "boolean",
      description: "include companies and teams in the search term"
    },
    searchAssignees: {
      type: "boolean",
      description: "include assignees in the search"
    },
    onlyUntaggedTasks: {
      type: "boolean",
      description: "only untagged tasks"
    },
    onlyUnplanned: {
      type: "boolean",
      description: "only return tasks that are unplanned. Not assigned, no due date or missing estimated time."
    },
    onlyTasksWithUnreadComments: {
      type: "boolean",
      description: "filter by only tasks with unread comments"
    },
    onlyTasksWithTickets: {
      type: "boolean",
      description: "filter by only tasks with tickets"
    },
    onlyTasksWithEstimatedTime: {
      type: "boolean",
      description: "only return tasks with estimated time"
    },
    onlyStarredProjects: {
      type: "boolean",
      description: "filter by starred projects only"
    },
    onlyAdminProjects: {
      type: "boolean",
      description: "only include tasks from projects where the user is strictly a project admin. site admins have visibility to all projects."
    },
    nestSubTasks: {
      type: "boolean",
      description: "nest sub tasks"
    },
    matchAllTags: {
      type: "boolean",
      description: "match all tags"
    },
    matchAllProjectTags: {
      type: "boolean",
      description: "match all project tags"
    },
    matchAllExcludedTags: {
      type: "boolean",
      description: "match all exclude tags"
    },
    isReportDownload: {
      type: "boolean",
      description: "generate a report export."
    },
    includeUpdate: {
      type: "boolean",
      description: "include tasks latest update action"
    },
    includeUntaggedTasks: {
      type: "boolean",
      description: "include untagged tasks"
    },
    includeTomorrow: {
      type: "boolean",
      description: "filter by include tomorrow"
    },
    includeToday: {
      type: "boolean",
      description: "filter by include today"
    },
    includeTeamUserIds: {
      type: "boolean",
      description: "include members of the given teams"
    },
    includeTasksWithoutDueDates: {
      type: "boolean",
      description: "include tasks without due dates"
    },
    includeTasksWithCards: {
      type: "boolean",
      description: "include tasks with cards"
    },
    includeTasksFromDeletedLists: {
      type: "boolean",
      description: "include tasks from deleted lists"
    },
    includeTasksCount: {
      type: "boolean",
      description: "include total count of tasks for given filter"
    },
    includeRelatedTasks: {
      type: "boolean",
      description: "include ids of active subtasks, dependencies, predecessors"
    },
    includePrivateItems: {
      type: "boolean",
      description: "include private items"
    },
    includeOverdueTasks: {
      type: "boolean",
      description: "include overdue tasks"
    },
    includeOriginalDueDate: {
      type: "boolean",
      description: "include original due date of a task"
    },
    includeCustomFields: {
      type: "boolean",
      description: "include custom fields"
    },
    includeCompletedTasks: {
      type: "boolean",
      description: "include completed tasks"
    },
    includeCompletedPredecessors: {
      type: "boolean",
      description: "include ids of completed predecessors. It must be provided with includeRelatedTasks flag or with the predecessors sideload."
    },
    includeCompanyUserIds: {
      type: "boolean",
      description: "include members of the given companies"
    },
    includeCommentStats: {
      type: "boolean",
      description: "include number of unread and read comments for each task"
    },
    includeBlocked: {
      type: "boolean",
      description: "filter by include blocked"
    },
    includeAttachmentCommentStats: {
      type: "boolean",
      description: "include number of unread and read comments for each file attachment"
    },
    includeAssigneeTeams: {
      type: "boolean",
      description: "include teams related to the responsible user ids"
    },
    includeAssigneeCompanies: {
      type: "boolean",
      description: "include companies related to the responsible user ids"
    },
    includeArchivedProjects: {
      type: "boolean",
      description: "include archived projects"
    },
    includeAllComments: {
      type: "boolean",
      description: "include all comments"
    },
    groupByTasklist: {
      type: "boolean",
      description: "group by tasklist"
    },
    groupByTaskgroup: {
      type: "boolean",
      description: "group by taskgroup"
    },
    getSubTasks: {
      type: "boolean",
      description: "get sub tasks"
    },
    getFiles: {
      type: "boolean",
      description: "get files"
    },
    fallbackToMilestoneDueDate: {
      type: "boolean",
      description: "set due date as milestone due date if due date is null and there's a related milestone"
    },
    extractTemplateRoleName: {
      type: "boolean",
      description: "For tasks created in a project template it's possible to assign a role instead of people, companies or teams. This role is then stored with the task name as a prefix. When this flag is enabled it will extract the role name and return it inside a special field."
    },
    excludeAssigneeNotOnProjectTeams: {
      type: "boolean",
      description: "exclude assignee not on project teams"
    },
    completedOnly: {
      type: "boolean",
      description: "only completed tasks"
    },
    checkForReminders: {
      type: "boolean",
      description: "check if task has reminders"
    },
    allowAssigneesOutsideProject: {
      type: "boolean",
      description: "when filtering by assigned or unassigned tasks, include assignees that are not in the project."
    },
    tasksSelectedColumns: {
      type: "array",
      description: "customize the report by selecting columns to be displayed for tasks report"
    },
    tasklistIds: {
      type: "array",
      description: "filter by tasklist ids"
    },
    taskgroupIds: {
      type: "array",
      description: "filter by taskgroup ids"
    },
    taskIncludedSet: {
      type: "array",
      description: "filter by task included set"
    },
    tags: {
      type: "array",
      description: "filter by tag values"
    },
    tagIds: {
      type: "array",
      description: "filter by tag ids"
    },
    status: {
      type: "array",
      description: "filter by list of task status"
    },
    skipCRMDealIds: {
      type: "array",
      description: "skip crm deal ids"
    },
    selectedColumns: {
      type: "array",
      description: "customize the report by selecting columns to be displayed for planned vs actual."
    },
    responsiblePartyIds: {
      type: "array",
      description: "filter by responsible party ids"
    },
    projectTagIds: {
      type: "array",
      description: "filter by project tag ids"
    },
    projectStatuses: {
      type: "array",
      description: "filter by project status"
    },
    projectOwnerIds: {
      type: "array",
      description: "filter by project owner ids"
    },
    projectIds: {
      type: "array",
      description: "filter by project ids"
    },
    projectHealths: {
      type: "array",
      description: "filter by project healths 0: not set 1: bad 2: ok 3: good"
    },
    projectFeaturesEnabled: {
      type: "array",
      description: "filter by projects that have features enabled"
    },
    projectCompanyIds: {
      type: "array",
      description: "filter by company ids"
    },
    projectCategoryIds: {
      type: "array",
      description: "filter by project category ids"
    },
    includeCustomFieldIds: {
      type: "array",
      description: "include specific custom fields"
    },
    include: {
      type: "array",
      description: "include"
    },
    ids: {
      type: "array",
      description: "filter by task ids"
    },
    followedByUserIds: {
      type: "array",
      description: "filter by followed by user ids"
    },
    filterBoardColumnIds: {
      type: "array",
      description: "filter by board column ids"
    },
    fieldsUsers: {
      type: "array",
      description: "Query parameter: fields[users]",
      items: {
        type: "string",
        enum: [
          "id",
          "firstName",
          "lastName",
          "title",
          "email",
          "companyId",
          "company",
          "isAdmin",
          "isClientUser",
          "isServiceAccount",
          "type",
          "deleted",
          "avatarUrl",
          "lengthOfDay",
          "workingHoursId",
          "workingHour",
          "userRate",
          "userCost",
          "canAddProjects"
        ]
      }
    },
    fieldsTimers: {
      type: "array",
      description: "Query parameter: fields[timers]",
      items: {
        type: "string",
        enum: [
          "id",
          "userId",
          "taskId",
          "projectId",
          "description",
          "running",
          "billable",
          "deleted",
          "dateCreated",
          "dateDeleted",
          "duration",
          "lastStartedAt",
          "serverTime",
          "intervals"
        ]
      }
    },
    fieldsTeams: {
      type: "array",
      description: "Query parameter: fields[teams]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "teamLogo",
          "teamLogoIcon",
          "teamLogoColor"
        ]
      }
    },
    fieldsTasks: {
      type: "array",
      description: "Query parameter: fields[tasks]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "dateUpdated",
          "parentTaskId",
          "isPrivate",
          "status",
          "tasklistId",
          "startDate",
          "dueDate"
        ]
      }
    },
    fieldsTasklists: {
      type: "array",
      description: "Query parameter: fields[tasklists]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "projectId",
          "milestoneId"
        ]
      }
    },
    fieldsTaskgroups: {
      type: "array",
      description: "Query parameter: fields[taskgroups]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "description",
          "displayOrder",
          "projectId",
          "status"
        ]
      }
    },
    fieldsTaskSequences: {
      type: "array",
      description: "Query parameter: fields[taskSequences]",
      items: {
        type: "string",
        enum: [
          "id",
          "installationId",
          "frequency",
          "selectedWeekDays",
          "endDate",
          "monthlyRepeatType",
          "duration",
          "rrule"
        ]
      }
    },
    fieldsTags: {
      type: "array",
      description: "Query parameter: fields[tags]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "color",
          "count"
        ]
      }
    },
    fieldsProjects: {
      type: "array",
      description: "Query parameter: fields[projects]",
      items: {
        type: "string",
        enum: [
          "id",
          "name"
        ]
      }
    },
    fieldsMilestones: {
      type: "array",
      description: "Query parameter: fields[milestones]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "description",
          "deadline",
          "completed",
          "projectId",
          "createdOn",
          "lastChangedOn",
          "creatorUserId",
          "reminder",
          "private",
          "lockdownId",
          "status",
          "completedOn",
          "completerId",
          "percentageComplete"
        ]
      }
    },
    fieldsLockdowns: {
      type: "array",
      description: "Query parameter: fields[lockdowns]",
      items: {
        type: "string",
        enum: [
          "id",
          "userID",
          "updatedAt",
          "itemType",
          "itemID",
          "grantAccessTo"
        ]
      }
    },
    fieldsGroups: {
      type: "array",
      description: "Query parameter: fields[groups]",
      items: {
        type: "string",
        enum: [
          "late",
          "today",
          "tomorrow",
          "later-this-week",
          "next-week",
          "later",
          "no-due-date"
        ]
      }
    },
    fieldsFiles: {
      type: "array",
      description: "Query parameter: fields[files]",
      items: {
        type: "string",
        enum: [
          "isPrivate",
          "latestFileVersionNo",
          "versionId",
          "status",
          "description",
          "lockdownId",
          "tagIds",
          "changeFollowers",
          "commentFollowers",
          "originalName",
          "displayName",
          "isLocked",
          "lockedByUserId",
          "lockedDate",
          "size",
          "uploadedDate",
          "uploadedByUserID",
          "updatedAt",
          "deletedAt",
          "deletedBy",
          "fileSource",
          "projectId",
          "numLikes",
          "reactions",
          "versions",
          "downloadURL",
          "previewURL",
          "thumbURL",
          "relatedItems",
          "commentsCount",
          "commentsCountRead",
          "categoryId"
        ]
      }
    },
    fieldsCustomfields: {
      type: "array",
      description: "Query parameter: fields[customfields]",
      items: {
        type: "string",
        enum: [
          "id",
          "projectId",
          "entity",
          "name",
          "description",
          "type",
          "options",
          "visibilities",
          "isPrivate",
          "required",
          "createdAt",
          "createdByUserId",
          "updatedAt",
          "updatedByUserId",
          "deleted",
          "deletedAt",
          "deletedByUserId"
        ]
      }
    },
    fieldsCustomfieldTasks: {
      type: "array",
      description: "Query parameter: fields[customfieldTasks]",
      items: {
        type: "string",
        enum: [
          "id",
          "customfieldId",
          "value",
          "createdAt",
          "createdBy"
        ]
      }
    },
    fieldsCompanies: {
      type: "array",
      description: "Query parameter: fields[companies]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "logoUploadedToServer",
          "logoImage"
        ]
      }
    },
    fieldsComments: {
      type: "array",
      description: "Query parameter: fields[comments]",
      items: {
        type: "string",
        enum: [
          "id",
          "objectType",
          "objectId",
          "title"
        ]
      }
    },
    fieldsColumns: {
      type: "array",
      description: "Query parameter: fields[columns]",
      items: {
        type: "string",
        enum: [
          "id",
          "name",
          "color",
          "displayOrder",
          "createdAt",
          "updatedAt",
          "settings",
          "sort",
          "sortOrder",
          "deletedAt",
          "project",
          "hasTriggers",
          "deleted",
          "stats",
          "defaultTasklist"
        ]
      }
    },
    fieldsCards: {
      type: "array",
      description: "Query parameter: fields[cards]",
      items: {
        type: "string",
        enum: [
          "id",
          "displayOrder",
          "archived",
          "archivedAt",
          "archivedBy",
          "createdAt",
          "createBy",
          "updatedAt",
          "visible",
          "status",
          "deleteBy",
          "deletedAt"
        ]
      }
    },
    fieldsProjectPermissions: {
      type: "array",
      description: "Query parameter: fields[ProjectPermissions]",
      items: {
        type: "string",
        enum: [
          "viewMessagesAndFiles",
          "viewTasksAndMilestones",
          "viewTime",
          "viewNotebooks",
          "viewRiskRegister",
          "viewEstimatedTime",
          "viewInvoices",
          "addTasks",
          "addRisks",
          "manageCustomFields",
          "addExpenses",
          "editAllTasks",
          "addMilestones",
          "addTaskLists",
          "addMessages",
          "addFiles",
          "addTime",
          "addNotebooks",
          "viewLinks",
          "addLinks",
          "canViewForms",
          "addForms",
          "viewAllTimeLogs",
          "setPrivacy",
          "projectAdministrator",
          "viewProjectUpdate",
          "addProjectUpdate",
          "canViewProjectMembers",
          "canViewProjectBudget",
          "canManageProjectBudget",
          "canViewRates",
          "canManageRates",
          "canViewSchedule",
          "canManageSchedule",
          "receiveEmailNotifications",
          "isObserving",
          "isArchived",
          "active",
          "canAccess",
          "inOwnerCompany",
          "canManagePeople",
          "canViewProjectTemplates",
          "canManageProjectTemplates"
        ]
      }
    },
    expandedIds: {
      type: "array",
      description: "the ids of the expanded tasks"
    },
    excludeTagIds: {
      type: "array",
      description: "filter by excluded tag ids"
    },
    crmDealIds: {
      type: "array",
      description: "filter by crm deal ids"
    },
    createdByUserIds: {
      type: "array",
      description: "filter by creator user ids"
    },
    assigneeTeamIds: {
      type: "array",
      description: "filter by assignee team ids"
    },
    assigneeCompanyIds: {
      type: "array",
      description: "filter by assignee company ids"
    },
    CustomFields: {
      type: "array",
      description: "filter by custom fields"
    }
  }
},
  annotations: {
    title: "Get Tasks from Teamwork",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  }
};


// Tool handler
export async function handleGetTasks(input: any) {
  logger.info("Calling teamworkService.getTasks()");
  
  // Map camelCase field names back to API format
  const apiInput: Record<string, any> = { ...input };

  // Define the mapping for fields[...] parameters
  const fieldMappings: Record<string, string> = {
    fieldsUsers: "fields[users]",
    fieldsTimers: "fields[timers]",
    fieldsTeams: "fields[teams]",
    fieldsTasks: "fields[tasks]",
    fieldsTasklists: "fields[tasklists]",
    fieldsTaskgroups: "fields[taskgroups]",
    fieldsTaskSequences: "fields[taskSequences]",
    fieldsTags: "fields[tags]",
    fieldsProjects: "fields[projects]",
    fieldsMilestones: "fields[milestones]",
    fieldsLockdowns: "fields[lockdowns]",
    fieldsGroups: "fields[groups]",
    fieldsFiles: "fields[files]",
    fieldsCustomfields: "fields[customfields]",
    fieldsCustomfieldTasks: "fields[customfieldTasks]",
    fieldsCompanies: "fields[companies]",
    fieldsComments: "fields[comments]",
    fieldsColumns: "fields[columns]",
    fieldsCards: "fields[cards]",
    fieldsProjectPermissions: "fields[ProjectPermissions]",
  };

  for (const [camelCaseKey, apiKey] of Object.entries(fieldMappings)) {
    if (apiInput[camelCaseKey] !== undefined) {
      apiInput[apiKey] = apiInput[camelCaseKey];
      delete apiInput[camelCaseKey];
    }
  }
  
  try {
    const tasks = await teamworkService.getTasks(apiInput);
    logger.info("Tasks response received");
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(tasks, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving tasks');
  }
} 