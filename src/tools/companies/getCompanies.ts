/**
 * getCompanies tool
 * Gets all companies from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getCompaniesDefinition = {
  name: "getCompanies",
  description: "Get a list of companies, retrieve all companies for the provided filters. This endpoint allows you to filter companies by various parameters including custom fields, tags, search terms, and more.",
  inputSchema: {
    type: 'object',
    properties: {
      searchTerm: {
        type: 'string',
        description: 'Filter by company name and description'
      },
      page: {
        type: 'integer',
        description: 'Page number for pagination'
      },
      pageSize: {
        type: 'integer',
        description: 'Number of items per page'
      },
      orderBy: {
        type: 'string',
        description: 'Field to order results by (e.g., name, dateadded, etc.)'
      },
      orderMode: {
        type: 'string',
        description: 'Sort order (asc or desc)',
        enum: ['asc', 'desc']
      },
      tagIds: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Filter by tag IDs'
      },
      includeCustomFields: {
        type: 'boolean',
        description: 'Include custom fields in the response'
      },
      fullProfile: {
        type: 'boolean',
        description: 'Include full profile information'
      },
      getStats: {
        type: 'boolean',
        description: 'Include stats of company tasks and projects'
      }
    }
  },
  annotations: {
    title: "Get Companies",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetCompanies(input: any) {
  logger.info('Calling teamworkService.getCompanies()');
  
  try {
    // Prepare query parameters
    const params = { ...input };
    logger.info(`Query parameters: ${JSON.stringify(params)}`);
    
    const result = await teamworkService.getCompanies(params);
    logger.info(`Successfully retrieved companies. Count: ${result?.companies?.length || 0}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving companies');
  }
} 