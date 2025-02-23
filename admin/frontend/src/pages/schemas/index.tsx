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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetSchemas } from "@/services/schemas/get-schemas";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { CreateSchemaForm } from "./components/create-schema-form";

interface SchemaProperty {
  type: string;
  required?: boolean;
}

interface Schema {
  name: string;
  schema: Record<string, SchemaProperty>;
}

interface SchemaListingProps {
  initialSchemas?: Schema[];
}

export function SchemaListing({ initialSchemas = [] }: SchemaListingProps) {
  const params = useParams();
  const appName = params.appName;
  const { data } = useGetSchemas(appName!);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCreate = async (newSchema: object) => {
    setCreateDialogOpen(false);
    await queryClient.invalidateQueries({ queryKey: [appName, "schemas"] });
  };

  const handleDelete = (index: number) => {
    // const newSchemas = schemas.filter((_, i) => i !== index);
    // setSchemas(newSchemas);
  };

  console.log(data);

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
        {data &&
          data.schemas.map((schema: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>
                    <span className='font-medium'>{schema.name}</span>
                  </CardTitle>
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
                          Are you sure you want to delete this schema? This
                          action cannot be undone.
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
                      {Object.entries(schema.schema).map(
                        ([propName, property], propIndex) => (
                          <TableRow key={propIndex}>
                            <TableCell className='font-medium'>
                              {propName}
                            </TableCell>
                            <TableCell>
                              <Badge variant='secondary'>
                                {(property as any).type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {(property as any).required ? (
                                <Badge
                                  variant='default'
                                  className='bg-green-500'
                                >
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

        {data && data.schemas.length === 0 && (
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

export default function SchemaListingPage() {
  return <SchemaListing />;
}
