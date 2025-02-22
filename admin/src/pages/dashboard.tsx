import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sampleApps } from "@/lib/sampleData";
import { Link } from "react-router";

function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleApps.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img src={app.icon} alt={app.name} className="w-12 h-12 mb-4" />
              <CardTitle>{app.name}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Link to={`/app/${app.id}/collection`}>Go to app</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
