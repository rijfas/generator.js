import { sampleApps } from "@/lib/sampleData";
import { useState } from "react";
import AppCard from "./components/app-card";
import AppCreateDialog from "./components/app-create-dialog";

export default function AppsPage() {
  const [apps, setApps] = useState(sampleApps);

  return (
    <div className='p-8'>
      <div className='flex w-full justify-between'>
        <h1 className='text-2xl font-bold mb-6'>My Apps</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {apps.map((app) => (
          <AppCard app={app} key={app.id} />
        ))}
        <AppCreateDialog apps={apps} setApps={setApps} />
      </div>
    </div>
  );
}
