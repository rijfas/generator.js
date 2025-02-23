import apiClient from "@/lib/axios";
import { Schema } from "@/pages/schemas/components/create-schema-form";
import { useMutation } from "@tanstack/react-query";

export const useCreateSchema = (appName: string) => {
  return useMutation({
    mutationFn: async (data: Schema) => {
      const { name, ...collectionSchema } = data;
      const response = await apiClient.post(`admin/apps/${appName}/schemas`, {
        modelName: name,
        collectionSchema,
      });
      return response.data;
    },
  });
};
