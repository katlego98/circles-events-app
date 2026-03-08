import { Api } from "./api-client";
import { useAuthStore } from "./store";

export const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
  baseApiParams: {
    format: "json",
  },
  securityWorker: async () => {
    const token = useAuthStore.getState().token;
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  },
});
