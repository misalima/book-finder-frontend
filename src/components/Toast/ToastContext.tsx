"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "./Toast";

type ToastType = "success" | "error";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

type ToastContextType = {
  showToast: (type: ToastType, message: string, duration?: number) => string;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const item: ToastItem = { id, type, message, duration };
      // add newest first so they stack from top -> down
      setToasts((prev) => [item, ...prev]);

      // The Toast component handles auto-dismiss and exit animations itself,
      // so we don't remove it here immediately with a global timeout.
      return id;
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed top-4 right-4 z-50"
      >
        <div className="flex flex-col items-end gap-3">
          {toasts.map((t) => (
            <Toast key={t.id} toast={t} onClose={() => dismissToast(t.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

export default ToastContext;
