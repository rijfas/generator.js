import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/axios";


interface CreateAttributePayload {
  appName: string;
  collectionSchema: any;
}

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: async (data: CreateAttributePayload) => {
     console.log(data, "data");
      console.log(JSON.parse(data.collectionSchema), "collectionSchema");
      const response = await apiClient.post("/admin/app", {
        appName: data.appName,
        collectionSchema: JSON.parse(data.collectionSchema),
      });
      return response.data;
    },
  });
};
