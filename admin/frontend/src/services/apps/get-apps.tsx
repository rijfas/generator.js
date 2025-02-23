import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetApps = () => {
  return useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await apiClient.get("admin/apps");
      return response.data;
    },
  });
};
