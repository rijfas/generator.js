import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

// Schema for validation
const FormSchema = z.object({
  jsonData: z.string().refine(
    (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid JSON format" }
  ),
});

interface CreateAttributeFormProps {
  onSuccess?: () => void;
}

// Form Component
export function CreateAttributeForm({ onSuccess }: CreateAttributeFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (onSuccess) onSuccess(); // Close dialog after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="jsonData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JSON Data</FormLabel>
              <FormControl>
                <Textarea placeholder='{"key": "value"}' {...field} />
              </FormControl>
              <FormDescription>Enter a valid JSON string.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
