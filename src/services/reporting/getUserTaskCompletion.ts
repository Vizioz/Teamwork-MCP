import { ensureApiClient } from '../core/apiClient.js';

interface GetUserTaskCompletionParams {
  userId: number;
  userType?: string;
  updatedAfter?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  reportFormat?: string;
  orderMode?: 'asc' | 'desc';
  orderBy?: string;
  lastLoginAfter?: string;
  pageSize?: number;
  page?: number;
  skipCounts?: boolean;
  showDeleted?: boolean;
  searchUserJobRole?: boolean;
  orderPrioritiseCurrentUser?: boolean;
  onlySiteOwner?: boolean;
  onlyOwnerCompany?: boolean;
  isReportDownload?: boolean;
  inclusiveFilter?: boolean;
  includeServiceAccounts?: boolean;
  includePlaceholders?: boolean;
  includeCollaborators?: boolean;
  includeClients?: boolean;
  includeArchivedProjects?: boolean;
  filterByNoCostRate?: boolean;
  excludeContacts?: boolean;
  teamIds?: number[];
  selectedColumns?: string[];
  projectIds?: number[];
  jobRoleIds?: number[];
  include?: string[];
  ids?: number[];
  fieldsTeams?: string[];
  fieldsPerson?: string[];
  fieldsPeople?: string[];
  fieldsCompanies?: string[];
  fieldsProjectPermissions?: string[];
  excludeProjectIds?: number[];
  excludeIds?: number[];
  companyIds?: number[];
}

async function getUserTaskCompletion(params: GetUserTaskCompletionParams) {
  const { userId, ...queryParams } = params;
  const api = ensureApiClient();
  const response = await api.get(`/projects/api/v3/reporting/precanned/usertaskcompletion/${userId}.json`, {
    params: queryParams
  });
  return response.data;
}

export default getUserTaskCompletion; 