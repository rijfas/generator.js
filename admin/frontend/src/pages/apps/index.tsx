import { useGetApps } from "@/services/apps/get-apps";
import AppCard from "./components/app-card";
import AppCreateDialog from "./components/app-create-dialog";

export default function AppsPage() {
  const { data } = useGetApps();

  return (
    <div className='p-8'>
      <div className='flex w-full justify-between'>
        <h1 className='text-2xl font-bold mb-6'>My Apps</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data &&
          data.apps &&
          data.apps.map((app: any) => <AppCard name={app} key={app} />)}
        <AppCreateDialog />
      </div>
    </div>
  );
}
