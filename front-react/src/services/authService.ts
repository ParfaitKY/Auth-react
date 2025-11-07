export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  favoriteWord?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "admin";
  favoriteWord: string;
}

export interface ForgotPasswordData {
  email: string;
  favoriteWord: string;
}

export interface ResetPasswordData {
  email: string;
  favoriteWord: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// Configuration de l'API
const API_BASE_URL = "http://localhost:3000/api";

class AuthService {
  private token: string | null = null;

  constructor() {
    // Récupérer le token du localStorage au démarrage
    this.token = localStorage.getItem("authToken");
  }

  /**
   * Connexion de l'utilisateur
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        this.token = data.token;
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      }

      return {
        success: false,
        message: data.message || "Échec de la connexion",
      };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Validation côté client
      if (data.password !== data.confirmPassword) {
        return {
          success: false,
          message: "Les mots de passe ne correspondent pas",
        };
      }

      if (!data.favoriteWord) {
        return {
          success: false,
          message: "Le mot préféré est requis pour la récupération de mot de passe",
        };
      }

      if (data.password.length < 6) {
        return {
          success: false,
          message: "Le mot de passe doit contenir au moins 6 caractères",
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: data.role,
          favoriteWord: data.favoriteWord,
        }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        this.token = responseData.token;
        localStorage.setItem("authToken", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        return {
          success: true,
          user: responseData.user,
          token: responseData.token,
        };
      }

      return {
        success: false,
        message: responseData.message || "Échec de l'inscription",
      };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Vérification de l'email et du mot préféré pour la récupération de mot de passe
   */
  async verifyForgotPassword(data: ForgotPasswordData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: "Vérification réussie",
        };
      }

      return {
        success: false,
        message: responseData.message || "Email ou mot préféré incorrect",
      };
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
    try {
      if (data.newPassword.length < 6) {
        return {
          success: false,
          message: "Le mot de passe doit contenir au moins 6 caractères",
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        this.token = responseData.token;
        localStorage.setItem("authToken", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        return {
          success: true,
          user: responseData.user,
          token: responseData.token,
          message: "Mot de passe réinitialisé avec succès",
        };
      }

      return {
        success: false,
        message: responseData.message || "Échec de la réinitialisation",
      };
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    this.token = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  /**
   * Récupérer le token actuel
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Récupérer l'utilisateur actuel depuis le localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Vérifier le token auprès du serveur
   */
  async verifyToken(): Promise<boolean> {
    if (!this.token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        return true;
      }

      // Token invalide, on déconnecte
      this.logout();
      return false;
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      return false;
    }
  }

  /**
   * Headers avec authentification pour les requêtes API
   */
  getAuthHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }
}

// Export d'une instance unique (singleton)
export const authService = new AuthService();
export default authService;