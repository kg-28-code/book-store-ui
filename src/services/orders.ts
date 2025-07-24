import { apiService } from './api';
import { PlaceOrderRequest, OrderResponseDto } from '../types';
import { API_ENDPOINTS } from '../config/api';

export class OrdersService {
  static async placeOrder(orderRequest: PlaceOrderRequest): Promise<OrderResponseDto> {
    return apiService.post<OrderResponseDto>(API_ENDPOINTS.ORDERS, orderRequest);
  }
}

export default OrdersService; 