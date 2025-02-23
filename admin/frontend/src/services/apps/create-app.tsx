import apiClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface CreateAppPayload {
  appName: string;
}

export const useCreateApp = () => {
  return useMutation({
    mutationFn: async (data: CreateAppPayload) => {
      const response = await apiClient.post(
        "admin/apps",
        data
      );
      return response.data;
    },
  });
};