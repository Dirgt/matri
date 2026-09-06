"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { 
  Check, 
  X, 
  RefreshCw, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Edit3, 
  Search, 
  Clock, 
  Users, 
  UserCheck, 
  UserX,
  Sparkles
} from "lucide-react";

export interface GuestRecord {
  id: string;
  url_id: string;
  passes: number;
  guest_names: string[] | string;
  rsvp_responses?: Array<{
    guests?: string[];
    ceremony?: boolean;
    reception?: boolean;
    timestamp?: string;
  }>;
}

interface Props {
  initialGuests: GuestRecord[];
}

export default function AdminReportClient({ initialGuests }: Props) {
  const [guests, setGuests] = useState<GuestRecord[]>(initialGuests);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "confirmed" | "declined" | "pending">("all");

  // State for manual edit modal
  const [editingGuest, setEditingGuest] = useState<GuestRecord | null>(null);
  const [editSelectedGuests, setEditSelectedGuests] = useState<string[]>([]);
  const [editCeremony, setEditCeremony] = useState<boolean>(true);
  const [editReception, setEditReception] = useState<boolean>(true);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("url_id", { ascending: true });

      if (data && !error) {
        setGuests(data);
      } else if (error) {
        console.error("Error al refrescar invitados:", error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyToClipboard = (urlId: string) => {
    const url = `https://bodask.vercel.app/?id=${urlId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(urlId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Open edit modal
  const handleOpenEdit = (guest: GuestRecord) => {
    setEditingGuest(guest);
    const names = Array.isArray(guest.guest_names) ? guest.guest_names : [guest.guest_names];
    const responses = guest.rsvp_responses || [];
    
    if (responses.length > 0) {
      const last = responses[responses.length - 1];
      setEditSelectedGuests(last.guests && last.guests.length > 0 ? last.guests : [...names]);
      setEditCeremony(last.ceremony ?? true);
      setEditReception(last.reception ?? true);
    } else {
      setEditSelectedGuests([...names]);
      setEditCeremony(true);
      setEditReception(true);
    }
  };

  // Save manual edit to Supabase
  const handleSaveEdit = async () => {
    if (!editingGuest) return;
    setIsSavingEdit(true);

    try {
      const responseObj = {
        guests: editSelectedGuests,
        ceremony: editCeremony,
        reception: editReception,
        timestamp: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("guests")
        .update({
          rsvp_responses: [responseObj]
        })
        .eq("id", editingGuest.id)
        .select();

      if (error || !data) {
        alert("Error al guardar la confirmación: " + (error?.message || ""));
      } else {
        await refreshData();
        setEditingGuest(null);
      }
    } catch (e) {
      console.error(e);
      alert("Error de conexión al guardar.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Reset RSVP to pending
  const handleResetRSVP = async (guestId: string) => {
    if (!confirm("¿Deseas restablecer la confirmación de este invitado a PENDIENTE?")) return;
    try {
      const { error } = await supabase
        .from("guests")
        .update({ rsvp_responses: [] })
        .eq("id", guestId);

      if (!error) {
        await refreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Calculate metrics
  let totalPasses = 0;
  let totalCeremonyYes = 0;
  let totalReceptionYes = 0;
  let totalPendingPasses = 0;
  let totalDeclinedPasses = 0;

  const processedRows = guests.map((guest) => {
    totalPasses += guest.passes || 0;
    const responses = guest.rsvp_responses || [];
    const hasResponded = responses.length > 0;
    const names = Array.isArray(guest.guest_names) ? guest.guest_names : [guest.guest_names];

    let ceremonyStatus: "yes" | "no" | "pending" = "pending";
    let receptionStatus: "yes" | "no" | "pending" = "pending";
    let respondedGuests: string[] = [];
    let timestamp = "-";
    let isFullyDeclined = false;

    if (hasResponded) {
      const last = responses[responses.length - 1];
      respondedGuests = last.guests || [];
      ceremonyStatus = last.ceremony ? "yes" : "no";
      receptionStatus = last.reception ? "yes" : "no";
      
      if (last.ceremony) {
        totalCeremonyYes += respondedGuests.length;
      }
      if (last.reception) {
        totalReceptionYes += respondedGuests.length;
      }
      if (!last.ceremony && !last.reception) {
        isFullyDeclined = true;
        totalDeclinedPasses += guest.passes || 0;
      }

      if (last.timestamp) {
        try {
          timestamp = new Date(last.timestamp).toLocaleString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });
        } catch {
          timestamp = last.timestamp;
        }
      }
    } else {
      totalPendingPasses += guest.passes || 0;
    }

    return {
      guest,
      namesList: names,
      allNamesStr: names.join(", "),
      respondedGuests,
      confirmedNamesStr: respondedGuests.length > 0 ? respondedGuests.join(", ") : "-",
      hasResponded,
      ceremonyStatus,
      receptionStatus,
      isFullyDeclined,
      timestamp
    };
  });

  // Filtered rows
  const filteredRows = processedRows.filter((row) => {
    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      row.guest.url_id.toLowerCase().includes(q) || 
      row.allNamesStr.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // Filter tab
    if (filterTab === "confirmed") {
      return row.hasResponded && (row.ceremonyStatus === "yes" || row.receptionStatus === "yes");
    }
    if (filterTab === "declined") {
      return row.hasResponded && row.isFullyDeclined;
    }
    if (filterTab === "pending") {
      return !row.hasResponded;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-[#f7f4ed] p-4 md:p-8 font-sans text-[#5c6e64]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center relative">
          <h1 className="font-script text-5xl md:text-6xl text-[#3b7156] mb-1">
            Reporte de Asistencia
          </h1>
          <p className="text-[#899c8f] text-sm tracking-widest uppercase font-semibold">
            Santi & Kate &bull; 25 de Octubre 2026
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#5c6e64] hover:bg-[#899c8f] hover:text-white transition-all text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              <span>{isRefreshing ? "Actualizando..." : "Actualizar Datos"}</span>
            </button>
            <a
              href="https://bodask.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#5c6e64] hover:bg-gray-100 transition-all text-xs font-semibold shadow-sm"
            >
              <span>Ver Web Principal</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#5c6e64]/10 text-[#5c6e64] flex items-center justify-center mb-2">
              <Users size={20} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-[#5c6e64]">{totalPasses}</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mt-1">
              Pases Totales
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#3b7156]/10 text-[#3b7156] flex items-center justify-center mb-2">
              <UserCheck size={20} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-[#3b7156]">{totalCeremonyYes}</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mt-1">
              Ceremonia (Sí)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#899c8f]/15 text-[#899c8f] flex items-center justify-center mb-2">
              <Sparkles size={20} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-[#899c8f]">{totalReceptionYes}</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mt-1">
              Recepción (Sí)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#d6af6c]/15 text-[#c1a073] flex items-center justify-center mb-2">
              <Clock size={20} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-[#c1a073]">{totalPendingPasses}</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mt-1">
              Pases Pendientes
            </span>
          </div>
        </div>

        {/* Controls: Search & Tabs */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o enlace..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#899c8f] transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === "all"
                  ? "bg-[#5c6e64] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todos ({processedRows.length})
            </button>
            <button
              onClick={() => setFilterTab("confirmed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === "confirmed"
                  ? "bg-[#3b7156] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Confirmados ({processedRows.filter(r => r.hasResponded && !r.isFullyDeclined).length})
            </button>
            <button
              onClick={() => setFilterTab("pending")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === "pending"
                  ? "bg-[#d6af6c] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Pendientes ({processedRows.filter(r => !r.hasResponded).length})
            </button>
            <button
              onClick={() => setFilterTab("declined")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterTab === "declined"
                  ? "bg-rose-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              No Asisten ({processedRows.filter(r => r.isFullyDeclined).length})
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eeeae3] text-[#5c6e64] uppercase text-[11px] tracking-wider">
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200">ID / Enlace</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200">Invitados</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200 text-center">Pases</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200">Confirmaron</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200 text-center">Ceremonia</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200 text-center">Recepción</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200">Fecha Rta</th>
                <th className="p-3.5 md:p-4 font-semibold border-b border-gray-200 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredRows.map((row) => (
                <tr
                  key={row.guest.id}
                  className={`hover:bg-gray-50/80 transition-colors ${
                    !row.hasResponded ? "bg-gray-50/40 text-gray-500" : ""
                  }`}
                >
                  {/* ID / Link */}
                  <td className="p-3.5 md:p-4 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://bodask.vercel.app/?id=${row.guest.url_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5c6e64] hover:text-[#899c8f] hover:underline font-semibold inline-flex items-center gap-1"
                        title="Abrir invitación personalizada"
                      >
                        <span>{row.guest.url_id}</span>
                        <ExternalLink size={11} className="text-gray-400" />
                      </a>
                      <button
                        onClick={() => copyToClipboard(row.guest.url_id)}
                        className="p-1 rounded text-gray-400 hover:text-[#5c6e64] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Copiar enlace completo de invitación"
                      >
                        {copiedId === row.guest.url_id ? (
                          <CheckCircle2 size={13} className="text-emerald-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Invitados */}
                  <td className="p-3.5 md:p-4 font-medium text-gray-800">
                    {row.allNamesStr}
                  </td>

                  {/* Pases */}
                  <td className="p-3.5 md:p-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold text-xs">
                      {row.guest.passes}
                    </span>
                  </td>

                  {/* Confirmaron */}
                  <td className="p-3.5 md:p-4">
                    {row.hasResponded ? (
                      row.respondedGuests.length > 0 ? (
                        <span className="text-[#3b7156] font-medium">
                          {row.confirmedNamesStr}
                        </span>
                      ) : (
                        <span className="text-rose-600 font-medium">Ninguno</span>
                      )
                    ) : (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>

                  {/* Ceremonia */}
                  <td className="p-3.5 md:p-4 text-center">
                    {row.ceremonyStatus === "yes" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <Check size={12} strokeWidth={3} /> Sí
                      </span>
                    )}
                    {row.ceremonyStatus === "no" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                        <X size={12} strokeWidth={3} /> No
                      </span>
                    )}
                    {row.ceremonyStatus === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                        Pendiente
                      </span>
                    )}
                  </td>

                  {/* Recepción */}
                  <td className="p-3.5 md:p-4 text-center">
                    {row.receptionStatus === "yes" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <Check size={12} strokeWidth={3} /> Sí
                      </span>
                    )}
                    {row.receptionStatus === "no" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                        <X size={12} strokeWidth={3} /> No
                      </span>
                    )}
                    {row.receptionStatus === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                        Pendiente
                      </span>
                    )}
                  </td>

                  {/* Fecha Rta */}
                  <td className="p-3.5 md:p-4 text-xs text-gray-500 whitespace-nowrap">
                    {row.timestamp}
                  </td>

                  {/* Acciones */}
                  <td className="p-3.5 md:p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(row.guest)}
                        className="px-2.5 py-1 rounded-lg bg-[#899c8f]/15 hover:bg-[#899c8f] text-[#3f5046] hover:text-white transition-all text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                        title="Modificar o confirmar asistencia manualmente"
                      >
                        <Edit3 size={12} />
                        <span>Editar</span>
                      </button>
                      {row.hasResponded && (
                        <button
                          onClick={() => handleResetRSVP(row.guest.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Restablecer a pendiente"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No se encontraron invitados con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Manual Edit Modal */}
      {editingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 animate-in zoom-in-95">
            <button
              onClick={() => setEditingGuest(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer"
            >
              &times;
            </button>

            <h3 className="font-script text-3xl text-[#5c6e64] mb-1">
              Editar Asistencia
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-mono">
              Link: bodask.vercel.app/?id={editingGuest.url_id}
            </p>

            {/* Guest Selection */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                ¿Quiénes asisten?
              </label>
              <div className="flex flex-col gap-2">
                {(Array.isArray(editingGuest.guest_names)
                  ? editingGuest.guest_names
                  : [editingGuest.guest_names]
                ).map((name, idx) => {
                  const isChecked = editSelectedGuests.includes(name);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setEditSelectedGuests(editSelectedGuests.filter(g => g !== name));
                        } else {
                          setEditSelectedGuests([...editSelectedGuests, name]);
                        }
                      }}
                      className={`px-3 py-2 rounded-xl text-left text-sm font-medium flex items-center justify-between border cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      <span>{name}</span>
                      <span className="text-xs">{isChecked ? "✅ Asiste" : "❌ No asiste"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ceremony */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                Ceremonia (16:00 hs)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditCeremony(true)}
                  className={`py-2 px-3 rounded-xl text-sm font-semibold border cursor-pointer ${
                    editCeremony
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  Sí, asistirá
                </button>
                <button
                  type="button"
                  onClick={() => setEditCeremony(false)}
                  className={`py-2 px-3 rounded-xl text-sm font-semibold border cursor-pointer ${
                    !editCeremony
                      ? "bg-rose-500 text-white border-rose-500"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  No asistirá
                </button>
              </div>
            </div>

            {/* Reception */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                Recepción / Fiesta (18:00 hs)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditReception(true)}
                  className={`py-2 px-3 rounded-xl text-sm font-semibold border cursor-pointer ${
                    editReception
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  Sí, asistirá
                </button>
                <button
                  type="button"
                  onClick={() => setEditReception(false)}
                  className={`py-2 px-3 rounded-xl text-sm font-semibold border cursor-pointer ${
                    !editReception
                      ? "bg-rose-500 text-white border-rose-500"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  No asistirá
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingGuest(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isSavingEdit}
                className="px-6 py-2 rounded-full bg-[#3b7156] hover:bg-[#2e5944] text-white text-sm font-semibold transition-all shadow cursor-pointer disabled:opacity-50"
              >
                {isSavingEdit ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
