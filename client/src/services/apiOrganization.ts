import axios from 'axios';
import type { OrganizationType } from '../types';

export const apiOrganizationService = axios.create({
  baseURL: 'http://localhost:3000/api/organizations',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

class OrganizationsApi {
  static async getOrganizationById(id: number): Promise<OrganizationType> {
    const response = await apiOrganizationService.get<OrganizationType>(`/${id}`);
    return response.data;
  }
}

export default OrganizationsApi;
