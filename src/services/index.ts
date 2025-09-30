// Core exports
export * from './core/apiClient.js';
export * from './core/types.js';

// Project-related exports
import getProjects from './projects/getProjects.js';
import getCurrentProject from './projects/getCurrentProject.js';
import createProject , { CreateProjectData } from './projects/createProject.js';

// Task-related exports
import getTasks from './tasks/getTasks.js';
import getTasksByProjectId from './tasks/getTasksByProjectId.js';
import getTaskListsByProjectId from './tasks/getTaskListsByProjectId.js';
import getTaskById from './tasks/getTaskById.js';
import createTask from './tasks/createTask.js';
import createSubTask from './tasks/createSubTask.js';
import updateTask from './tasks/updateTask.js';
import deleteTask from './tasks/deleteTask.js';
import getTaskComments from './tasks/getTaskComments.js';

// Comment-related exports
import createComment from './comments/createComment.js';

// People-related exports
import getPeople, { PeopleQueryParams } from './people/getPeople.js';
import getPersonById from './people/getPersonById.js';
import getProjectPeople from './people/getProjectPeople.js';
import addPeopleToProject, { AddPeopleToProjectPayload } from './people/addPeopleToProject.js';
import deletePerson from './people/deletePerson.js';
import updatePerson from './people/updatePerson.js';
import getPeopleMetricsPerformance from './people/getPeopleMetricsPerformance.js';
import getPeopleUtilization from './people/getPeopleUtilization.js';
import getProjectPerson from './people/getProjectPerson.js';

// Company-related exports
import createCompany from './companies/createCompany.js';
import updateCompany from './companies/updateCompany.js';
import deleteCompany from './companies/deleteCompany.js';
import getCompanies from './companies/getCompanies.js';
import getCompanyById from './companies/getCompanyById.js';

// Time-related exports
import getTime, { GetTimeParams } from './time/getTime.js';
import getTimezones from './core/getTimezones.js';
import enqueueHandoff from './orchestration/enqueueHandoff.js';

// Reporting exports
import getUserTaskCompletion from './reporting/getUserTaskCompletion.js';
import getUtilizationCsv from './reporting/getUtilizationCsv.js';

// Re-export all functions
export { getProjects, getCurrentProject, createProject, CreateProjectData };
export { getTasks, getTasksByProjectId, getTaskListsByProjectId, getTaskById, createTask, createSubTask, updateTask, deleteTask };
export { createComment };
export { getPeople, PeopleQueryParams, getPersonById, getProjectPeople, addPeopleToProject, AddPeopleToProjectPayload, deletePerson, updatePerson, getPeopleMetricsPerformance, getPeopleUtilization, getProjectPerson };
export { createCompany, updateCompany, deleteCompany, getCompanies, getCompanyById };
export { getTime, GetTimeParams };
export { getUserTaskCompletion, getUtilizationCsv };
export { getTimezones };
export { enqueueHandoff };

// Default export with all services
export default {
  // Projects
  getProjects,
  getCurrentProject,
  createProject,
  
  // Tasks
  getTasks,
  getTasksByProjectId,
  getTaskListsByProjectId,
  getTaskById,
  createTask,
  createSubTask,
  updateTask,
  deleteTask,
  getTaskComments,
  
  // Comments
  createComment,
  
  // People
  getPeople,
  getPersonById,
  getProjectPeople,
  addPeopleToProject,
  deletePerson,
  updatePerson,
  getPeopleMetricsPerformance,
  getPeopleUtilization,
  getProjectPerson,
  
  // Companies
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  
  // Time
  getTime,

  // Reporting
  getUserTaskCompletion,
  getUtilizationCsv,

  // Core
  getTimezones,

  // Orchestration
  enqueueHandoff
};  