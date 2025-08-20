
import { Employee, ScheduleEntry } from '@/types';
import { apiClient } from './api';

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    return apiClient.get<Employee[]>('/employees');
  },

  async getEmployee(id: string): Promise<Employee> {
    return apiClient.get<Employee>(`/employees/${id}`);
  },

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    return apiClient.post<Employee>('/employees', employee);
  },

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    return apiClient.put<Employee>(`/employees/${id}`, employee);
  },

  async deleteEmployee(id: string): Promise<void> {
    return apiClient.delete<void>(`/employees/${id}`);
  },

  async getSchedule(): Promise<ScheduleEntry[]> {
    return apiClient.get<ScheduleEntry[]>('/schedule');
  },

  async updateSchedule(scheduleId: string, schedule: Partial<ScheduleEntry>): Promise<ScheduleEntry> {
    return apiClient.put<ScheduleEntry>(`/schedule/${scheduleId}`, schedule);
  },
};
