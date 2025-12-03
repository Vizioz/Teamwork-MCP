/**
 * updateCompany tool
 * Updates an existing company in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const updateCompanyDefinition = {
  name: "updateCompany",
  description: "This tool allows you to update a company. It requires parameters: companyId and companyRequest.",
  inputSchema: {
    type: 'object',
    properties: {
      companyId: {
        type: 'integer',
        description: 'Path parameter: companyId'
      },
      companyRequest: {
        type: 'object',
        properties: {
          addressOne: {
            type: 'string',
            description: 'First line of address'
          },
          addressTwo: {
            type: 'string',
            description: 'Second line of address'
          },
          city: {
            type: 'string',
            description: 'City'
          },
          company: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Company name'
              }
            }
          },
          countryCode: {
            type: 'string',
            description: 'Country code'
          },
          emailOne: {
            type: 'string',
            description: 'First email address'
          },
          emailTwo: {
            type: 'string',
            description: 'Second email address'
          },
          fax: {
            type: 'string',
            description: 'Fax number'
          },
          name: {
            type: 'string',
            description: 'Company name'
          },
          phone: {
            type: 'string',
            description: 'Phone number'
          },
          state: {
            type: 'string',
            description: 'State'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of tags'
          },
          website: {
            type: 'string',
            description: 'Website URL'
          },
          zip: {
            type: 'string',
            description: 'ZIP/Postal code'
          }
        }
      },
      options: {
        type: 'object',
        properties: {},
        description: 'Additional options for the request'
      }
    },
    required: [
      'companyId',
      'companyRequest'
    ]
  },
  annotations: {
    title: "Update Company",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleUpdateCompany(input: any) {
  logger.info('Calling teamworkService.updateCompany()');
  logger.info(`Company ID: ${input?.companyId}`);
  
  try {
    const companyId = input.companyId;
    const companyData = input.companyRequest;
    
    if (!companyId) {
      throw new Error("Company ID is required");
    }
    
    if (!companyData) {
      throw new Error("Company data is required for update");
    }
    
    const result = await teamworkService.updateCompany(companyId, companyData);
    logger.info(`Company updated successfully with ID: ${companyId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Updating company');
  }
} 