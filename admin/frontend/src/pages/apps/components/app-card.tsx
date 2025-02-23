import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import geoPattern from "geopattern";
import { useMemo } from "react";
import { Link } from "react-router";

export default function AppCard({ name }: { name: string }) {
  // Generate pattern and encode it for use as a background
  const pattern = useMemo(() => {
    const svg = geoPattern.generate(name).toString();
    const encodedSvg = encodeURIComponent(svg);
    return `data:image/svg+xml,${encodedSvg}`;
  }, [name]);

  return (
    <Card
      className='relative overflow-hidden text-white shadow-lg'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("${pattern}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardHeader className='relative z-10'>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='relative z-10'>
        <Button className='text-black bg-white'>
          <Link to={`/${name}/schemas/`}>Go to app</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
