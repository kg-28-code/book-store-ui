import { apiService } from './api';
import { BookDto, PageBookDto, PaginationParams } from '../types';
import { API_ENDPOINTS } from '../config/api';

export class BooksService {
  static async getAll(params?: PaginationParams): Promise<PageBookDto> {
    return apiService.get<PageBookDto>(API_ENDPOINTS.BOOKS, params);
  }

  static async getById(id: number): Promise<BookDto> {
    return apiService.get<BookDto>(`${API_ENDPOINTS.BOOKS}/${id}`);
  }

  static async create(book: Omit<BookDto, 'id'>): Promise<BookDto> {
    return apiService.post<BookDto>(API_ENDPOINTS.BOOKS, book);
  }

  static async update(id: number, book: Omit<BookDto, 'id'>): Promise<BookDto> {
    return apiService.put<BookDto>(`${API_ENDPOINTS.BOOKS}/${id}`, book);
  }

  static async delete(id: number): Promise<void> {
    return apiService.delete<void>(`${API_ENDPOINTS.BOOKS}/${id}`);
  }
}

export default BooksService; 