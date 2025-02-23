import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateSchemaForm } from "./components/create-schema-form";

interface SchemaProperty {
  type: string;
  required?: boolean;
}

interface Schema {
  name: string;
  description?: string;
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

interface SchemaListingProps {
  initialSchemas?: Schema[];
}

export function SchemaListing({ initialSchemas = [] }: SchemaListingProps) {
  const [schemas, setSchemas] = useState<Schema[]>(initialSchemas);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreate = (newSchema: object) => {
    setSchemas([...schemas, newSchema as Schema]);
    setCreateDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    const newSchemas = schemas.filter((_, i) => i !== index);
    setSchemas(newSchemas);
  };

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Schema Definitions</h1>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Create Schema
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[800px]'>
            <DialogHeader>
              <DialogTitle>Create New Schema</DialogTitle>
              <DialogDescription>
                Define the properties and types for your new schema.
              </DialogDescription>
            </DialogHeader>
            <CreateSchemaForm onSuccess={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6'>
        {schemas.map((schema, index) => (
          <Card key={index}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-xl'>{schema.name}</CardTitle>
                  {schema.description && (
                    <CardDescription>{schema.description}</CardDescription>
                  )}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='destructive' size='icon'>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Schema</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this schema? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(index)}
                        className='bg-red-600 hover:bg-red-700'
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-full max-h-[400px]'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[200px]'>Property</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className='w-[100px]'>Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(schema.properties).map(
                      ([propName, property], propIndex) => (
                        <TableRow key={propIndex}>
                          <TableCell className='font-medium'>
                            {propName}
                          </TableCell>
                          <TableCell>
                            <Badge variant='secondary'>{property.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {schema.required?.includes(propName) ? (
                              <Badge variant='default' className='bg-green-500'>
                                Yes
                              </Badge>
                            ) : (
                              <Badge variant='outline'>No</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}

        {schemas.length === 0 && (
          <Card className='py-12'>
            <CardContent className='flex flex-col items-center justify-center text-center'>
              <div className='text-gray-500 mb-4'>No schemas defined yet</div>
              <Button
                variant='outline'
                onClick={() => setCreateDialogOpen(true)}
              >
                Create your first schema
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// const sampleSchemas: Schema[] = [
//   {
//     name: "User Schema",
//     description: "Defines the structure of a user object",
//     properties: {
//       id: { type: "string" },
//       name: { type: "string" },
//       email: { type: "string" },
//       age: { type: "number" },
//       isActive: { type: "boolean" },
//       preferences: { type: "object" },
//     },
//     required: ["id", "name", "email"],
//   },
//   {
//     name: "Product Schema",
//     description: "Defines the structure of a product object",
//     properties: {
//       id: { type: "string" },
//       name: { type: "string" },
//       price: { type: "number" },
//       category: { type: "string" },
//       inStock: { type: "boolean" },
//       tags: { type: "array" },
//     },
//     required: ["id", "name", "price"],
//   },
// ];

export default function SchemaListingPage() {
  return <SchemaListing />;
}
