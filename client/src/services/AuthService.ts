import axios from 'axios';

class AuthService {
  private static readonly TOKEN_KEY = 'jwtToken';

  public static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.setupAxiosInterceptors();
  }

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public static async validateToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await axios.get('http://localhost:4040/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.status === 200;
    } catch (error) {
      console.log(error + 'Ошибка в validateToken')
      this.removeToken();
      return false;
    }
  }

  public static setupAxiosInterceptors(): void {
    axios.interceptors.request.use(config => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.removeToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
}

AuthService.setupAxiosInterceptors();

export default AuthService;