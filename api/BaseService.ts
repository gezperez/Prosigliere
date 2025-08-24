import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import {
  ApiConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  ApiResponse,
  ApiError,
} from './types';

export class ApiBase {
  private axiosInstance: AxiosInstance;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: ApiConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      withCredentials: config.withCredentials || false,
    });

    this.setupDefaultInterceptors();
  }

  /**
   * Setup default interceptors for common functionality
   */
  private setupDefaultInterceptors(): void {
    // Request interceptor for logging and common headers
    this.axiosInstance.interceptors.request.use(
      async config => {
        // Apply custom request interceptors
        for (const interceptor of this.requestInterceptors) {
          config = await interceptor(config);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for common response handling
    this.axiosInstance.interceptors.response.use(
      async response => {
        // Apply custom response interceptors
        for (const interceptor of this.responseInterceptors) {
          response = await interceptor(response);
        }
        return response;
      },
      (error: AxiosError) => {
        // Apply custom error interceptors
        this.errorInterceptors.forEach(interceptor => {
          error = interceptor(error);
        });
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Add a request interceptor
   */
  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add a response interceptor
   */
  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Add an error interceptor
   */
  public addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Set default headers
   */
  public setDefaultHeaders(headers: Record<string, string>): void {
    this.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...headers,
    };
  }

  /**
   * Set authorization header
   */
  public setAuthToken(token: string): void {
    this.setDefaultHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Clear authorization header
   */
  public clearAuthToken(): void {
    delete this.axiosInstance.defaults.headers.common.Authorization;
  }

  /**
   * Handle API errors
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      return {
        message: responseData?.message || error.message,
        status: error.response.status,
        code: error.code,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'No response received from server',
        code: error.code,
      };
    } else {
      // Something else happened
      return {
        message: error.message,
        code: error.code,
      };
    }
  }

  /**
   * GET request
   */
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * POST request
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * PUT request
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * PATCH request
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * DELETE request
   */
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Upload file
   */
  public async upload<T = any>(
    url: string,
    file: File | Blob,
    fieldName: string = 'file',
    additionalData?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const uploadConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    return this.post<T>(url, formData, uploadConfig);
  }

  /**
   * Download file
   */
  public async download(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(url, {
        ...config,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Make a custom request
   */
  public async request<T = any>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: response.config,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Get the underlying axios instance (for advanced usage)
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const createApiClient = (config: ApiConfig): ApiBase => {
  return new ApiBase(config);
};

export abstract class BaseService extends ApiBase {
  protected async handleResponse<T>(response: ApiResponse<T>): Promise<T> {
    return response.data;
  }

  protected async handleServiceError(error: ApiError): Promise<never> {
    console.error('Service error:', error);
    throw error;
  }
}
