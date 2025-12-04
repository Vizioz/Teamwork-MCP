import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Prompt
} from "@modelcontextprotocol/sdk/types.js";

import logger from "./utils/logger.js";
import config, { filterTools } from "./utils/config.js";
import { ensureApiClient } from "./services/core/apiClient.js";

// Import tool definitions and handlers
import {
  toolDefinitions,
  toolHandlersMap
} from "./tools/index.js";

// Create MCP server using the high-level McpServer API
const mcpServer = new McpServer(
  {
    name: 'teamwork-mcp',
    version: '0.1.20'
  },
  {
    capabilities: {
      tools: {}
    },
  }
);

// Access the underlying Server for advanced request handlers
const server = mcpServer.server;

/**
 * Validates and sanitizes a response to ensure it can be properly serialized
 * @param response The response to validate
 * @returns A sanitized response that can be safely serialized
 */
function validateResponse(response: any): any {
  // If response is null or undefined, return a default response
  if (response === null || response === undefined) {
    logger.warn('Response is null or undefined, returning default response');
    return {
      content: [{
        type: "text",
        text: "Operation completed, but no response data was returned."
      }]
    };
  }
  
  // Check if response has the expected structure
  if (!response.content || !Array.isArray(response.content)) {
    logger.warn('Response is missing content array, wrapping in proper format');
    return {
      content: [{
        type: "text",
        text: typeof response === 'object' ? JSON.stringify(response) : String(response)
      }]
    };
  }
  
  // Validate each content item
  const validContent = response.content.map((item: any) => {
    if (!item || typeof item !== 'object') {
      return { type: "text", text: String(item) };
    }
    
    if (!item.type) {
      item.type = "text";
    }
    
    if (!item.text) {
      item.text = item.type === "text" ? "No text content" : "";
    }
    
    return item;
  });
  
  // Return sanitized response
  return {
    content: validContent
  };
}

