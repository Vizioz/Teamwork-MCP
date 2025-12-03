/**
 * createTask tool
 * Creates a new task in a Teamwork tasklist
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { TaskRequest } from "../../models/TaskRequest.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

export const createTaskDefinition = {
  name: "createTask",
  description: "Creates a task. Create a new task in the provided task list. ",
  inputSchema: {
  type: "object",
  properties: {
    taskRequest: {
      type: "object",
      properties: {
        attachmentOptions: {
          type: "object",
          properties: {
            removeOtherFiles: {
              type: "boolean"
            }
          },
          required: []
        },
        attachments: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "integer"
                  },
                  id: {
                    type: "integer"
                  }
                },
                required: [],
                description: "File stores information about a uploaded file."
              }
            },
            pendingFiles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  categoryId: {
                    type: "integer"
                  },
                  reference: {
                    type: "string"
                  }
                },
                required: [],
                description: "PendingFile stores information about a file uploaded on-the-fly."
              }
            }
          },
          required: []
        },
        card: {
          type: "object",
          properties: {
            columnId: {
              type: "integer"
            }
          },
          required: [],
          description: "Card stores information about the card created with the task."
        },
        predecessors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer"
              },
              type: {
                type: "string"
              }
            },
            required: [],
            description: "Predecessor stores information about task predecessors."
          }
        },
        tags: {
          type: "array",
          items: {
            type: "object",
            properties: {
              color: {
                type: "string"
              },
              name: {
                type: "string"
              },
              projectId: {
                type: "integer"
              }
            },
            required: [],
            description: "Tag contains all the information returned from a tag."
          }
        },
        task: {
          type: "object",
          properties: {
            assignees: {
              type: "object",
              properties: {
                companyIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                teamIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                userIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                }
              },
              required: [],
              description: "UserGroups are common lists for storing users, companies and teams ids together."
            },
            attachmentIds: {
              type: "array",
              items: {
                type: "integer"
              }
            },
            changeFollowers: {
              type: "object",
              properties: {
                companyIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                teamIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                userIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                }
              },
              required: [],
              description: "UserGroups are common lists for storing users, companies and teams ids together."
            },
            commentFollowers: {
              type: "object",
              properties: {
                companyIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                teamIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                userIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                }
              },
              required: [],
              description: "UserGroups are common lists for storing users, companies and teams ids together."
            },
            completedAt: {
              type: "string"
            },
            completedBy: {
              type: "integer"
            },
            createdAt: {
              type: "string"
            },
            createdBy: {
              type: "integer"
            },
            crmDealIds: {
              type: "array",
              items: {
                type: "integer"
              }
            },
            customFields: {
              type: "object",
              properties: {
                Values: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      countryCode: {
                        type: "string"
                      },
                      currencySymbol: {
                        type: "string"
                      },
                      customfieldId: {
                        type: "integer"
                      },
                      urlTextToDisplay: {
                        type: "string"
                      },
                      value: {
                        type: "string"
                      }
                    },
                    required: [],
                    description: "CustomFieldValue contains all the information returned from a customfield."
                  }
                }
              },
              required: [],
              description: "CustomFields is the custom fields type."
            },
            description: {
              type: "string"
            },
            descriptionContentType: {
              type: "string"
            },
            dueAt: {
              type: "string",
              format: "date",
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format `2006-01-02`"
            },
            estimatedMinutes: {
              type: "integer"
            },
            grantAccessTo: {
              type: "object",
              properties: {
                companyIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                teamIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                userIds: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                }
              },
              required: [],
              description: "UserGroups are common lists for storing users, companies and teams ids together."
            },
            hasDeskTickets: {
              type: "boolean"
            },
            name: {
              type: "string"
            },
            originalDueDate: {
              type: "string",
              format: "date",
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format `2006-01-02`"
            },
            parentTaskId: {
              type: "integer"
            },
            priority: {
              type: "string",
              enum: [
                "low",
                "normal",
                "high"
              ],
              description: "NullableTaskPriority implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
            },
            private: {
              type: "boolean"
            },
            progress: {
              type: "integer"
            },
            reminders: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  isRelative: {
                    type: "boolean"
                  },
                  note: {
                    type: "string"
                  },
                  relativeNumberDays: {
                    type: "integer"
                  },
                  remindAt: {
                    type: "string"
                  },
                  type: {
                    type: "string"
                  },
                  userId: {
                    type: "integer"
                  }
                },
                required: [],
                description: "Reminder stores all necessary information to create a task reminder."
              }
            },
            repeatOptions: {
              type: "object",
              properties: {
                duration: {
                  type: "integer"
                },
                editOption: {
                  type: "string"
                },
                endsAt: {
                  type: "string",
                  format: "date",
                  description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format `2006-01-02`"
                },
                frequency: {
                  type: "object",
                  description: "NullableTaskRepeatFrequency implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                monthlyRepeatType: {
                  type: "object",
                  description: "NullableTaskRepeatMonthlyType implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                },
                rrule: {
                  type: "string",
                  description: "Adds the RRule definition for repeating tasks. It replaces all other repeating fields."
                },
                selectedDays: {
                  type: "object",
                  description: "NullableWorkingHourEntryWeekdays implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted."
                }
              },
              required: [],
              description: "RepeatOptions stores recurring information for the task."
            },
            startAt: {
              type: "string",
              format: "date",
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format `2006-01-02`"
            },
            status: {
              type: "string"
            },
            tagIds: {
              type: "array",
              items: {
                type: "integer"
              }
            },
            taskgroupId: {
              type: "integer"
            },
            tasklistId: {
              type: "integer"
            },
            templateRoleName: {
              type: "string"
            },
            ticketId: {
              type: "integer"
            }
          },
          required: [],
          description: "Task contains all the information returned from a task."
        },
        taskOptions: {
          type: "object",
          properties: {
            appendAssignees: {
              type: "boolean"
            },
            checkInvalidusers: {
              type: "boolean"
            },
            everyoneMustDo: {
              type: "boolean"
            },
            fireWebhook: {
              type: "boolean"
            },
            isTemplate: {
              type: "boolean"
            },
            logActivity: {
              type: "boolean"
            },
            notify: {
              type: "boolean"
            },
            parseInlineTags: {
              type: "boolean"
            },
            positionAfterTaskId: {
              type: "integer"
            },
            pushDependents: {
              type: "boolean"
            },
            pushSubtasks: {
              type: "boolean"
            },
            shiftProjectDates: {
              type: "boolean"
            },
            useDefaults: {
              type: "boolean"
            },
            useNotifyViaTWIM: {
              type: "boolean"
            }
          },
          required: [],
          description: "Options contains any options which can be set for the task request"
        },
        workflows: {
          type: "object",
          properties: {
            positionAfterTask: {
              type: "integer"
            },
            stageId: {
              type: "integer"
            },
            workflowId: {
              type: "integer"
            }
          },
          required: [],
          description: "Workflows stores information about where the task lives in the workflow"
        }
      },
      required: [],
      description: "Request body: taskRequest"
    },
    tasklistId: {
      type: "integer",
      description: "Path parameter: tasklistId"
    }
  },
  required: [
    "taskRequest",
    "tasklistId"
  ]
  },
  annotations: {
    title: "Create a Task",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};
// Tool handler
export async function handleCreateTask(input: any) {
  logger.info("=== createTask tool called ===");
  logger.info(`Input: ${JSON.stringify(input || {})}`);
  
  try {
    // Get the tasklistId from input
    let tasklistId = input.tasklistId ? String(input.tasklistId) : null;
    
    // If tasklistId is not provided, try to get it from .teamwork file
    if (!tasklistId) {
      try {
        const fs = require("fs");
        if (fs.existsSync(".teamwork")) {
          const teamworkConfig = fs.readFileSync(".teamwork", "utf8");
          const tasklistIdMatch = teamworkConfig.match(/TASKLISTID=(\d+)/);
          if (tasklistIdMatch) {
            tasklistId = String(parseInt(tasklistIdMatch[1]));
            logger.info(`Using tasklistId ${tasklistId} from .teamwork file`);
          } else {
            // Check if there"s a project ID and try to get tasklists
            const projectIdMatch = teamworkConfig.match(/PROJECTID=(\d+)/);
            if (projectIdMatch) {
              const projectId = parseInt(projectIdMatch[1]);
              logger.info(`Found projectId ${projectId} in .teamwork file, fetching tasklists`);
              
              const tasklists = await teamworkService.getTaskListsByProjectId(projectId);
              
              if (tasklists && tasklists.length === 1) {
                // If there"s only one tasklist, use it and update .teamwork file
                tasklistId = String(tasklists[0].id);
                logger.info(`Found single tasklist ${tasklistId}, using it and updating .teamwork file`);
                
                // Update .teamwork file with tasklistId
                const updatedConfig = teamworkConfig + `\nTASKLISTID=${tasklistId}`;
                fs.writeFileSync(".teamwork", updatedConfig);
              } else if (tasklists && tasklists.length > 1) {
                // If there are multiple tasklists, we can"t automatically choose
                logger.info(`Multiple tasklists found for project ${projectId}`);
                return {
                  content: [{
                    type: "text",
                    text: `Multiple tasklists found for project ${projectId}. Please specify a tasklistId in your request.`
                  }]
                };
              }
            }
          }
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error(`Error reading .teamwork file: ${errorMessage}`);
      }
    }
    
    // If we still don"t have a tasklistId, return an error
    if (!tasklistId) {
      logger.info("No tasklistId provided and couldn't find one in .teamwork file");
      return {
        content: [{
          type: "text",
          text: "No tasklistId provided and couldn't find one in .teamwork file. Please provide a tasklistId."
        }]
      };
    }
    
    // Prepare the task request
    const taskRequest = input.taskRequest as TaskRequest;
    
    // Validate task request
    if (!taskRequest || !taskRequest.task) {
      logger.error("Invalid task request: missing task object");
      return {
        content: [{
          type: "text",
          text: "Invalid task request: missing task object. Please provide a taskRequest.task object."
        }]
      };
    }
    
    // Ensure task has name (Teamwork API requires 'name' for the task title)
    if (!taskRequest.task.name) {
      logger.error("Invalid task request: missing task name");
      return {
        content: [{
          type: "text",
          text: "Invalid task request: missing task name. Please provide taskRequest.task.name."
        }]
      };
    }
    
    logger.info(`Creating task "${taskRequest.task.name}" in tasklist ${tasklistId}`);
    
    // Call the service to create the task
    const createdTask = await teamworkService.createTask(String(tasklistId), taskRequest);
    
    logger.info("Task created successfully");
    logger.info(`Created task response: ${JSON.stringify(createdTask).substring(0, 200)}...`);
    
    // Ensure we return a properly formatted response
    const response = {
      content: [{
        type: "text",
        text: JSON.stringify(createdTask, null, 2)
      }]
    };
    
    // Validate that the response can be serialized
    try {
      JSON.stringify(response);
      logger.info("Response is valid JSON");
    } catch (jsonError: any) {
      logger.error(`Invalid JSON in response: ${jsonError.message}`);
      // Return a safe response
      return {
        content: [{
          type: "text",
          text: "Task created successfully, but there was an error formatting the response."
        }]
      };
    }
    
    logger.info("=== createTask tool completed successfully ===");
    return response;
  } catch (error: any) {
    return createErrorResponse(error, 'Creating task');
  }
} 