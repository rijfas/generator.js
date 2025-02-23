import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateApp } from "@/services/apps/create-app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  appName: z
    .string()
    .min(1, "App name is required")
    .max(50, "App name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "App name must contain only letters and numbers, no spaces"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function AppCreateDialog({
  apps,
  setApps,
}: {
  apps: {
    name: string;
    // description: string;
  }[];
  setApps: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
      }[]
    >
  >;
}) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateApp();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // const newId = Math.max(...apps.map((app) => app.id)) + 1;
    setApps([...apps, { name: data.appName }]);
    setOpen(false);
    form.reset();
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow min-h-[140px] flex flex-col items-center justify-center">
          <CardHeader>
            <Plus className="w-8 h-8 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Create New App</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New App</DialogTitle>
          <DialogDescription>
            Enter a name for your new app. This will be used to identify your
            app in the system.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Name</FormLabel>
                  <FormControl>
                    <Input placeholder="MyApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Create App</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
