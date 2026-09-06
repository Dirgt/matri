import { supabase } from "@/utils/supabase";
import AdminReportClient, { GuestRecord } from "./AdminReportClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function AdminReportPage() {
  // Fetch all guests
  const { data: guests, error } = await supabase
    .from('guests')
    .select('*')
    .order('url_id', { ascending: true });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ed]">
        <div className="p-8 bg-white rounded-2xl shadow-sm text-center">
          <p className="text-red-500 font-semibold mb-2">Error al cargar el reporte</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return <AdminReportClient initialGuests={(guests as GuestRecord[]) || []} />;
}
