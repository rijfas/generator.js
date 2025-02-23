import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function AppCard({
  app,
}: {
  app: {
    id: number;
    name: string;
    description: string;
    icon: string;
  };
}) {
  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <CardTitle>{app.name}</CardTitle>
        <CardDescription>{app.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <Link to={`/${app.id}/schemas/`}>Go to app</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
