import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Link } from "react-router";

interface Collection {
  name: string;
  schema: string;
  documentsCount: number;
}

// TODO: Replace with actual API call
const useCollections = () => {
  // This is a placeholder. Replace with actual API call
  return {
    collections: [] as Collection[],
    isLoading: false
  };
};

export function CollectionListing() {
  const { collections, isLoading } = useCollections();

  if (isLoading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Collections</h1>
      </div>

      {collections.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Collections</CardTitle>
            <CardDescription>
              Collections are automatically created when you create a schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-full max-h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Collection Name</TableHead>
                    <TableHead>Schema</TableHead>
                    <TableHead className="text-right">Documents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map((collection) => (
                    <TableRow key={collection.name}>
                      <TableCell className="font-medium">
                        {collection.name}
                      </TableCell>
                      <TableCell>{collection.schema}</TableCell>
                      <TableCell className="text-right">
                        {collection.documentsCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-gray-500">No collections found</div>
            <p className="text-sm text-gray-500 max-w-sm">
              Collections are automatically created when you create a schema. 
              Create your first schema to get started.
            </p>
            <Button asChild>
              <Link to="../schemas">
                <Plus className="mr-2 h-4 w-4" />
                Create Schema
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  return <CollectionListing />;
}
