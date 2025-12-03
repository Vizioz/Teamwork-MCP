/**
 * createSubTask tool
 * Creates a new subtask under the provided parent task
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { TaskRequest } from "../../models/TaskRequest.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

export const createSubTaskDefinition = {
  name: "createSubTask",
  description: "Creates a subtask. Create a new subtask under the provided parent task.",
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
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format '2006-01-02'"
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
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format '2006-01-02'"
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
                  description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format '2006-01-02'"
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
              description: "NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format '2006-01-02'"
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
    taskId: {
      type: "integer",
      description: "Path parameter: taskId"
    }
  },
  required: [
        "taskRequest",
        "taskId"
      ]
    },
    annotations: {
      title: "Create a Subtask",
      readOnlyHint: false,
      destructiveHint: false,
      openWorldHint: false
    }
  };

export async function handleCreateSubTask(input: any) {
  logger.info("=== createSubTask tool called ===");
  logger.info(`Input: ${JSON.stringify(input || {})}`);
  
  try {
    // Get the taskId from input
    let taskId = input.taskId ? String(input.taskId) : null;
    
    // If taskId is not provided, return an error
    if (!taskId) {
      logger.info("No taskId provided");
      return {
        content: [{
          type: "text",
          text: "No taskId provided. Please provide a taskId of the parent task."
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
    
    logger.info(`Creating subtask "${taskRequest.task.name}" for parent task ${taskId}`);
    
    // Call the service to create the subtask
    const createdSubTask = await teamworkService.createSubTask(String(taskId), taskRequest);
    
    logger.info("Subtask created successfully");
    logger.info(`Created subtask response: ${JSON.stringify(createdSubTask).substring(0, 200)}...`);
    
    // Ensure we return a properly formatted response
    const response = {
      content: [{
        type: "text",
        text: JSON.stringify(createdSubTask, null, 2)
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
          text: "Subtask created successfully, but there was an error formatting the response."
        }]
      };
    }
    
    logger.info("=== createSubTask tool completed successfully ===");
    return response;
  } catch (error: any) {
    return createErrorResponse(error, 'Creating subtask');
  }
} 