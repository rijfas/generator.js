import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateAttributeForm } from "./create-attribute-form";
// Dialog Component
export function CreateAttributeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Attribute</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Attribute</DialogTitle>
        </DialogHeader>
        <CreateAttributeForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
