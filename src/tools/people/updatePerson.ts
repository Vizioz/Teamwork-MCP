/**
 * updatePerson tool
 * Updates a person in Teamwork with new information
 */

import logger from '../../utils/logger.js';
import teamworkService from '../../services/index.js';
import { createErrorResponse } from '../../utils/errorHandler.js';

// Tool definition
export const updatePersonDefinition = {
  name: "updatePerson",
  description: "Update a person in Teamwork. This endpoint allows you to modify user information like timezone, name, email, etc.",
  inputSchema: {
    type: 'object',
    properties: {
      personId: {
        type: 'integer',
        description: 'The ID of the person to update'
      },
      // Field names match the Swagger definition
      "first-name": {
        type: 'string',
        description: 'First name of the person'
      },
      "last-name": {
        type: 'string',
        description: 'Last name of the person'
      },
      "email-address": {
        type: 'string',
        description: 'Email address of the person'
      },
      "title": {
        type: 'string',
        description: 'Job title or position of the person'
      },
      "phone-number-office": {
        type: 'string',
        description: 'Office phone number'
      },
      "timezoneId": {
        type: 'integer',
        description: 'Timezone ID for the person'
      },
      "administrator": {
        type: 'boolean',
        description: 'Make this person an administrator'
      },
      "user-type": {
        type: 'string',
        description: 'User type (account, collaborator, contact)'
      },
      "company-id": {
        type: 'integer',
        description: 'ID of the company the person belongs to'
      }
    },
    required: ['personId']
  },
  annotations: {
    title: "Update a Person",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleUpdatePerson(input: any) {
  logger.info('Calling teamworkService.updatePerson()');
  logger.info(`Person ID: ${input.personId}`);
  
  try {
    const personId = input.personId;
    
    if (!personId) {
      throw new Error("Person ID is required");
    }
    
    // Create update data object with the person wrapper
    const updateData: { person: Record<string, any> } = {
      person: {}
    };
    
    // Copy all fields from input to updateData.person 
    // except personId which is used for the API path
    Object.keys(input).forEach(key => {
      if (key !== 'personId') {
        updateData.person[key] = input[key];
      }
    });
    
    // Make sure we're not sending an empty update
    if (Object.keys(updateData.person).length === 0) {
      throw new Error("At least one field to update must be provided");
    }
    
    logger.info(`Sending update data: ${JSON.stringify(updateData)}`);
    const result = await teamworkService.updatePerson(personId, updateData);
    logger.info(`Successfully updated person with ID: ${personId}`);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Updating person');
  }
} 