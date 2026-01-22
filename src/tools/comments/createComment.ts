/**
 * createComment tool
 * Creates a new comment for a specific resource in Teamwork
 */

import logger from "../../utils/logger.js"; 
import teamworkService from "../../services/index.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const createCommentDefinition = {
  name: "createComment",
  description: "Creates a new comment for a specific resource (tasks, milestones, notebooks, links, fileversions) in Teamwork",
  inputSchema: {
    type: "object",
    properties: {
      resource: {
        type: "string",
        description: "The resource type (tasks, milestones, notebooks, links, fileversions)",
        enum: ["tasks", "milestones", "notebooks", "links", "fileversions"]
      },
      resourceId: {
        type: "string",
        description: "The ID of the resource to add a comment to"
      },
      body: {
        type: "string",
        description: "The content of the comment"
      },
      notify: {
        type: "string",
        description: "Who to notify ('all' to notify all project users, 'true' to notify followers, specific user IDs, or empty for no notification)",
        default: ""
      },
      isPrivate: {
        type: "boolean",
        description: "Whether the comment should be private",
        default: false
      },
      pendingFileAttachments: {
        type: "string",
        description: "Comma-separated list of pending file references to attach to the comment"
      },
      contentType: {
        type: "string",
        description: "Content type of the comment (html or plain text)",
        enum: ["html", "plaintext"],
        default: "plaintext"
      },
      authorId: {
        type: "string",
        description: "ID of the user to post as (only for admins)"
      }
    },
    required: ["resource", "resourceId", "body"]
  },
  annotations: {
    title: "Create Comment",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleCreateComment(input: any) {
  logger.info('Calling teamworkService.createComment()');
  logger.info(`Resource: ${input?.resource}, Resource ID: ${input?.resourceId}`);
  
  try {
    const resource = input.resource;
    const resourceId = input.resourceId;
    const commentData: any = {};
    
    // Set required fields
    commentData.body = input.body;
    
    // Set optional fields if provided
    if (input.notify !== undefined) commentData.notify = input.notify;
    if (input.isPrivate !== undefined) commentData['isprivate'] = input.isPrivate;
    if (input.pendingFileAttachments) commentData.pendingFileAttachments = input.pendingFileAttachments;
    if (input.contentType === 'html') commentData['content-type'] = 'html';
    if (input.authorId) commentData['author-id'] = input.authorId;
    
    const result = await teamworkService.createComment(resource, resourceId, commentData);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Creating comment');
  }
} 