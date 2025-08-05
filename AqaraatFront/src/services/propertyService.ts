import { API_BASE_URL } from '../lib/constants';

export interface PropertyImage {
  imageUrl: string;
  caption?: string;
  type: 'Main' | 'Interior' | 'Exterior' | 'Other';
  isMain: boolean;
  orderIndex?: number;
  altText?: string;
}

export interface PropertyVideo {
  videoUrl: string;
  caption?: string;
  type: 'Tour' | 'Interior' | 'Exterior' | 'Other';
  isMain: boolean;
  orderIndex?: number;
  thumbnailUrl?: string;
  duration?: number;
  altText?: string;
}

export interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  type: 'ForSale' | 'ForRentFamily' | 'ForRentStudents';
  category: 'Apartment' | 'Villa' | 'House' | 'Room' | 'Studio' | 'Office' | 'Shop' | 'Land';
  area: string;
  subArea: string;
  
  // تفاصيل الشقة
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  numberOfLivingRooms?: number;
  numberOfKitchens?: number;
  areaSize?: number;
  livingRoomSize?: number;
  kitchenSize?: number;
  
  // تفاصيل المبنى
  floorNumber?: number;
  totalFloors?: number;
  hasElevator: boolean;
  hasParking: boolean;
  hasBalcony: boolean;
  hasGarden: boolean;
  hasTerrace: boolean;
  
  // الخدمات
  hasAirConditioning: boolean;
  hasHeating: boolean;
  hasInternet: boolean;
  hasSatellite: boolean;
  hasFurniture: boolean;
  hasAppliances: boolean;
  
  // الأمان
  hasSecurity: boolean;
  hasCCTV: boolean;
  hasGuard: boolean;
  
  // الموقع
  address?: string;
  landmark?: string;
  distanceFromUniversity?: number;
  distanceFromCityCenter?: number;
  
  // للطلاب فقط
  requiredStudentsCount?: number;
  allowedColleges?: string;
  isFemaleOnly: boolean;
  isMaleOnly: boolean;
  isMixed: boolean;
  
  // الصور والفيديوهات
  images: PropertyImage[];
  videos: PropertyVideo[];
}

export interface PropertyResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  category: string;
  area: string;
  subArea: string;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  areaSize?: number;
  ownerPhone: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: number;
    imageUrl: string;
    caption?: string;
    type: string;
    isMain: boolean;
    orderIndex?: number;
    altText?: string;
    createdAt: string;
  }>;
  videos: Array<{
    id: number;
    videoUrl: string;
    caption?: string;
    type: string;
    isMain: boolean;
    orderIndex?: number;
    thumbnailUrl?: string;
    duration?: number;
    altText?: string;
    createdAt: string;
  }>;
}

export interface PropertySearchParams {
  type?: string;
  category?: string;
  area?: string;
  subArea?: string;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  minAreaSize?: number;
  maxAreaSize?: number;
  status?: string;
  hasElevator?: boolean;
  hasParking?: boolean;
  hasBalcony?: boolean;
  hasAirConditioning?: boolean;
  hasFurniture?: boolean;
  hasInternet?: boolean;
  hasSecurity?: boolean;
  maxDistanceFromUniversity?: number;
  requiredStudentsCount?: number;
  college?: string;
  isFemaleOnly?: boolean;
  isMaleOnly?: boolean;
  isMixed?: boolean;
}

class PropertyService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async createProperty(propertyData: CreatePropertyRequest): Promise<PropertyResponse> {
    const response = await fetch(`${API_BASE_URL}/api/Property`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(propertyData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ أثناء إضافة العقار');
    }

    return response.json();
  }

  async getProperty(id: number): Promise<PropertyResponse> {
    const response = await fetch(`${API_BASE_URL}/api/property/${id}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('العقار غير موجود');
    }

    return response.json();
  }

  async searchProperties(params: PropertySearchParams): Promise<PropertyResponse[]> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/property/search?${queryParams}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('حدث خطأ أثناء البحث عن العقارات');
    }

    return response.json();
  }

  async getAreas(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/api/property/areas`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('حدث خطأ أثناء تحميل المناطق');
    }

    return response.json();
  }

  async getSubAreas(area: string): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/api/property/areas/${encodeURIComponent(area)}/subareas`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('حدث خطأ أثناء تحميل المناطق الفرعية');
    }

    return response.json();
  }

  // Helper function to convert base64 to blob and upload
  async uploadImage(base64Data: string, fileName: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/Image/upload`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        base64Data: base64Data,
        fileName: fileName
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ أثناء رفع الصورة');
    }

    const result = await response.json();
    return result.imageUrl;
  }

  async uploadVideo(base64Data: string, fileName: string): Promise<string> {
    // استخدام وحدة تحكم الفيديو لتحميل الفيديوهات
    const response = await fetch(`${API_BASE_URL}/api/Video/upload`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        base64Data: base64Data,
        fileName: fileName
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ أثناء رفع الفيديو');
    }

    const result = await response.json();
    return result.videoUrl;
  }
}

export const propertyService = new PropertyService();
