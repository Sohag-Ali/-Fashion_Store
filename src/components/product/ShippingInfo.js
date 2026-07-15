import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function ShippingInfo() {
  const rows = [
    {
      icon: <Truck size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />,
      title: "Complimentary shipping",
      description: "Free standard delivery on all orders. Express delivery (1–2 business days) available at checkout.",
    },
    {
      icon: <RotateCcw size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />,
      title: "30-day returns",
      description: "Unworn items with original tags may be returned within 30 days for a full refund.",
    },
    {
      icon: <ShieldCheck size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />,
      title: "Authenticity guaranteed",
      description: "Every piece is inspected and verified before it leaves our atelier.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.title} className="flex items-start gap-3">
          {row.icon}
          <div>
            <p className="text-foreground font-medium mb-0.5">{row.title}</p>
            <p>{row.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
