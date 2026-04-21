"use client";

import { createContext, useContext, useState } from "react";

const LeadCtx = createContext(null);

export function LeadProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState(null);

  const openForm = (presetService = null) => {
    setPreset(presetService);
    setOpen(true);
  };
  const closeForm = () => setOpen(false);

  return (
    <LeadCtx.Provider value={{ open, preset, openForm, closeForm }}>
      {children}
    </LeadCtx.Provider>
  );
}

export function useLead() {
  const ctx = useContext(LeadCtx);
  if (!ctx) throw new Error("useLead must be used within LeadProvider");
  return ctx;
}
