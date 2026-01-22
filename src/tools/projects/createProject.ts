/**
 * createProject tool
 * Creates a new project in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService, { CreateProjectData } from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const createProjectDefinition = {
  name: "createProject",
  description: "Create a new project in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the project (required)"
      },
      description: {
        type: "string",
        description: "The description of the project"
      },
      companyId: {
        type: "integer",
        description: "The ID of the company the project belongs to"
      },
      categoryId: {
        type: "integer",
        description: "The ID of the category the project belongs to"
      },
      startDate: {
        type: "string",
        description: "The start date of the project (format: YYYYMMDD)"
      },
      endDate: {
        type: "string",
        description: "The end date of the project (format: YYYYMMDD)"
      },
      status: {
        type: "string",
        description: "The status of the project"
      }
    },
    required: ["name"]
  },
  annotations: {
    title: "Create a Project",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleCreateProject(input: any) {
  logger.info('Calling teamworkService.createProject()');
  logger.info(`Project name: ${input?.name}`);

  try {
    if (!input?.name) {
      throw new Error("Project name is required");
    }
    
    // Prepare project data
    const projectData: CreateProjectData = {
      name: input.name
    };
      
    // Add optional fields if provided
    if (input.description) projectData.description = input.description;
    if (input.companyId) projectData.companyId = input.companyId;
    if (input.categoryId) projectData.categoryId = input.categoryId;
    if (input.startDate) projectData.startDate = input.startDate;
    if (input.endDate) projectData.endDate = input.endDate;
    if (input.status) projectData.status = input.status;
    
    // Add any other properties that might be in the input
    Object.keys(input).forEach(key => {
      if (!['name', 'description', 'companyId', 'categoryId', 'startDate', 'endDate', 'status'].includes(key)) {
        projectData[key] = input[key];
      }
    });
    
    // Call the service to create the project
    const result = await teamworkService.createProject(projectData);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Creating project');
  }
} 