import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSchema } from "@/services/schemas/create-schema";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

interface SchemaProperty {
  name: string;
  type: string;
  required: boolean;
}

interface CreateSchemaFormProps {
  onSuccess?: (schema: object) => void;
  onCancel?: () => void;
}

export interface Schema {
  name: string;
  // description?: string;
  properties: SchemaProperty[];
}

export function CreateSchemaForm({
  onSuccess,
  onCancel,
}: CreateSchemaFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      properties: [{ name: "", type: "string", required: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "properties",
  });

  const typeOptions = [
    "string",
    "number",
    "boolean",
    "array",
    "object",
    "null",
    "date",
  ];

  const params = useParams();
  const appName = params.appName;
  const queryClient = useQueryClient();
  const { mutate } = useCreateSchema(appName!);

  const onSubmit = (data: Schema) => {
    const schema = {
      name: data.name,
      // description: data.description,
      type: "object",
      properties: data.properties.reduce(
        (acc, prop) => ({
          ...acc,
          [prop.name]: { type: prop.type },
        }),
        {}
      ),
      required: data.properties
        .filter((prop) => prop.required)
        .map((prop) => prop.name),
    };
    mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [appName, "schemas"] });
        if (onSuccess) onSuccess(schema);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter schema name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter schema description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className='relative'>
          <ScrollArea className='h-[400px] pr-4 -mr-4'>
            <div className='space-y-4'>
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className='pt-6'>
                    <div className='flex gap-4'>
                      <FormField
                        control={form.control}
                        name={`properties.${index}.name`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Property Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='Enter property name'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`properties.${index}.type`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Type</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {typeOptions.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem className='flex items-end'>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          onClick={() => fields.length > 1 && remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </FormItem>
                    </div>

                    <div className='mt-2'>
                      <FormField
                        control={form.control}
                        name={`properties.${index}.required`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <label className='flex items-center space-x-2'>
                                <input
                                  type='checkbox'
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className='h-4 w-4 rounded border-gray-300'
                                />
                                <span className='text-sm text-gray-600'>
                                  Required field
                                </span>
                              </label>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className='flex flex-col gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => append({ name: "", type: "string", required: true })}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            Add Property
          </Button>

          <div className='flex justify-end space-x-2'>
            {onCancel && (
              <Button type='button' variant='outline' onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type='submit'>Create Schema</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
