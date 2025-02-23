import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGetEndpoints } from "@/services/endpoints/get-endpoints";
import { ChevronDown, ChevronRight, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
}

const methodColors = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
};

const getVerboseName = (method: string, path: string) => {
  switch (method) {
    case "GET":
      return `Get ${path}`;
    case "POST":
      return `Create ${path}`;
    case "PUT":
      return `Update ${path}`;
    case "DELETE":
      return `Delete ${path}`;
    case "PATCH":
      return `Edit ${path}`;
    default:
      return `${method} ${path}`;
  }
};

function ParameterEditor({
  parameters,
  onUpdate,
  title,
}: {
  parameters: Parameter[];
  onUpdate: (params: Parameter[]) => void;
  title: string;
}) {
  const addParameter = () => {
    onUpdate([...parameters, { name: "", type: "string", required: false }]);
  };

  const updateParameter = (
    index: number,
    field: keyof Parameter,
    value: any
  ) => {
    const newParams = [...parameters];
    newParams[index] = { ...newParams[index], [field]: value };
    onUpdate(newParams);
  };

  const removeParameter = (index: number) => {
    onUpdate(parameters.filter((_, i) => i !== index));
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium'>{title}</h3>
        <Button variant='outline' size='sm' onClick={addParameter}>
          <Plus className='h-4 w-4 mr-2' /> Add Parameter
        </Button>
      </div>

      {parameters.map((param, index) => (
        <Card key={index}>
          <CardContent className='p-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-3'>
                <Input
                  placeholder='Parameter name'
                  value={param.name}
                  onChange={(e) =>
                    updateParameter(index, "name", e.target.value)
                  }
                />
              </div>
              <div className='col-span-2'>
                <Select
                  value={param.type}
                  onValueChange={(value) =>
                    updateParameter(index, "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='string'>String</SelectItem>
                    <SelectItem value='number'>Number</SelectItem>
                    <SelectItem value='boolean'>Boolean</SelectItem>
                    <SelectItem value='object'>Object</SelectItem>
                    <SelectItem value='array'>Array</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='col-span-5'>
                <Input
                  placeholder='Description'
                  value={param.description || ""}
                  onChange={(e) =>
                    updateParameter(index, "description", e.target.value)
                  }
                />
              </div>
              <div className='col-span-1 flex items-center'>
                <Switch
                  checked={param.required}
                  onCheckedChange={(checked) =>
                    updateParameter(index, "required", checked)
                  }
                />
              </div>
              <div className='col-span-1 flex justify-end'>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => removeParameter(index)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(endpoint);

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving endpoint:", currentEndpoint);
  };

  const endpointName = getVerboseName(
    currentEndpoint.method,
    currentEndpoint.path
  );

  return (
    <Card>
      <CardHeader className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Badge
              className={`${methodColors[currentEndpoint.method]} text-white`}
            >
              {currentEndpoint.method}
            </Badge>
            <div>
              <CardTitle className='text-lg'>{endpointName}</CardTitle>
              <CardDescription className='font-mono'>
                {currentEndpoint.path}
              </CardDescription>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className='h-4 w-4' />
            </Button>
            <CollapsibleTrigger asChild onClick={() => setIsOpen(!isOpen)}>
              <Button variant='ghost' size='icon'>
                {isOpen ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function EndpointsPage() {
  const { appName } = useParams();
  const { data } = useGetEndpoints(appName!);

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Endpoints</h1>
      </div>

      <div className='grid gap-4'>
        {data &&
          data.map((endpoint: any) => (
            <Collapsible key={endpoint.id}>
              <EndpointCard endpoint={endpoint} />
            </Collapsible>
          ))}
      </div>
    </div>
  );
}
