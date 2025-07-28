// API Configuration for Aqaraat Backend
const API_BASE_URL = 'http://localhost:5257/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  phone: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    phone: string;
    name?: string;
  };
}

export interface RegisterRequest {
  email: string;
  phone: string;
  name: string;
  password: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  area: string;
  subarea?: string;
  rooms?: number;
  size?: number;
  studentCapacity?: number;
  images?: string[];
  videos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  type: string;
  area: string;
  subarea?: string;
  rooms?: number;
  size?: number;
  studentCapacity?: number;
  images?: File[];
  videos?: File[];
}

export interface StudentRequest {
  id: string;
  studentName: string;
  college: string;
  area: string;
  subarea?: string;
  budget: number;
  requirements: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentRequestRequest {
  studentName: string;
  college: string;
  area: string;
  subarea?: string;
  budget: number;
  requirements: string;
}

// API Client
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth APIs
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/Auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('token', response.data.token);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/Auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('token', response.data.token);
    }

    return response;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Property APIs
  async createProperty(property: CreatePropertyRequest): Promise<ApiResponse<Property>> {
    const formData = new FormData();
    
    // Add basic property data
    formData.append('title', property.title);
    formData.append('description', property.description);
    formData.append('price', property.price.toString());
    formData.append('type', property.type);
    formData.append('area', property.area);
    if (property.subarea) formData.append('subarea', property.subarea);
    if (property.rooms) formData.append('rooms', property.rooms.toString());
    if (property.size) formData.append('size', property.size.toString());
    if (property.studentCapacity) formData.append('studentCapacity', property.studentCapacity.toString());
    
    // Add images
    if (property.images) {
      property.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    
    // Add videos
    if (property.videos) {
      property.videos.forEach((video) => {
        formData.append('videos', video);
      });
    }

    return this.request<Property>('/Property', {
      method: 'POST',
      body: formData,
    });
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    return this.request<Property>(`/Property/${id}`);
  }

  async searchProperties(params: Record<string, any>): Promise<ApiResponse<Property[]>> {
    const queryString = new URLSearchParams(params).toString();
    return this.request<Property[]>(`/Property/search?${queryString}`);
  }

  async getAreas(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/Property/areas');
  }

  async getSubareas(area: string): Promise<ApiResponse<string[]>> {
    return this.request<string[]>(`/Property/areas/${area}/subareas`);
  }

  async getPropertyTypes(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/Property/types');
  }

  async getPropertyCategories(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/Property/categories');
  }

  // Student Request APIs
  async createStudentRequest(request: CreateStudentRequestRequest): Promise<ApiResponse<StudentRequest>> {
    return this.request<StudentRequest>('/StudentRequest', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getStudentRequest(id: string): Promise<ApiResponse<StudentRequest>> {
    return this.request<StudentRequest>(`/StudentRequest/${id}`);
  }

  async searchStudentRequests(params: Record<string, any>): Promise<ApiResponse<StudentRequest[]>> {
    const queryString = new URLSearchParams(params).toString();
    return this.request<StudentRequest[]>(`/StudentRequest/search?${queryString}`);
  }

  async updateStudentRequestStatus(id: string, status: string): Promise<ApiResponse<StudentRequest>> {
    return this.request<StudentRequest>(`/StudentRequest/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getColleges(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/StudentRequest/colleges');
  }

  async getStudentRequestAreas(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/StudentRequest/areas');
  }

  async getStudentRequestSubareas(area: string): Promise<ApiResponse<string[]>> {
    return this.request<string[]>(`/StudentRequest/areas/${area}/subareas`);
  }

  async getStudentRequestStatuses(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/StudentRequest/statuses');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types for use in components
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Property,
  CreatePropertyRequest,
  StudentRequest,
  CreateStudentRequestRequest,
}; 