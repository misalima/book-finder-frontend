"use client";
import React, { useEffect, useState, useRef } from "react";

type ToastType = "success" | "error";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

const ANIMATION_MS = 300;

const Toast: React.FC<{
  toast: ToastItem;
  onClose: () => void;
}> = ({ toast, onClose }) => {
  const { type, message, duration } = toast;
  const [visible, setVisible] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 10);
    mountedRef.current = true;
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!duration || duration <= 0) return;
    const t = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(t);
  }, [duration]);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (visible) return;
    const t = window.setTimeout(() => onClose(), ANIMATION_MS);
    return () => window.clearTimeout(t);
  }, [visible, onClose]);

  const isError = type === "error";

  const baseClasses =
    "pointer-events-auto w-full max-w-sm shadow-lg rounded-lg border overflow-hidden transform transition-all duration-300 relative";

  const colorClasses = isError
    ? "bg-white dark:bg-gray-800 border-red-200 dark:border-red-700"
    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`${baseClasses} ${colorClasses} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      aria-atomic="true"
    >
      <div className="p-3 flex items-start gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
            isError ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
          }`}
          aria-hidden
        >
          {isError ? "!" : "✓"}
        </div>

        <div className="pr-4 flex-1 text-sm text-gray-900 dark:text-gray-100">
          <p className="font-medium">{isError ? "Erro" : "Sucesso"}</p>
          <p className="mt-1 text-xs leading-snug">{message}</p>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Fechar notificação"
          className="absolute top-1 right-2 p-1 rounded-md text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
