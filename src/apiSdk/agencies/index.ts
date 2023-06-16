import axios from 'axios';
import queryString from 'query-string';
import { AgencyInterface, AgencyGetQueryInterface } from 'interfaces/agency';
import { GetQueryInterface } from '../../interfaces';

export const getAgencies = async (query?: AgencyGetQueryInterface) => {
  const response = await axios.get(`/api/agencies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAgency = async (agency: AgencyInterface) => {
  const response = await axios.post('/api/agencies', agency);
  return response.data;
};

export const updateAgencyById = async (id: string, agency: AgencyInterface) => {
  const response = await axios.put(`/api/agencies/${id}`, agency);
  return response.data;
};

export const getAgencyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/agencies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAgencyById = async (id: string) => {
  const response = await axios.delete(`/api/agencies/${id}`);
  return response.data;
};
