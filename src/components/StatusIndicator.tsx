import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusIndicatorProps {
  status: "online" | "busy" | "away" | "offline";
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "online":
        return {
          label: "Online",
          color: "bg-status-online",
          variant: "default" as const
        };
      case "busy":
        return {
          label: "Ocupado",
          color: "bg-status-busy",
          variant: "destructive" as const
        };
      case "away":
        return {
          label: "Ausente",
          color: "bg-status-away",
          variant: "secondary" as const
        };
      case "offline":
        return {
          label: "Offline",
          color: "bg-status-offline",
          variant: "outline" as const
        };
      default:
        return {
          label: "Desconhecido",
          color: "bg-muted",
          variant: "outline" as const
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    </div>
  );
};