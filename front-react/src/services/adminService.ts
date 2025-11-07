// userService.ts

import authService from './authService';

// Types
export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  favoriteWord?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  email?: string;
  role?: "user" | "admin";
  password?: string;
  favoriteWord?: string;
}

export interface UserResponse {
  success: boolean;
  user?: User;
  users?: User[];
  message?: string;
}

// Configuration de l'API
const API_BASE_URL =  "http://localhost:3000/api";

class UserService {
  /**
   * Récupérer le profil de l'utilisateur connecté
   */
  async getCurrentUserProfile(): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: data.user,
        };
      }

      return {
        success: false,
        message: data.message || "Impossible de récupérer le profil",
      };
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Mettre à jour le profil de l'utilisateur connecté
   */
  async updateCurrentUserProfile(data: UpdateUserData): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Mettre à jour l'utilisateur dans le localStorage
        if (responseData.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
        }
        return {
          success: true,
          user: responseData.user,
          message: "Profil mis à jour avec succès",
        };
      }

      return {
        success: false,
        message: responseData.message || "Échec de la mise à jour du profil",
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Supprimer le compte de l'utilisateur connecté
   */
  async deleteCurrentUserAccount(): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "DELETE",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        // Déconnecter l'utilisateur après la suppression
        authService.logout();
        return {
          success: true,
          message: "Compte supprimé avec succès",
        };
      }

      return {
        success: false,
        message: data.message || "Échec de la suppression du compte",
      };
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }
}

class AdminService {
  /**
   * Récupérer la liste de tous les utilisateurs (admin uniquement)
   */
  async getAllUsers(): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          users: data.users,
        };
      }

      return {
        success: false,
        message: data.message || "Impossible de récupérer les utilisateurs",
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Récupérer un utilisateur par son ID (admin uniquement)
   */
  async getUserById(userId: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: data.user,
        };
      }

      return {
        success: false,
        message: data.message || "Utilisateur non trouvé",
      };
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Mettre à jour un utilisateur (admin uniquement)
   */
  async updateUser(userId: string, data: UpdateUserData): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: responseData.user,
          message: "Utilisateur mis à jour avec succès",
        };
      }

      return {
        success: false,
        message: responseData.message || "Échec de la mise à jour de l'utilisateur",
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Supprimer un utilisateur (admin uniquement)
   */
  async deleteUser(userId: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: "Utilisateur supprimé avec succès",
        };
      }

      return {
        success: false,
        message: data.message || "Échec de la suppression de l'utilisateur",
      };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Créer un nouvel utilisateur (admin uniquement)
   */
  async createUser(userData: {
    email: string;
    password: string;
    role: "user" | "admin";
    favoriteWord: string;
  }): Promise<UserResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: data.user,
          message: "Utilisateur créé avec succès",
        };
      }

      return {
        success: false,
        message: data.message || "Échec de la création de l'utilisateur",
      };
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Rechercher des utilisateurs par email ou rôle (admin uniquement)
   */
  async searchUsers(query: string): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/users/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: authService.getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          users: data.users,
        };
      }

      return {
        success: false,
        message: data.message || "Échec de la recherche",
      };
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }

  /**
   * Obtenir les statistiques des utilisateurs (admin uniquement)
   */
  async getUserStats(): Promise<{
    success: boolean;
    stats?: {
      totalUsers: number;
      totalAdmins: number;
      recentUsers: number;
    };
    message?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        method: "GET",
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          stats: data.stats,
        };
      }

      return {
        success: false,
        message: data.message || "Impossible de récupérer les statistiques",
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      return {
        success: false,
        message: "Erreur de connexion au serveur",
      };
    }
  }
}

// Export des instances uniques (singleton)
export const userService = new UserService();
export const adminService = new AdminService();

export default { userService, adminService };