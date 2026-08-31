import { supabase } from "@/utils/supabase";

export const revalidate = 0; // Disable cache for this page so it always fetches fresh data

export default async function AdminReportPage() {
  // Fetch all guests
  const { data: guests, error } = await supabase
    .from('guests')
    .select('*')
    .order('url_id', { ascending: true });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ed]">
        <p className="text-red-500">Error cargando los datos: {error.message}</p>
      </div>
    );
  }

  // Calculate metrics
  let totalPasses = 0;
  let totalCeremonyYes = 0;
  let totalReceptionYes = 0;
  let totalPending = 0;

  const rows = guests?.map(guest => {
    totalPasses += (guest.passes || 0);

    const responses = guest.rsvp_responses || [];
    const hasResponded = responses.length > 0;
    
    let ceremonyStatus = "Pendiente";
    let receptionStatus = "Pendiente";
    let respondedGuests: string[] = [];
    let timestamp = "-";

    if (hasResponded) {
      // Get the latest response (assuming array push or overwrite, let's take the first/latest if overwritten)
      const latestResponse = responses[responses.length - 1];
      
      ceremonyStatus = latestResponse.ceremony ? "✅ Sí" : "❌ No";
      receptionStatus = latestResponse.reception ? "✅ Sí" : "❌ No";
      respondedGuests = latestResponse.guests || [];
      timestamp = new Date(latestResponse.timestamp).toLocaleString('es-CO', { 
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
      });

      if (latestResponse.ceremony) totalCeremonyYes += respondedGuests.length;
      if (latestResponse.reception) totalReceptionYes += respondedGuests.length;
    } else {
      totalPending += (guest.passes || 0);
    }

    const allNames = Array.isArray(guest.guest_names) ? guest.guest_names.join(", ") : guest.guest_names;
    const confirmedNames = respondedGuests.length > 0 ? respondedGuests.join(", ") : "-";

    return {
      id: guest.id,
      urlId: guest.url_id,
      passes: guest.passes,
      allNames,
      confirmedNames,
      ceremonyStatus,
      receptionStatus,
      timestamp,
      hasResponded
    };
  }) || [];

  return (
    <main className="min-h-screen bg-[#f7f4ed] p-4 md:p-8 font-sans text-[#5c6e64]">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 text-center">
          <h1 className="font-script text-5xl md:text-6xl text-[#3b7156] mb-2">Reporte de Asistencia</h1>
          <p className="text-[#899c8f] text-lg tracking-widest uppercase">Santi & Kate</p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-[#5c6e64] mb-2">{totalPasses}</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Pases Totales</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-[#3b7156] mb-2">{totalCeremonyYes}</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Confirmados Ceremonia</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-[#899c8f] mb-2">{totalReceptionYes}</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Confirmados Recepción</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-[#d6af6c] mb-2">{totalPending}</span>
            <span className="text-xs uppercase tracking-wider text-gray-500">Pases Pendientes</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eeeae3] text-[#5c6e64] uppercase text-xs tracking-wider">
                <th className="p-4 font-semibold border-b border-gray-200">ID / Link</th>
                <th className="p-4 font-semibold border-b border-gray-200">Invitados</th>
                <th className="p-4 font-semibold border-b border-gray-200">Pases</th>
                <th className="p-4 font-semibold border-b border-gray-200">Confirmaron</th>
                <th className="p-4 font-semibold border-b border-gray-200 text-center">Ceremonia</th>
                <th className="p-4 font-semibold border-b border-gray-200 text-center">Recepción</th>
                <th className="p-4 font-semibold border-b border-gray-200">Fecha Rta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {rows.map((row) => (
                <tr key={row.id} className={`hover:bg-gray-50 transition-colors ${!row.hasResponded ? 'bg-gray-50/50 text-gray-400' : ''}`}>
                  <td className="p-4 font-mono text-xs">{row.urlId}</td>
                  <td className="p-4">{row.allNames}</td>
                  <td className="p-4 text-center">{row.passes}</td>
                  <td className="p-4 font-medium">{row.confirmedNames}</td>
                  <td className="p-4 text-center">{row.ceremonyStatus}</td>
                  <td className="p-4 text-center">{row.receptionStatus}</td>
                  <td className="p-4 text-xs text-gray-500">{row.timestamp}</td>
                </tr>
              ))}
              
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No hay invitados registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
