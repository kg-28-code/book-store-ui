// API Response Types based on OpenAPI specification
export interface CustomerDto {
  id?: number;
  name: string;
  email?: string;
}

export interface BookDto {
  id?: number;
  title: string;
  author: string;
  price?: number;
  stock?: number;
}

export interface ItemRequest {
  bookId: number;
  quantity: number;
}

export interface PlaceOrderRequest {
  customerId: number;
  items: ItemRequest[];
}

export interface OrderItemDto {
  bookId: number;
  title: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderResponseDto {
  orderId: number;
  orderDate: string;
  customerId: number;
  customerName: string;
  items: OrderItemDto[];
  totalAmount: number;
}

export interface PageableObject {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortObject;
  unpaged: boolean;
}

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageBookDto {
  totalPages: number;
  totalElements: number;
  size: number;
  content: BookDto[];
  number: number;
  numberOfElements: number;
  pageable: PageableObject;
  sort: SortObject;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Additional utility types
export interface ApiError {
  message: string;
  status: number;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

// Shopping cart types for local state management
export interface CartItem extends BookDto {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
} 