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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronRight, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

interface Endpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description?: string;
  queryParams: Parameter[];
  requestBody?: Parameter[];
  responseBody?: Parameter[];
}

const methodColors = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
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
              <CardTitle className='text-lg'>{currentEndpoint.name}</CardTitle>
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

      <CollapsibleContent>
        <CardContent className='p-4 pt-0'>
          <ScrollArea className='h-full max-h-[600px]'>
            <div className='space-y-6'>
              {isEditing ? (
                <>
                  <div className='space-y-4'>
                    <Input
                      placeholder='Endpoint name'
                      value={currentEndpoint.name}
                      onChange={(e) =>
                        setCurrentEndpoint({
                          ...currentEndpoint,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder='Path'
                      value={currentEndpoint.path}
                      onChange={(e) =>
                        setCurrentEndpoint({
                          ...currentEndpoint,
                          path: e.target.value,
                        })
                      }
                    />
                    <Select
                      value={currentEndpoint.method}
                      onValueChange={(value: Endpoint["method"]) =>
                        setCurrentEndpoint({
                          ...currentEndpoint,
                          method: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='GET'>GET</SelectItem>
                        <SelectItem value='POST'>POST</SelectItem>
                        <SelectItem value='PUT'>PUT</SelectItem>
                        <SelectItem value='DELETE'>DELETE</SelectItem>
                        <SelectItem value='PATCH'>PATCH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ParameterEditor
                    title='Query Parameters'
                    parameters={currentEndpoint.queryParams}
                    onUpdate={(params) =>
                      setCurrentEndpoint({
                        ...currentEndpoint,
                        queryParams: params,
                      })
                    }
                  />

                  <ParameterEditor
                    title='Request Body'
                    parameters={currentEndpoint.requestBody || []}
                    onUpdate={(params) =>
                      setCurrentEndpoint({
                        ...currentEndpoint,
                        requestBody: params,
                      })
                    }
                  />

                  <ParameterEditor
                    title='Response Body'
                    parameters={currentEndpoint.responseBody || []}
                    onUpdate={(params) =>
                      setCurrentEndpoint({
                        ...currentEndpoint,
                        responseBody: params,
                      })
                    }
                  />

                  <div className='flex justify-end space-x-2'>
                    <Button
                      variant='outline'
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </>
              ) : (
                <div className='space-y-6'>
                  {currentEndpoint.queryParams.length > 0 && (
                    <div>
                      <h3 className='font-medium mb-2'>Query Parameters</h3>
                      {currentEndpoint.queryParams.map((param, index) => (
                        <div
                          key={index}
                          className='flex items-center space-x-2 text-sm'
                        >
                          <Badge variant='outline'>{param.name}</Badge>
                          <span className='text-muted-foreground'>
                            {param.type}
                          </span>
                          {param.required && <Badge>Required</Badge>}
                        </div>
                      ))}
                    </div>
                  )}

                  {currentEndpoint.requestBody &&
                    currentEndpoint.requestBody.length > 0 && (
                      <div>
                        <h3 className='font-medium mb-2'>Request Body</h3>
                        {currentEndpoint.requestBody.map((param, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2 text-sm'
                          >
                            <Badge variant='outline'>{param.name}</Badge>
                            <span className='text-muted-foreground'>
                              {param.type}
                            </span>
                            {param.required && <Badge>Required</Badge>}
                          </div>
                        ))}
                      </div>
                    )}

                  {currentEndpoint.responseBody &&
                    currentEndpoint.responseBody.length > 0 && (
                      <div>
                        <h3 className='font-medium mb-2'>Response Body</h3>
                        {currentEndpoint.responseBody.map((param, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2 text-sm'
                          >
                            <Badge variant='outline'>{param.name}</Badge>
                            <span className='text-muted-foreground'>
                              {param.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </CollapsibleContent>
    </Card>
  );
}

const sampleEndpoints: Endpoint[] = [
  {
    id: "1",
    name: "Get Users",
    method: "GET",
    path: "/api/users",
    queryParams: [
      {
        name: "page",
        type: "number",
        required: false,
        description: "Page number",
      },
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Items per page",
      },
    ],
    responseBody: [
      { name: "users", type: "array", required: true },
      { name: "total", type: "number", required: true },
    ],
  },
  {
    id: "2",
    name: "Create User",
    method: "POST",
    path: "/api/users",
    requestBody: [
      { name: "username", type: "string", required: true },
      { name: "email", type: "string", required: true },
      { name: "password", type: "string", required: true },
    ],
    queryParams: [],
    responseBody: [
      { name: "id", type: "string", required: true },
      { name: "username", type: "string", required: true },
    ],
  },
];

export default function EndpointsPage() {
  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Endpoints</h1>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Add Endpoint
        </Button>
      </div>

      <div className='grid gap-4'>
        {sampleEndpoints.map((endpoint) => (
          <Collapsible key={endpoint.id}>
            <EndpointCard endpoint={endpoint} />
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
