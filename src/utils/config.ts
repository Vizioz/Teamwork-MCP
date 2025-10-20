import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import logger from './logger.js';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

/**
 * Constructs the full Teamwork API URL from a domain name
 * @param domain The Teamwork domain name
 * @returns The full API URL
 */
export const constructApiUrl = (domain: string | undefined): string => {
  if (!domain) {
    logger.error('Teamwork domain is not set. Please set TEAMWORK_DOMAIN in your environment or .env file.');
    return '';
  }
  
  try {
    // Remove any http/https prefix if present
    const cleanDomain = domain.replace(/^(https?:\/\/)/, '');
    
    // Remove .teamwork.com if present (in case user enters full domain)
    const baseDomain = cleanDomain.replace(/\.teamwork\.com$/, '');
    
    // Remove any trailing slashes
    const trimmedDomain = baseDomain.replace(/\/+$/, '');
    
    // Construct the URL
    const url = `https://${trimmedDomain}.teamwork.com/projects/api/v3/`;
    
    logger.info(`Constructed Teamwork API URL: ${url}`);
    return url;
  } catch (error: any) {
    logger.error(`Error constructing Teamwork API URL: ${error.message}`);
    return '';
  }
};

/**
 * Loads configuration from environment variables, .env file, and command line arguments
 * @param args Command line arguments (optional)
 * @returns Configuration object with Teamwork settings
 */
export const loadConfig = (args?: string[]) => {
  // Parse command line arguments if provided
  if (args === undefined) {
    logger.info('No command line arguments provided');
  }

  const argv = args 
    ? minimist(args, {
        string: ['teamwork-domain', 'teamwork-username', 'teamwork-password', 'teamwork-project-id', 'solution-root', 'allow-tools', 'deny-tools'],
        boolean: ['disable-logging', 'no-logging'],
        alias: {
          'domain': 'teamwork-domain',
          'user': 'teamwork-username',
          'pass': 'teamwork-password',
          'project': 'teamwork-project-id',
          'root': 'solution-root',
          'allow': 'allow-tools',
          'deny': 'deny-tools'
        }
      })
    : minimist(process.argv.slice(2), {
        string: ['teamwork-domain', 'teamwork-username', 'teamwork-password', 'teamwork-project-id', 'solution-root', 'allow-tools', 'deny-tools'],
        boolean: ['disable-logging', 'no-logging'],
        alias: {
          'domain': 'teamwork-domain',
          'user': 'teamwork-username',
          'pass': 'teamwork-password',
          'project': 'teamwork-project-id',
          'root': 'solution-root',
          'allow': 'allow-tools',
          'deny': 'deny-tools'
        }
      });

  // Try to load environment variables from .env file if they're not already set
  if (!process.env.TEAMWORK_DOMAIN || !process.env.TEAMWORK_USERNAME || !process.env.TEAMWORK_PASSWORD) {
    try {
      dotenv.config({ path: path.resolve(rootDir, '.env') });
      logger.info('Attempted to load environment variables from .env file');
    } catch (error) {
      logger.warn('Failed to load .env file, will use environment variables or command line arguments');
    }
  }

  // Set environment variables from command line arguments if provided
  if (argv['teamwork-domain']) {
    process.env.TEAMWORK_DOMAIN = argv['teamwork-domain'];
    logger.info('Using TEAMWORK_DOMAIN from command line argument');
  } else if (argv['domain']) {
    process.env.TEAMWORK_DOMAIN = argv['domain'];
    logger.info('Using TEAMWORK_DOMAIN from short form command line argument');
  }

  if (argv['teamwork-username']) {
    process.env.TEAMWORK_USERNAME = argv['teamwork-username'];
    logger.info('Using TEAMWORK_USERNAME from command line argument');
  } else if (argv['user']) {
    process.env.TEAMWORK_USERNAME = argv['user'];
    logger.info('Using TEAMWORK_USERNAME from short form command line argument');
  }

  if (argv['teamwork-password']) {
    process.env.TEAMWORK_PASSWORD = argv['teamwork-password'];
    logger.info('Using TEAMWORK_PASSWORD from command line argument');
  } else if (argv['pass']) {
    process.env.TEAMWORK_PASSWORD = argv['pass'];
    logger.info('Using TEAMWORK_PASSWORD from short form command line argument');
  }

  if (argv['teamwork-project-id']) {
    process.env.TEAMWORK_PROJECT_ID = argv['teamwork-project-id'];
    logger.info('Using TEAMWORK_PROJECT_ID from command line argument');
  } else if (argv['project']) {
    process.env.TEAMWORK_PROJECT_ID = argv['project'];
    logger.info('Using TEAMWORK_PROJECT_ID from short form command line argument');
  }

  if (argv['solution-root']) {
    process.env.SOLUTION_ROOT_PATH = argv['solution-root'];
    logger.info('Using SOLUTION_ROOT_PATH from command line argument');
  } else if (argv['root']) {
    process.env.SOLUTION_ROOT_PATH = argv['root'];
    logger.info('Using SOLUTION_ROOT_PATH from short form command line argument');
  }

  // Set tool filtering options
  if (argv['allow-tools']) {
    process.env.ALLOW_TOOLS = argv['allow-tools'];
    logger.info(`Using ALLOW_TOOLS from command line argument: ${argv['allow-tools']}`);
  } else if (argv['allow']) {
    process.env.ALLOW_TOOLS = argv['allow'];
    logger.info(`Using ALLOW_TOOLS from short form command line argument: ${argv['allow']}`);
  }

  if (argv['deny-tools']) {
    process.env.DENY_TOOLS = argv['deny-tools'];
    logger.info(`Using DENY_TOOLS from command line argument: ${argv['deny-tools']}`);
  } else if (argv['deny']) {
    process.env.DENY_TOOLS = argv['deny'];
    logger.info(`Using DENY_TOOLS from short form command line argument: ${argv['deny']}`);
  }

  // Set logging disable option
  if (argv['disable-logging'] || argv['no-logging']) {
    process.env.DISABLE_LOGGING = 'true';
    // Note: We can't use logger here since it might not be initialized yet
    // The logger itself will check for this environment variable
  }

  // Validate required configuration
  const isConfigValid = validateConfig();

  // Construct the API URL
  const apiUrl = constructApiUrl(process.env.TEAMWORK_DOMAIN);

  return {
    domain: process.env.TEAMWORK_DOMAIN,
    username: process.env.TEAMWORK_USERNAME,
    password: process.env.TEAMWORK_PASSWORD,
    projectId: process.env.TEAMWORK_PROJECT_ID,
    solutionRootPath: process.env.SOLUTION_ROOT_PATH,
    allowTools: process.env.ALLOW_TOOLS,
    denyTools: process.env.DENY_TOOLS,
    loggingDisabled: process.env.DISABLE_LOGGING === 'true',
    apiUrl,
    isValid: isConfigValid
  };
};

