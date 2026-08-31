"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

import { Check, X } from "lucide-react";

interface RSVPProps {
  urlId?: string;
  guestNames?: string[];
}

export default function RSVP({ urlId, guestNames = [] }: RSVPProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [ceremonyAttend, setCeremonyAttend] = useState<boolean | null>(null);
  const [receptionAttend, setReceptionAttend] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setStep(1);
    setIsSuccess(false);
    setSelectedGuests(guestNames.length === 1 ? [guestNames[0]] : []);
    setCeremonyAttend(null);
    setReceptionAttend(null);
  };

  const closeModal = () => setIsOpen(false);

  const toggleGuest = (name: string) => {
    if (selectedGuests.includes(name)) {
      setSelectedGuests(selectedGuests.filter(g => g !== name));
    } else {
      setSelectedGuests([...selectedGuests, name]);
    }
  };

  const selectAll = () => {
    if (selectedGuests.length === guestNames.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests([...guestNames]);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedGuests.length === 0) return;
    if (step === 2 && ceremonyAttend === null) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (receptionAttend !== null) {
        handleSubmit();
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!urlId) {
      alert("Error: No se encontró el ID de invitado.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const responseObj = {
        guests: selectedGuests,
        ceremony: ceremonyAttend,
        reception: receptionAttend,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('guests')
        .update({ 
          rsvp_responses: [responseObj] 
        })
        .eq('url_id', urlId);

      if (error) {
        console.error(error);
        alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
      } else {
        setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
      alert("Hubo un error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#eeeae3] pt-14 pb-24 flex flex-col items-center justify-center text-center px-4">
      
      <h2 className="font-script text-5xl md:text-6xl text-[#5c6e64] mb-4">
        Confirmar Asistencia
      </h2>

      {/* Nombres de los invitados en la sección */}
      {guestNames && guestNames.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-4 max-w-xl">
          {guestNames.map((name, idx) => (
            <div 
              key={idx}
              className="bg-white/90 border border-[#d6cfc5] px-5 py-2 rounded-full text-[#5c6e64] text-base md:text-lg font-medium shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>
      )}
      
      <p className="text-[#848484] mb-8 text-base md:text-lg max-w-md">
        {guestNames && guestNames.length > 1
          ? "Es muy importante que confirmen su asistencia"
          : "Es importante que confirmes tu asistencia"}
      </p>

      <button 
        onClick={openModal}
        className="px-10 py-3.5 rounded-full border border-gray-300 bg-white text-[#5c6e64] font-bold text-xs tracking-widest hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer uppercase"
      >
        CONFIRMAR ASISTENCIA
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
            
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-[#899c8f] text-gray-500 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              &times;
            </button>

            <div className="p-6 md:p-8 pt-8">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#899c8f]/20 text-[#5c6e64] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <h3 className="font-script text-4xl text-[#3b7156] mb-2">¡Gracias!</h3>
                  <p className="text-[#5c6e64] text-base md:text-lg mb-2">Hemos recibido tu confirmación.</p>
                  <p className="text-gray-400 text-sm">¡Nos alegra mucho contar contigo!</p>
                  <button 
                    onClick={closeModal}
                    className="mt-6 px-8 py-2.5 bg-[#899c8f] text-white rounded-full hover:bg-[#5c6e64] font-medium transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-script text-4xl text-[#5c6e64] mb-1">
                      Confirmar Asistencia
                    </h3>
                    <div className="flex justify-center gap-1.5 mt-2">
                      <span className={`w-6 h-1.5 rounded-full transition-all ${step === 1 ? 'bg-[#899c8f] w-8' : 'bg-gray-200'}`} />
                      <span className={`w-6 h-1.5 rounded-full transition-all ${step === 2 ? 'bg-[#899c8f] w-8' : 'bg-gray-200'}`} />
                      <span className={`w-6 h-1.5 rounded-full transition-all ${step === 3 ? 'bg-[#899c8f] w-8' : 'bg-gray-200'}`} />
                    </div>
                  </div>

                  {/* STEP 1: Seleccionar personas */}
                  {step === 1 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <div className="text-center mb-4">
                        <p className="text-[#3f5046] font-semibold text-lg">
                          ¿Quiénes van a asistir?
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Marca con un toque a las personas que confirman:
                        </p>
                      </div>

                      {guestNames.length > 1 && (
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={selectAll}
                            type="button"
                            className="text-xs text-[#899c8f] hover:text-[#5c6e64] font-medium underline cursor-pointer"
                          >
                            {selectedGuests.length === guestNames.length ? "Desmarcar todos" : "Seleccionar todos"}
                          </button>
                        </div>
                      )}
                      
                      <div className="flex flex-col gap-2.5 mb-6">
                        {guestNames.length > 0 ? (
                          guestNames.map((name, idx) => {
                            const isSelected = selectedGuests.includes(name);
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => toggleGuest(name)}
                                className={`w-full py-3 px-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between border-2 cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#899c8f]/12 border-[#899c8f] shadow-sm' 
                                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Checkbox visual */}
                                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                    isSelected
                                      ? 'bg-[#899c8f] border-[#899c8f] text-white shadow-sm'
                                      : 'border-gray-300 bg-white'
                                  }`}>
                                    {isSelected && <Check size={14} strokeWidth={3} />}
                                  </div>
                                  <span className={`text-base font-medium ${isSelected ? 'text-[#3f5046] font-semibold' : 'text-gray-700'}`}>
                                    {name}
                                  </span>
                                </div>

                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                  isSelected
                                    ? 'bg-[#899c8f] text-white'
                                    : 'bg-gray-200 text-gray-500'
                                }`}>
                                  {isSelected ? "Confirmado" : "Tocar para marcar"}
                                </span>
                              </button>
                            );
                          })
                        ) : (
                          <p className="text-gray-400 italic text-center py-4">No hay invitados asociados a este enlace.</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                          {selectedGuests.length} de {guestNames.length} {guestNames.length === 1 ? "persona" : "personas"}
                        </span>
                        <button 
                          onClick={handleNext}
                          disabled={selectedGuests.length === 0}
                          className="px-7 py-2.5 bg-[#899c8f] text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5c6e64] transition-all shadow hover:shadow-md cursor-pointer"
                        >
                          Siguiente &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Ceremonia */}
                  {step === 2 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <div className="text-center mb-6">
                        <p className="text-[#3f5046] font-semibold text-lg">
                          ¿Asisten a la Ceremonia?
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Domingo 25 de octubre - 16 hs
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <button
                          type="button"
                          onClick={() => setCeremonyAttend(true)}
                          className={`flex-1 py-4 px-4 rounded-xl transition-all border-2 flex flex-col items-center gap-1.5 cursor-pointer ${
                            ceremonyAttend === true 
                              ? 'bg-[#899c8f]/15 border-[#899c8f] text-[#3f5046] shadow-sm' 
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ceremonyAttend === true ? 'bg-[#899c8f] text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <Check size={18} strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-base">Sí, asistiré</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCeremonyAttend(false)}
                          className={`flex-1 py-4 px-4 rounded-xl transition-all border-2 flex flex-col items-center gap-1.5 cursor-pointer ${
                            ceremonyAttend === false 
                              ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm' 
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ceremonyAttend === false ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <X size={18} strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-base">No podré asistir</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <button 
                          onClick={handlePrev}
                          className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                        >
                          &larr; Anterior
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={ceremonyAttend === null}
                          className="px-7 py-2.5 bg-[#899c8f] text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5c6e64] transition-all shadow hover:shadow-md cursor-pointer"
                        >
                          Siguiente &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Recepción */}
                  {step === 3 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <div className="text-center mb-6">
                        <p className="text-[#3f5046] font-semibold text-lg">
                          ¿Asisten a la Recepción / Fiesta?
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Domingo 25 de octubre - 18 hs
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <button
                          type="button"
                          onClick={() => setReceptionAttend(true)}
                          className={`flex-1 py-4 px-4 rounded-xl transition-all border-2 flex flex-col items-center gap-1.5 cursor-pointer ${
                            receptionAttend === true 
                              ? 'bg-[#899c8f]/15 border-[#899c8f] text-[#3f5046] shadow-sm' 
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            receptionAttend === true ? 'bg-[#899c8f] text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <Check size={18} strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-base">Sí, asistiré</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReceptionAttend(false)}
                          className={`flex-1 py-4 px-4 rounded-xl transition-all border-2 flex flex-col items-center gap-1.5 cursor-pointer ${
                            receptionAttend === false 
                              ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm' 
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            receptionAttend === false ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <X size={18} strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-base">No podré asistir</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <button 
                          onClick={handlePrev}
                          className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                        >
                          &larr; Anterior
                        </button>
                        <button 
                          onClick={handleSubmit}
                          disabled={receptionAttend === null || isSubmitting}
                          className="px-7 py-2.5 bg-[#899c8f] text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5c6e64] transition-all shadow hover:shadow-md cursor-pointer"
                        >
                          {isSubmitting ? "Enviando..." : "Finalizar y Confirmar"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