/**
 * Handler that lists available tools.
 * Exposes tools for interacting with Teamwork API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Filter tools based on allow and deny lists
  const filteredTools = filterTools(toolDefinitions, config.allowTools, config.denyTools);
  
  logger.info(`Exposing ${filteredTools.length} of ${toolDefinitions.length} available tools`);
  
  return {
    tools: filteredTools
  };
});

/**
 * Handler for tool calls.
 * Processes requests to call Teamwork API tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const name = request.params.name;
    const input = request.params.arguments;
    
    logger.info(`Tool call received: ${name}`);
    logger.info(`Tool arguments: ${JSON.stringify(input || {})}`);
    
    // Check if the tool is allowed based on allow/deny lists
    const isToolAllowed = filterTools(
      toolDefinitions.filter(tool => tool.name === name),
      config.allowTools,
      config.denyTools
    ).length > 0;
    
    if (!isToolAllowed) {
      logger.error(`Tool call rejected: ${name} is not in the allowed tools list or is in the denied tools list`);
      throw new Error(`Tool '${name}' is not available. Check your allow/deny list configuration.`);
    }
    
    let response;
    
    // Get the handler function for the requested tool
    const handler = toolHandlersMap[name];
    
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    // Call the handler with the input
    response = await handler(input);
    
    // Log the response for debugging
    logger.info(`Tool response structure: ${JSON.stringify(Object.keys(response || {}))}`);
    try {
      const responseStr = JSON.stringify(response);
      logger.info(`Tool response JSON (first 200 chars): ${responseStr.substring(0, 200)}...`);
      
      // Validate that the response can be parsed back
      JSON.parse(responseStr);
      logger.info("Response JSON is valid");
    } catch (jsonError: any) {
      logger.error(`Invalid JSON in response: ${jsonError.message}`);
      logger.error(`Response that caused error: ${JSON.stringify(response)}`);
      
      // Sanitize the response
      response = validateResponse(response);
      logger.info("Response sanitized");
    }
    
    // Final validation to ensure response is properly formatted
    response = validateResponse(response);
    
    return response;
  } catch (error: any) {
    logger.error(`MCP tool error: ${error.message}`);
    throw new Error(`Tool execution failed: ${error.message}`);
  }
});

// const prompts: Prompt[] = [
//   {
//     name: "About the Teamwork MCP",
//     description: "This prompt is used to provide information about the Teamwork MCP",
//     instructions: "You are a helpful assistant that can help with tasks in Teamwork which is a project management tool that is used to manage projects, tasks, and other resources. You can use the following tools to help with your tasks: " + toolDefinitions.map(tool => tool.name).join(", ")
//   }, 
//   {
//     name: "How to find the project ID",
//     description: "This prompt is used to get the current project ID from Teamwork",
//     instructions:  "To find the ID of the current project you can follow these steps: \n" + 
//     " 1) If a project ID is provided by the user, use that. \n" + 
//     " 2) If a project name is provided, use the `getProjects` function to try and find the project, if found use that project ID \n" + 
//     " 3) If no project ID or name was provided, check the `.teamwork` file to see if one has been stored and use that, this file should be located in the root of the solution \n" + 
//     " 4) If none of the above have found a project ID, get a list of all projects using the `getProjects` function and ask the user which project they are working on, then ask them if they would like you to store this as a default before continuing, if they do, store the project ID in the `.teamwork` file in the root of the solution. \n" +
//     " ** If a project ID is not stored in the `.teamwork` file, always ask the user which project they are working on, then ask them if they would like you to store this as a default before continuing, if they do, store the project ID in the `.teamwork` file in the root of the solution. ** \n"
//   }
// ]

// server.setRequestHandler(ListPromptsRequestSchema, async () => {
//   // Filter tools based on allow and deny lists
//   return {
//     prompts: prompts
//   };
// });

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
    try {
        // Log startup information to file only
        logger.info('=== Teamwork MCP Server Starting ===');
        logger.info(`Server name: teamwork-mcp`);
        logger.info(`Server version: 0.1.20`);
        logger.info(`Node.js version: ${process.version}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        
        // Log configuration status
        logger.info('Configuration status:');
        logger.info(`- Teamwork domain: ${config.domain || 'Not set'}`);
        logger.info(`- API URL: ${config.apiUrl || 'Not set'}`);
        logger.info(`- Username: ${config.username ? 'Set' : 'Not set'}`);
        logger.info(`- Password: ${config.password ? 'Set' : 'Not set'}`);
        logger.info(`- Project ID: ${config.projectId || 'Not set'}`);
        logger.info(`- Allow tools: ${config.allowTools || 'All tools allowed'}`);
        logger.info(`- Deny tools: ${config.denyTools || 'No tools denied'}`);
        logger.info(`- Logging: ${config.loggingDisabled ? 'Disabled' : 'Enabled'}`);
        
        // Validate configuration
        if (!config.isValid) {
            logger.error('Invalid configuration. Please check your settings.');
        }
        
        // Test API connection
        try {
            const api = ensureApiClient();
            logger.info('API client initialized successfully');
        } catch (apiError: any) {
            logger.error(`API client initialization failed: ${apiError.message}`);
        }
        
        // Connect using stdio transport - no console output
        logger.info('Connecting to stdio transport...');
        const transport = new StdioServerTransport();
        await mcpServer.connect(transport);
        logger.info('Server connected to stdio transport successfully');
        logger.info('=== Teamwork MCP Server Ready ===');
    } catch (error: any) {
        logger.error(`Server startup error: ${error.message}`);
        if (error.stack) {
            logger.error(`Stack trace: ${error.stack}`);
        }
    }
}

main().catch((error) => {
    logger.error("Unhandled server error:", error);
    if (error.stack) {
        logger.error(`Stack trace: ${error.stack}`);
    }
    process.exit(1);
});