/**
 * Validates that all required configuration is present
 * @returns True if configuration is valid, false otherwise
 */
export const validateConfig = (): boolean => {
  const requiredVars = ['TEAMWORK_DOMAIN', 'TEAMWORK_USERNAME', 'TEAMWORK_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    logger.error(`Required environment variables are not set: ${missingVars.join(', ')}`);
    logger.error('You can set these via:');
    logger.error('1. Environment variables');
    logger.error('2. .env file');
    logger.error('3. Command line arguments: --teamwork-domain, --teamwork-username, --teamwork-password');
    logger.error('   or short form: --domain, --user, --pass');
    return false;
  }
  
  logger.info('Environment variables loaded successfully');
  logger.info('TEAMWORK_DOMAIN:', process.env.TEAMWORK_DOMAIN);
  logger.info('TEAMWORK_USERNAME:', process.env.TEAMWORK_USERNAME);
  logger.info('TEAMWORK_PASSWORD length:', process.env.TEAMWORK_PASSWORD ? process.env.TEAMWORK_PASSWORD.length : 0);
  if (process.env.TEAMWORK_PROJECT_ID) {
    logger.info('TEAMWORK_PROJECT_ID:', process.env.TEAMWORK_PROJECT_ID);
  }
  if (process.env.SOLUTION_ROOT_PATH) {
    logger.info('SOLUTION_ROOT_PATH:', process.env.SOLUTION_ROOT_PATH);
  }
  
  return true;
};

