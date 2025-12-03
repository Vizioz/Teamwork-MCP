/**
 * createCompany tool
 * Creates a new company in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const createCompanyDefinition = {
  name: "createCompany",
  description: "Create a new company. This tool allows you to create a company. The request requires a companyRequest object with various properties like addressOne, emailOne, name, and tags.",
  inputSchema: {
    type: 'object',
    properties: {
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
            },
            required: ['name']
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
        },
        required: ['name']
      },
      options: {
        type: 'object',
        properties: {},
        description: 'Additional options for the request'
      }
    },
    required: ['companyRequest']
  },
  annotations: {
    title: "Create Company",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleCreateCompany(input: any) {
  logger.info('Calling teamworkService.createCompany()');
  
  try {
    const companyData = input.companyRequest;
    
    if (!companyData || !companyData.name) {
      throw new Error("Company name is required");
    }
    
    const result = await teamworkService.createCompany(companyData);
    logger.info(`Company created successfully with name: ${companyData.name}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Creating company');
  }
} 