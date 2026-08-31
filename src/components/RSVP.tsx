"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

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
    setSelectedGuests(guestNames && guestNames.length > 0 ? [...guestNames] : []);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#899c8f] text-white rounded-full hover:bg-[#5c6e64] transition-colors"
            >
              &times;
            </button>

            <div className="p-8 pb-10">
              {isSuccess ? (
                <div className="text-center py-10">
                  <h3 className="font-script text-4xl text-[#3b7156] mb-4">¡Gracias!</h3>
                  <p className="text-[#5c6e64] text-lg">Hemos recibido tu confirmación.</p>
                  <button 
                    onClick={closeModal}
                    className="mt-8 px-8 py-2 bg-[#899c8f] text-white rounded-md hover:bg-[#5c6e64] transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-script text-4xl text-[#3b7156] text-center mb-6">
                    Confirmar Asistencia
                  </h3>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <p className="text-[#5c6e64] text-center text-lg mb-6">
                        ¿Quién está confirmando? <span className="text-red-500">*</span>
                      </p>
                      
                      <div className="flex flex-col gap-3 mb-8">
                        {guestNames.length > 0 ? (
                          guestNames.map((name, idx) => (
                            <button
                              key={idx}
                              onClick={() => toggleGuest(name)}
                              className={`py-3 px-6 rounded-md text-left transition-colors text-lg ${
                                selectedGuests.includes(name) 
                                  ? 'bg-[#899c8f] text-white' 
                                  : 'bg-[#eeebe5] text-[#5c6e64] hover:bg-[#e0dcd4]'
                              }`}
                            >
                              {name}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-400 italic text-center">No hay invitados registrados.</p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button 
                          onClick={handleNext}
                          disabled={selectedGuests.length === 0}
                          className="px-6 py-2 bg-[#899c8f] text-white rounded-md disabled:opacity-50 hover:bg-[#5c6e64] transition-colors"
                        >
                          Siguiente &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <p className="text-[#5c6e64] text-center text-lg mb-6">
                        ¿Asistes a la Ceremonia? <span className="text-red-500">*</span>
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <button
                          onClick={() => setCeremonyAttend(true)}
                          className={`flex-1 py-3 px-4 rounded-md transition-colors ${
                            ceremonyAttend === true 
                              ? 'bg-[#899c8f] text-white' 
                              : 'bg-[#eeebe5] text-[#5c6e64] hover:bg-[#e0dcd4]'
                          }`}
                        >
                          Sí, asistiré
                        </button>
                        <button
                          onClick={() => setCeremonyAttend(false)}
                          className={`flex-1 py-3 px-4 rounded-md transition-colors ${
                            ceremonyAttend === false 
                              ? 'bg-[#899c8f] text-white' 
                              : 'bg-[#eeebe5] text-[#5c6e64] hover:bg-[#e0dcd4]'
                          }`}
                        >
                          No asistiré
                        </button>
                      </div>

                      <div className="flex justify-between mt-auto">
                        <button 
                          onClick={handlePrev}
                          className="px-6 py-2 bg-[#c2d0c7] text-white rounded-md hover:bg-[#899c8f] transition-colors"
                        >
                          &larr; Anterior
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={ceremonyAttend === null}
                          className="px-6 py-2 bg-[#899c8f] text-white rounded-md disabled:opacity-50 hover:bg-[#5c6e64] transition-colors"
                        >
                          Siguiente &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="flex flex-col animate-in slide-in-from-right-4">
                      <p className="text-[#5c6e64] text-center text-lg mb-6">
                        ¿Asistes a la Recepción? <span className="text-red-500">*</span>
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <button
                          onClick={() => setReceptionAttend(true)}
                          className={`flex-1 py-3 px-4 rounded-md transition-colors ${
                            receptionAttend === true 
                              ? 'bg-[#899c8f] text-white' 
                              : 'bg-[#eeebe5] text-[#5c6e64] hover:bg-[#e0dcd4]'
                          }`}
                        >
                          Sí, asistiré
                        </button>
                        <button
                          onClick={() => setReceptionAttend(false)}
                          className={`flex-1 py-3 px-4 rounded-md transition-colors ${
                            receptionAttend === false 
                              ? 'bg-[#899c8f] text-white' 
                              : 'bg-[#eeebe5] text-[#5c6e64] hover:bg-[#e0dcd4]'
                          }`}
                        >
                          No asistiré
                        </button>
                      </div>

                      <div className="flex justify-between mt-auto">
                        <button 
                          onClick={handlePrev}
                          className="px-6 py-2 bg-[#c2d0c7] text-white rounded-md hover:bg-[#899c8f] transition-colors"
                        >
                          &larr; Anterior
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={receptionAttend === null || isSubmitting}
                          className="px-6 py-2 bg-[#899c8f] text-white rounded-md disabled:opacity-50 hover:bg-[#5c6e64] transition-colors flex items-center justify-center min-w-[120px]"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Siguiente \u2192"
                          )}
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