/**
 * Saves the current project configuration to a file
 * @param projectId The Teamwork project ID
 * @param solutionRootPath The solution root path
 * @returns True if successful, false otherwise
 */
export const saveProjectConfig = (projectId: string, solutionRootPath?: string): boolean => {
  try {
    const configData: any = {
      teamworkProjectId: projectId
    };
    
    if (solutionRootPath) {
      configData.solutionRootPath = solutionRootPath;
    }
    
    fs.writeFileSync(
      path.resolve(rootDir, 'teamwork.config.json'), 
      JSON.stringify(configData, null, 2)
    );
    
    logger.info(`Saved project configuration to teamwork.config.json`);
    logger.info(`Project ID: ${projectId}`);
    if (solutionRootPath) {
      logger.info(`Solution Root Path: ${solutionRootPath}`);
    }
    
    return true;
  } catch (error: any) {
    logger.error(`Failed to save project configuration: ${error.message}`);
    return false;
  }
};

// Export a default config object for convenience
export default loadConfig();

// Define a mapping of group names to tool names
const toolGroups: Record<string, string[]> = {
  'Projects': ['getProjects', 'getCurrentProject', 'createProject'],
  'Tasks': ['getTasks', 'getTasksByProjectId', 'getTaskListsByProjectId', 'getTaskById', 'createTask', 'createSubTask', 'updateTask', 'deleteTask', 'getTasksMetricsComplete', 'getTasksMetricsLate', 'getTaskSubtasks', 'getTaskComments'],
  'People': ['getPeople', 'getPersonById', 'getProjectPeople', 'addPeopleToProject', 'deletePerson', 'getProjectsPeopleMetricsPerformance', 'getProjectsPeopleUtilization', 'getProjectPerson'],
  'Reporting': ['getProjectsReportingUserTaskCompletion', 'getProjectsReportingUtilization'],
  'Time': ['getTime', 'getProjectsAllocationsTime', 'getTimezones'],
  'Comments': ['createComment'],
  'Companies': ['createCompany', 'updateCompany', 'deleteCompany', 'getCompanies', 'getCompanyById'],
  'Orchestration': ['enqueueHandoff'],
  'Conversations': ['ingestConversationEvent', 'synthesizeConversationThread']
};

// Expand allow and deny lists based on groups
const expandToolList = (list: string[]): string[] => {
  const expandedList = new Set<string>();
  list.forEach(item => {
    if (toolGroups[item]) {
      toolGroups[item].forEach(tool => expandedList.add(tool));
    } else {
      expandedList.add(item);
    }
  });
  return Array.from(expandedList);
};

/**
 * Filters tools based on allow and deny lists
 * @param tools Array of tool definitions
 * @param allowList Comma-separated list of tool names to allow (if provided)
 * @param denyList Comma-separated list of tool names to deny (if provided)
 * @returns Filtered array of tool definitions
 */
export const filterTools = (tools: any[], allowList?: string, denyList?: string): any[] => {
  // If neither allow nor deny list is provided, return all tools
  if (!allowList && !denyList) {
    return tools;
  }

  // Parse allow and deny lists into arrays
  const allowedTools = allowList ? expandToolList(allowList.split(',').map(t => t.trim())) : [];
  const deniedTools = denyList ? expandToolList(denyList.split(',').map(t => t.trim())) : [];

  // Log the filtering that will be applied
  if (allowedTools.length > 0) {
    logger.info(`Filtering tools to allow only: ${allowedTools.join(', ')}`);
  }
  if (deniedTools.length > 0) {
    logger.info(`Filtering tools to deny: ${deniedTools.join(', ')}`);
  }

  // Apply filtering
  return tools.filter(tool => {
    const toolName = tool.name;
    
    // If allow list is provided, only include tools in the allow list
    if (allowedTools.length > 0) {
      // Check if the tool is in the allow list and not in the deny list
      return allowedTools.includes(toolName) && !deniedTools.includes(toolName);
    }
    
    // If deny list is provided, exclude tools in the deny list
    if (deniedTools.length > 0) {
      return !deniedTools.includes(toolName);
    }
    
    // Default case (should not reach here)
    return true;
  });
}; 