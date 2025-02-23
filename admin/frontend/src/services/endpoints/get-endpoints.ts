import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetEndpoints = (appName: string) => {
  return useQuery({
    queryKey: [appName, "endpoints"],
    queryFn: async () => {
      const response = await apiClient.get(`admin/apps/${appName}/endpoints`);
      return response.data;
    },
  });
};
