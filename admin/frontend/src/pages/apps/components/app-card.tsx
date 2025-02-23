import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import geoPattern from "geopattern";
import { useMemo } from "react";

export default function AppCard({
  app,
}: {
  app: {
    id: number;
    name: string;
    description: string;
  };
}) {
  // Generate pattern and encode it for use as a background
  const pattern = useMemo(() => {
    const svg = geoPattern.generate(app.name).toString();
    const encodedSvg = encodeURIComponent(svg);
    return `data:image/svg+xml,${encodedSvg}`;
  }, [app.name]);

  return (
    <Card
      className="relative overflow-hidden text-white shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("${pattern}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardHeader className="relative z-10">
        <CardTitle>{app.name}</CardTitle>
        <CardDescription>{app.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Button variant="secondary">
          <Link to={`/${app.id}/schemas/`}>Go to app</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
