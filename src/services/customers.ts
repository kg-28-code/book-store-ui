import { apiService } from './api';
import { CustomerDto } from '../types';
import { API_ENDPOINTS } from '../config/api';

export class CustomersService {
  static async getAll(): Promise<CustomerDto[]> {
    return apiService.get<CustomerDto[]>(API_ENDPOINTS.CUSTOMERS);
  }

  static async getById(id: number): Promise<CustomerDto> {
    return apiService.get<CustomerDto>(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  }

  static async create(customer: Omit<CustomerDto, 'id'>): Promise<CustomerDto> {
    return apiService.post<CustomerDto>(API_ENDPOINTS.CUSTOMERS, customer);
  }

  static async update(id: number, customer: Omit<CustomerDto, 'id'>): Promise<CustomerDto> {
    return apiService.put<CustomerDto>(`${API_ENDPOINTS.CUSTOMERS}/${id}`, customer);
  }

  static async delete(id: number): Promise<void> {
    return apiService.delete<void>(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  }
}

export default CustomersService; 