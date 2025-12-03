/**
 * updateTask tool
 * Updates an existing task in Teamwork
 */

import logger from "../../utils/logger.js";
import teamworkService from "../../services/index.js";
import { TaskRequest } from "../../models/TaskRequest.js";
import { TaskTask } from "../../models/TaskTask.js";
import { createErrorResponse } from "../../utils/errorHandler.js";

// Tool definition
export const updateTaskDefinition = {
  name: "updateTask",
  description: "Update an existing task. Modify the properties of an existing task.",
  inputSchema: {
    type: 'object',
    properties: {
      taskId: {
        type: 'integer',
        description: 'The ID of the task to update'
      },
      taskRequest: {
        type: 'object',
        properties: {
          attachmentOptions: {
            type: 'object',
            properties: {
              removeOtherFiles: {
                type: 'boolean'
              }
            },
            required: []
          },
          attachments: {
            type: 'object',
            properties: {
              files: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    categoryId: {
                      type: 'integer'
                    },
                    id: {
                      type: 'integer'
                    }
                  },
                  required: [],
                  description: 'File stores information about a uploaded file.'
                }
              },
              pendingFiles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    categoryId: {
                      type: 'integer'
                    },
                    reference: {
                      type: 'string'
                    }
                  },
                  required: [],
                  description: 'PendingFile stores information about a file uploaded on-the-fly.'
                }
              }
            },
            required: []
          },
          card: {
            type: 'object',
            properties: {
              columnId: {
                type: 'integer'
              }
            },
            required: [],
            description: 'Card stores information about the card created with the task.'
          },
          predecessors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                type: {
                  type: 'string'
                }
              },
              required: [],
              description: 'Predecessor stores information about task predecessors.'
            }
          },
          tags: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                color: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                projectId: {
                  type: 'integer'
                }
              },
              required: [],
              description: 'Tag contains all the information returned from a tag.'
            }
          },
          task: {
            type: 'object',
            properties: {
              assignees: {
                type: 'object',
                properties: {
                  companyIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  teamIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  userIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  }
                },
                required: [],
                description: 'UserGroups are common lists for storing users, companies and teams ids together.'
              },
              attachmentIds: {
                type: 'array',
                items: {
                  type: 'integer'
                }
              },
              changeFollowers: {
                type: 'object',
                properties: {
                  companyIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  teamIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  userIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  }
                },
                required: [],
                description: 'UserGroups are common lists for storing users, companies and teams ids together.'
              },
              commentFollowers: {
                type: 'object',
                properties: {
                  companyIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  teamIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  userIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  }
                },
                required: [],
                description: 'UserGroups are common lists for storing users, companies and teams ids together.'
              },
              completedAt: {
                type: 'string'
              },
              completedBy: {
                type: 'integer'
              },
              createdAt: {
                type: 'string'
              },
              createdBy: {
                type: 'integer'
              },
              crmDealIds: {
                type: 'array',
                items: {
                  type: 'integer'
                }
              },
              customFields: {
                type: 'object',
                properties: {
                  Values: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        countryCode: {
                          type: 'string'
                        },
                        currencySymbol: {
                          type: 'string'
                        },
                        customfieldId: {
                          type: 'integer'
                        },
                        urlTextToDisplay: {
                          type: 'string'
                        },
                        value: {
                          type: 'string'
                        }
                      },
                      required: [],
                      description: 'CustomFieldValue contains all the information returned from a customfield.'
                    }
                  }
                },
                required: [],
                description: 'CustomFields is the custom fields type.'
              },
              description: {
                type: 'string'
              },
              descriptionContentType: {
                type: 'string'
              },
              dueAt: {
                type: 'string',
                format: 'date',
                description: 'NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format \'2006-01-02\''
              },
              estimatedMinutes: {
                type: 'integer'
              },
              grantAccessTo: {
                type: 'object',
                properties: {
                  companyIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  teamIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  userIds: {
                    type: 'array',
                    items: {
                      type: 'integer'
                    },
                    description: 'NullableInt64Slice implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  }
                },
                required: [],
                description: 'UserGroups are common lists for storing users, companies and teams ids together.'
              },
              hasDeskTickets: {
                type: 'boolean'
              },
              name: {
                type: 'string'
              },
              originalDueDate: {
                type: 'string',
                format: 'date',
                description: 'NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format \'2006-01-02\''
              },
              parentTaskId: {
                type: 'integer'
              },
              priority: {
                type: 'string',
                enum: [
                  'low',
                  'normal',
                  'high'
                ],
                description: 'NullableTaskPriority implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
              },
              private: {
                type: 'boolean'
              },
              progress: {
                type: 'integer'
              },
              reminders: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    isRelative: {
                      type: 'boolean'
                    },
                    note: {
                      type: 'string'
                    },
                    relativeNumberDays: {
                      type: 'integer'
                    },
                    remindAt: {
                      type: 'string'
                    },
                    type: {
                      type: 'string'
                    },
                    userId: {
                      type: 'integer'
                    }
                  },
                  required: [],
                  description: 'Reminder stores all necessary information to create a task reminder.'
                }
              },
              repeatOptions: {
                type: 'object',
                properties: {
                  duration: {
                    type: 'integer'
                  },
                  editOption: {
                    type: 'string'
                  },
                  endsAt: {
                    type: 'string',
                    format: 'date',
                    description: 'NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format \'2006-01-02\''
                  },
                  frequency: {
                    type: 'object',
                    description: 'NullableTaskRepeatFrequency implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  monthlyRepeatType: {
                    type: 'object',
                    description: 'NullableTaskRepeatMonthlyType implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  },
                  rrule: {
                    type: 'string',
                    description: 'Adds the RRule definition for repeating tasks. It replaces all other repeating fields.'
                  },
                  selectedDays: {
                    type: 'object',
                    description: 'NullableWorkingHourEntryWeekdays implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted.'
                  }
                },
                required: [],
                description: 'RepeatOptions stores recurring information for the task.'
              },
              startAt: {
                type: 'string',
                format: 'date',
                description: 'NullableDate implements json.Unmarshaler to allow testing between a value that explicitly set to null or omitted. Date format \'2006-01-02\''
              },
              status: {
                type: 'string'
              },
              tagIds: {
                type: 'array',
                items: {
                  type: 'integer'
                }
              },
              taskgroupId: {
                type: 'integer'
              },
              tasklistId: {
                type: 'integer'
              },
              templateRoleName: {
                type: 'string'
              },
              ticketId: {
                type: 'integer'
              }
            },
            required: [],
            description: 'Task contains all the information returned from a task.'
          },
          taskOptions: {
            type: 'object',
            properties: {
              appendAssignees: {
                type: 'boolean'
              },
              checkInvalidusers: {
                type: 'boolean'
              },
              everyoneMustDo: {
                type: 'boolean'
              },
              fireWebhook: {
                type: 'boolean'
              },
              isTemplate: {
                type: 'boolean'
              },
              logActivity: {
                type: 'boolean'
              },
              notify: {
                type: 'boolean'
              },
              parseInlineTags: {
                type: 'boolean'
              },
              positionAfterTaskId: {
                type: 'integer'
              },
              pushDependents: {
                type: 'boolean'
              },
              pushSubtasks: {
                type: 'boolean'
              },
              shiftProjectDates: {
                type: 'boolean'
              },
              useDefaults: {
                type: 'boolean'
              },
              useNotifyViaTWIM: {
                type: 'boolean'
              }
            },
            required: [],
            description: 'Options contains any options which can be set for the task request'
          },
          workflows: {
            type: 'object',
            properties: {
              positionAfterTask: {
                type: 'integer'
              },
              stageId: {
                type: 'integer'
              },
              workflowId: {
                type: 'integer'
              }
            },
            required: [],
            description: 'Workflows stores information about where the task lives in the workflow'
          }
        },
        required: [],
        description: 'The task data to update'
      }
    },
    required: ['taskId', 'taskRequest']
  },
  annotations: {
    title: "Update a Task",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

// Tool handler
export async function handleUpdateTask(input: any) {
  logger.verbose("=== updateTask tool called ===");  
  try {
    
    const taskId = input.taskId;
    const taskRequest = input.taskRequest as TaskRequest;

    if (!taskId) {
      logger.error("Invalid request: missing taskId");
      return {
        content: [{
          type: "text",
          text: "Invalid request: missing taskId. Please provide a taskId."
        }]
      };
    }
    
    if (!taskRequest || !taskRequest.task) {
      return {
        content: [{
          type: "text",
          text: "Invalid request: missing taskRequest.task. Please provide task data to update."
        }]
      };
    }    
    // Call the service to update the task
    const response = await teamworkService.updateTask(taskId.toString(), taskRequest);
       
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response, null, 2)
      }]
    };
  } catch (error: any) {
    return createErrorResponse(error, 'Updating task');
  }
} 