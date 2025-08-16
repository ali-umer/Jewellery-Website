"use client";

import { motion } from "framer-motion";

export function InputStringField({ id, name, value, onChange, label, placeholder, required, icon, isTextarea }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <label htmlFor={id} className="block text-sm text-white/80 mb-1">{label}</label>
      {isTextarea ? (
        <textarea id={id} name={name} value={value} onChange={onChange} required={required} rows={3} placeholder={placeholder} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-yellow-500" />
      ) : (
        <div className="relative">
          {icon && <span className="absolute left-3 top-2.5">{icon}</span>}
          <input type="text" id={id} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className={`w-full ${icon ? "pl-9" : "pl-4"} pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-yellow-500`} />
        </div>
      )}
    </motion.div>
  );
}
