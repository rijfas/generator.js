import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSchemas = (appName: string) => {
  return useQuery({
    queryKey: [appName, "schemas"],
    queryFn: async () => {
      const response = await apiClient.get(`admin/apps/${appName}/schemas`);
      return response.data;
    },
  });
};
