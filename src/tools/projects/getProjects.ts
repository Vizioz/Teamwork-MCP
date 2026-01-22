/**
 * getProjects tool
 * Retrieves projects from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getProjectsDefinition = {
  name: "getProjects",
  description: "Get all projects from Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      // String parameters
      updatedAfter: {
        type: "string",
        description: "Filter projects updated after this date-time (format: ISO 8601)"
      },
      timeMode: {
        type: "string",
        enum: ["timelogs", "estimated"],
        description: "Profitability time mode"
      },
      searchTerm: {
        type: "string",
        description: "Filter by project name"
      },
      reportType: {
        type: "string",
        enum: ["project", "health"],
        description: "Define the type of the report"
      },
      reportTimezone: {
        type: "string",
        description: "Configure the report dates displayed in a timezone"
      },
      reportFormat: {
        type: "string",
        enum: ["csv", "html", "pdf", "xls"],
        description: "Define the format of the report"
      },
      projectType: {
        type: "string",
        description: "Filter by project type"
      },
      orderMode: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Order mode"
      },
      orderBy: {
        type: "string",
        enum: ["companyname", "datecreated", "duedate", "lastactivity", "name", "namecaseinsensitive", "ownercompany", "starred", "categoryname"],
        description: "Order by field"
      },
      notCompletedBefore: {
        type: "string",
        description: "Filter by projects that have not been completed before the given date (format: YYYY-MM-DD)"
      },
      minLastActivityDate: {
        type: "string",
        description: "Filter by min last activity date (format: YYYY-MM-DD)"
      },
      maxLastActivityDate: {
        type: "string",
        description: "Filter by max last activity date (format: YYYY-MM-DD)"
      },
      
      // Integer parameters
      userId: {
        type: "integer",
        description: "Filter by user id"
      },
      pageSize: {
        type: "integer",
        description: "Number of items in a page (not used when generating reports)"
      },
      page: {
        type: "integer",
        description: "Page number (not used when generating reports)"
      },
      orderByCustomFieldId: {
        type: "integer",
        description: "Order by custom field id when orderBy is equal to customfield"
      },
      minBudgetCapacityUsedPercent: {
        type: "integer",
        description: "Filter by minimum budget capacity used"
      },
      maxBudgetCapacityUsedPercent: {
        type: "integer",
        description: "Filter by maximum budget capacity used"
      },
      
      // Boolean parameters
      includeArchivedProjects: {
        type: "boolean",
        description: "Include archived projects"
      },
      includeCompletedProjects: {
        type: "boolean",
        description: "Include completed projects"
      },
      includeProjectOwner: {
        type: "boolean",
        description: "Include project owner"
      },
      includeProjectCreator: {
        type: "boolean",
        description: "Include project creator"
      },
      includeProjectCompany: {
        type: "boolean",
        description: "Include project company"
      },
      includeProjectCategory: {
        type: "boolean",
        description: "Include project category"
      },
      includeProjectTags: {
        type: "boolean",
        description: "Include project tags"
      },
      includeProjectStatus: {
        type: "boolean",
        description: "Include project status"
      },
      includeProjectHealth: {
        type: "boolean",
        description: "Include project health"
      },
      includeProjectBudget: {
        type: "boolean",
        description: "Include project budget"
      },
      includeProjectProfitability: {
        type: "boolean",
        description: "Include project profitability"
      },
      includeProjectCustomFields: {
        type: "boolean",
        description: "Include project custom fields"
      },
      includeProjectBillingMethod: {
        type: "boolean",
        description: "Include project billing method"
      },
      includeProjectRateCards: {
        type: "boolean",
        description: "Include project rate cards"
      },
      includeProjectRateCardRates: {
        type: "boolean",
        description: "Include project rate card rates"
      },
      includeProjectRateCardCurrencies: {
        type: "boolean",
        description: "Include project rate card currencies"
      },
      includeProjectRateCardUsers: {
        type: "boolean",
        description: "Include project rate card users"
      },
      includeProjectRateCardUserRates: {
        type: "boolean",
        description: "Include project rate card user rates"
      },
      includeProjectRateCardUserCurrencies: {
        type: "boolean",
        description: "Include project rate card user currencies"
      },
      includeProjectRateCardTasks: {
        type: "boolean",
        description: "Include project rate card tasks"
      },
      includeProjectRateCardTaskRates: {
        type: "boolean",
        description: "Include project rate card task rates"
      },
      includeProjectRateCardTaskCurrencies: {
        type: "boolean",
        description: "Include project rate card task currencies"
      }
    }
  },
  annotations: {
    title: "Get Projects",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetProjects(input: any) {
  logger.info('=== getProjects tool called ===');
  logger.info(`Query parameters: ${JSON.stringify(input || {})}`);
  
  try {
    logger.info('Calling teamworkService.getProjects()');
    const projects = await teamworkService.getProjects(input);
    
    // Debug the response
    logger.info(`Projects response type: ${typeof projects}`);
    
    if (projects === null || projects === undefined) {
      logger.warn('Projects response is null or undefined');
      return {
        content: [{
          type: "text",
          text: "No projects found or API returned empty response."
        }]
      };
    } else if (Array.isArray(projects)) {
      logger.info(`Projects array length: ${projects.length}`);
      if (projects.length === 0) {
        return {
          content: [{
            type: "text",
            text: "No projects found. The API returned an empty array."
          }]
        };
      }
    } else if (typeof projects === 'object') {
      // Check if it's a paginated response with 'projects' property
      if (projects.projects && Array.isArray(projects.projects)) {
        logger.info(`Projects array found in response object. Length: ${projects.projects.length}`);
        if (projects.projects.length === 0) {
          return {
            content: [{
              type: "text",
              text: "No projects found. The API returned an empty projects array."
            }]
          };
        }
      } else {
        logger.info(`Projects response is an object: ${JSON.stringify(projects).substring(0, 200)}...`);
      }
    } else {
      logger.info(`Projects response is not an array or object: ${JSON.stringify(projects).substring(0, 200)}...`);
    }
    
    try {
      const jsonString = JSON.stringify(projects, null, 2);
      logger.info(`Successfully stringified projects response`);
      logger.info('=== getProjects tool completed successfully ===');
      return {
        content: [{
          type: "text",
          text: jsonString
        }]
      };
    } catch (jsonError: any) {
      logger.error(`JSON stringify error: ${jsonError.message}`);
      return {
        content: [{
          type: "text",
          text: `Error converting response to JSON: ${jsonError.message}`
        }]
      };
    }
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving projects');
  }
} 