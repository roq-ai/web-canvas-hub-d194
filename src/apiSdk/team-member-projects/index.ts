import axios from 'axios';
import queryString from 'query-string';
import { TeamMemberProjectInterface, TeamMemberProjectGetQueryInterface } from 'interfaces/team-member-project';
import { GetQueryInterface } from '../../interfaces';

export const getTeamMemberProjects = async (query?: TeamMemberProjectGetQueryInterface) => {
  const response = await axios.get(`/api/team-member-projects${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTeamMemberProject = async (teamMemberProject: TeamMemberProjectInterface) => {
  const response = await axios.post('/api/team-member-projects', teamMemberProject);
  return response.data;
};

export const updateTeamMemberProjectById = async (id: string, teamMemberProject: TeamMemberProjectInterface) => {
  const response = await axios.put(`/api/team-member-projects/${id}`, teamMemberProject);
  return response.data;
};

export const getTeamMemberProjectById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/team-member-projects/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTeamMemberProjectById = async (id: string) => {
  const response = await axios.delete(`/api/team-member-projects/${id}`);
  return response.data;
};
