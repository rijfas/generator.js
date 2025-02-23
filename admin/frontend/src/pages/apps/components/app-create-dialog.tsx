import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateApp } from "@/services/apps/create-app";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function AppCreateDialog({
  apps,
  setApps,
}: {
  apps: {
    id: number;
    name: string;
    description: string;
    icon: string;
  }[];
  setApps: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        description: string;
        icon: string;
      }[]
    >
  >;
}) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateApp();

  const [newApp, setNewApp] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...apps.map((app) => app.id)) + 1;
    setApps([...apps, { ...newApp, id: newId, icon: "" }]);
    setNewApp({ name: "", description: "" });
    setOpen(false);
    mutate({
      appName: newApp.name,
    });
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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">App Name</Label>
            <Input
              id="name"
              value={newApp.name}
              onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
              placeholder="Enter app name"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create App
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
