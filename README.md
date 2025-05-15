# Teamwork MCP

[![npm version](https://img.shields.io/npm/v/@vizioz/teamwork-mcp.svg)](https://www.npmjs.com/package/@vizioz/teamwork-mcp)
[![smithery badge](https://smithery.ai/badge/@Vizioz/Teamwork-MCP)](https://smithery.ai/server/@Vizioz/Teamwork-MCP)

An MCP server that connects to the Teamwork API, providing a simplified interface for interacting with Teamwork projects and tasks.

## Features

- Connect to Teamwork API
- Retrieve projects and tasks
- Create, update, and delete tasks
- RESTful API endpoints
- Error handling and logging
- MCP server for integration with Cursor and other applications

## Prerequisites

- Node.js (v14.17 or higher, recommend 18+ or even better latest LTS version)
- npm or yarn
- Teamwork account with API access

## Available Teamwork MCP Tools

The following tools are available through the MCP server:

### Project Tools

- `getProjects` - Get all projects from Teamwork
- `getCurrentProject` - Gets details about the current project
- `createProject` - Create a new project in Teamwork

### Task Tools

- `getTasks` - Get all tasks from Teamwork
- `getTasksByProjectId` - Get all tasks from a specific project in Teamwork
- `getTaskListsByProjectId` - Get all task lists from a specific project in Teamwork
- `getTasksByTaskListId` - Gets all tasks from a specific task list ID from Teamwork
- `getTaskById` - Get a specific task by ID from Teamwork
- `createTask` - Create a new task in Teamwork
- `createSubTask` - Create a new subtask under a parent task in Teamwork
- `updateTask` - Update an existing task in Teamwork
- `deleteTask` - Delete a task from Teamwork
- `getTasksMetricsComplete` - Get the total count of completed tasks in Teamwork
- `getTasksMetricsLate` - Get the total count of late tasks in Teamwork
- `getTaskSubtasks` - Get all subtasks for a specific task in Teamwork
- `getTaskComments` - Get comments for a specific task from Teamwork

### Comment Tools

- `createComment` - Create a comment related to a task/message/notebook

### Company Tools

- `getCompanies` - Get all companies from Teamwork with optional filtering
- `getCompanyById` - Get a specific company by ID
- `createCompany` - Create a new company in Teamwork
- `updateCompany` - Update an existing company's information
- `deleteCompany` - Delete a company from Teamwork

### People Tools

- `getPeople` - Get all people from Teamwork
- `getPersonById` - Get a specific person by ID from Teamwork
- `getProjectPeople` - Get all people assigned to a specific project from Teamwork
- `addPeopleToProject` - Add people to a specific project in Teamwork
- `deletePerson` - Delete a person from Teamwork
- `updatePerson` - Update a person's information (timezone, name, email, etc.)
- `getProjectsPeopleMetricsPerformance` - Get people metrics performance
- `getProjectsPeopleUtilization` - Get people utilization
- `getProjectPerson` - Get a specific person on a project

### Reporting Tools

- `getProjectsReportingUserTaskCompletion` - Get user task completion report
- `getProjectsReportingUtilization` - Get utilization report in various formats CSV & HTML

### Time Tools

- `getTime` - Get all time entries
- `getProjectsAllocationsTime` - Get project allocations time
- `getTimezones` - Get all available timezones in Teamwork (useful when updating user timezones)

## Installation

### Installing via Smithery

To install Teamwork API Integration Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@Vizioz/Teamwork-MCP):

```bash
npx -y @smithery/cli install @Vizioz/Teamwork-MCP --client claude
```

1. Clone the repository:

   ``` batch
   git clone https://github.com/readingdancer/teamwork-mcp.git
   cd teamwork-mcp
   ```

2. dependencies:

   ``` batch
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:

   ``` batch
   cp .env.example .env
   ```

4. Update the `.env` file with your Teamwork credentials.

## Configuration

Edit the `.env` file to configure the application:

- `PORT`: The port on which the server will run (default: 3000)
- `NODE_ENV`: The environment (development, production, test)
- `LOG_LEVEL`: Logging level (info, error, debug)
- `TEAMWORK_DOMAIN`: Your Teamwork domain name (e.g., "your-company" for https://your-company.teamwork.com)
- `TEAMWORK_USERNAME`: Your Teamwork username (email)
- `TEAMWORK_PASSWORD`: Your Teamwork password

### Setting Credentials

You can provide your Teamwork credentials in three ways:

1. **Environment Variables**: Set `TEAMWORK_DOMAIN`, `TEAMWORK_USERNAME`, and `TEAMWORK_PASSWORD` in your environment.

2. **.env File**: Create a `.env` file with the required variables as shown above.

3. **Command Line Arguments**: Pass credentials when running the application:

``` batch
   node build/index.js --teamwork-domain=your-company --teamwork-username=your-email@example.com --teamwork-password=your-password
```

Or using short form:

``` batch
   node build/index.js --domain=your-company --user=your-email@example.com --pass=your-password
```

### Tool Filtering

You can control which tools are available to the MCP server using the following command-line arguments:

1. **Allow List**: Only expose specific tools:

   ``` batch
      node build/index.js --allow-tools=getProjects,getTasks,getTaskById
   ```

   Or using short form:

   ``` batch
      node build/index.js --allow=getProjects,getTasks,getTaskById
   ```

2. **Deny List**: Expose all tools except those specified:

   ``` batch
      node build/index.js --deny-tools=deleteTask,updateTask
   ```

   Or using short form:

   ``` batch
      node build/index.js --deny=deleteTask,updateTask
   ```

### Tool Filtering with Groups

You can now specify groups of tools for filtering, allowing for more flexible control over which tools are available to the MCP server. The available groups are:

- **Projects**: Includes all project-related tools.
- **Tasks**: Includes all task-related tools.
- **People**: Includes all people-related tools.
- **Reporting**: Includes all reporting-related tools.
- **Time**: Includes all time-related tools.
- **Comments**: Includes specific comment tools.

### Using Groups in Tool Filtering

You can specify these groups in the allow or deny lists to include or exclude all tools within a group. For example:

1. **Allow List with Groups**: Only expose specific groups of tools:

   ```batch
   node build/index.js --allow-tools=Tasks,People
   ```

   Or using short form:

   ```batch
   node build/index.js --allow=Tasks,People
   ```

2. **Deny List with Groups**: Expose all tools except those in specified groups:

   ```batch
   node build/index.js --deny-tools=Reporting,Time
   ```

   Or using short form:

   ```batch
   node build/index.js --deny=Reporting,Time
   ```

By default, all tools are exposed if neither allow nor deny list is provided. If both are provided, the allow list takes precedence.

The tool filtering is enforced at two levels for enhanced security:

1. When listing available tools (tools not in the allow list or in the deny list won't be visible)
2. When executing tool calls (attempts to call filtered tools will be rejected with an error)

## Setting Up Your Teamwork Project

To associate your current solution with a Teamwork project, you can use the following method:

### Using a Configuration File

You can create a `.teamwork` file in the root of your project with the following structure:

``` batch
PROJECT_ID = YourTeamworkProjectID
```

This simple configuration file associates your solution with a specific Teamwork project, we may use it to store more details in the future.

Once configured, the MCP will be able to find your Teamwork project and associate it with your current solution, reducing the number of API calls needed to get the project and tasks related to the solution you are working on.

## Usage

### Using NPX (Recommended)

The easiest way to use Teamwork MCP is with npx:

```bash
npx teamwork-mcp
```

You can also pass configuration options:

```bash
npx teamwork-mcp --domain=your-company --user=your-email@example.com --pass=your-password
```

### Building the application

*Note: This is not needed if you just want to use the MCP, use the NPX instructions above.*

Build the application:

``` batch
npm run build
```

This will compile the TypeScript code ready to be used as an MCP Server

### Running as an MCP Server

To run as an MCP server for integration with Cursor and other applications, if you are using the .env file for your username, password & url, or if you have saved them in environment variables:

*NOTE: Don't forget to change the drive and path details based on where you have saved the repository.*

``` batch
node C:/your-full-path/build/index.js
```

Or you can pass them using line arguments:

``` batch
node C:/your-full-path/build/index.js --teamwork-domain=your-company --teamwork-username=your-email@example.com --teamwork-password=your-password
```

You can also use the short form:

``` batch
node C:/your-full-path/build/index.js --domain=your-company --user=your-email@example.com --pass=your-password
```

### Using the MCP Inspector

To run the MCP inspector for debugging:

``` batch
npm run inspector
```

## Adding to Cursor (and other MCP Clients)

To add this MCP server to Cursor:

### Versions before 0.47

1. Open Cursor Settings > Features > MCP
2. Click "+ Add New MCP Server"
3. Enter a name for the server (e.g., "Teamwork API")
4. Select "stdio" as the transport type
5. Enter the command to run the server: `npx @vizioz/teamwork-mcp` and add the credentials and domain command line arguments as mentioned above.
   - You can include tool filtering options: `--allow=getProjects,getTasks` or `--deny=deleteTask`
6. Click "Add"

### Versions after 0.47 ( editing the config manually )

``` json
    "Teamwork": {
      "command": "npx",
      "args": [
        "-y",
        "@vizioz/teamwork-mcp",
        "--domain",
        "yourdomain",
        "--user",
        "youruser@yourdomain.com",
        "--pass",
        "yourPassword"
      ]
    }
```

If you want to add the allow or deny arguments mentioned above you just add them like this, you can add any of the examples given above, you can also add both groups and individual tools as shown below:

``` json
    "Teamwork": {
      "command": "npx",
      "args": [
        "-y",
        "@vizioz/teamwork-mcp",
        "--domain",
        "yourdomain",
        "--user",
        "youruser@yourdomain.com",
        "--pass",
        "yourPassword",
        "--allow",
        "Tasks,Projects",
        "--deny",
        "getProjectsPeopleMetricsPerformance,getProjectsPeopleUtilization"
      ]
```

The Teamwork MCP tools will now be available to the Cursor Agent in Composer.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Vizioz/Teamwork-MCP?tab=MIT-1-ov-file#readme) file for details.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by Teamwork.com. The use of the name "Teamwork" in the package name (@vizioz/teamwork-mcp) is solely for descriptive purposes to indicate compatibility with the Teamwork.com API.
