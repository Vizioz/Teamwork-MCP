/**
 * getCompanyById tool
 * Gets a specific company from Teamwork by ID
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const getCompanyByIdDefinition = {
  name: "getCompanyById",
  description: "Get a specific company by ID. Retrieves detailed information about a company identified by its ID.",
  inputSchema: {
    type: 'object',
    properties: {
      companyId: {
        type: 'integer',
        description: 'The ID of the company to retrieve'
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
    },
    required: ['companyId']
  },
  annotations: {
    title: "Get Company by ID",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleGetCompanyById(input: any) {
  logger.info('Calling teamworkService.getCompanyById()');
  logger.info(`Company ID: ${input?.companyId}`);
  
  try {
    const companyId = input.companyId;
    
    if (!companyId) {
      throw new Error("Company ID is required");
    }
    
    // Prepare query parameters
    const params = { ...input };
    delete params.companyId; // Remove companyId from params as it's used in the path
    
    const result = await teamworkService.getCompanyById(companyId, params);
    logger.info(`Successfully retrieved company with ID: ${companyId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Retrieving company');
  }
} 