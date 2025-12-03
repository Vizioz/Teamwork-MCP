/**
 * deleteCompany tool
 * Deletes a company from Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const deleteCompanyDefinition = {
  name: "deleteCompany",
  description: "This tool allows you to delete a company, be careful with this tool as it will delete the company and all associated data. It requires the following parameters: companyId.",
  inputSchema: {
    type: 'object',
    properties: {
      companyId: {
        type: 'integer',
        description: 'Path parameter: companyId'
      }
    },
    required: [
      'companyId'
    ]
  },
  annotations: {
    title: "Delete Company",
    readOnlyHint: false,
    destructiveHint: true,
    openWorldHint: false
  }
};

// Tool handler
export async function handleDeleteCompany(input: any) {
  logger.info('Calling teamworkService.deleteCompany()');
  logger.info(`Company ID: ${input?.companyId}`);
  
  try {
    const companyId = input.companyId;
    
    if (!companyId) {
      throw new Error("Company ID is required");
    }
    
    const result = await teamworkService.deleteCompany(companyId);
    logger.info(`Company deleted successfully with ID: ${companyId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({ success: result }, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Deleting company');
  }
} 