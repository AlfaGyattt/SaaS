"use client";

import * as React from "react";
import { MapPin, Clock, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { updateApplicationStatus, deleteApplication } from "@/server/actions/application";
import { APP_STATUSES, STATUS_LABELS, type AppStatus } from "@/server/types";

export function ApplicationCard({
  app,
}: {
  app: {
    id: string;
    company: string;
    role: string;
    city: string | null;
    status: string;
    matchScore: number | null;
    followUp: boolean;
  };
}) {
  const [pending, start] = React.useTransition();

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium leading-tight">{app.role}</p>
          <p className="truncate text-sm text-muted-foreground">{app.company}</p>
        </div>
        {app.matchScore != null && (
          <span className="shrink-0 rounded-full bg-primary-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-primary-700">
            {app.matchScore}%
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {app.city && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {app.city}
          </span>
        )}
        {app.followUp && (
          <span className="inline-flex items-center gap-1 text-warning">
            <Clock className="size-3.5" /> À relancer
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <select
          value={app.status}
          disabled={pending}
          onChange={(e) =>
            start(() => {
              updateApplicationStatus(app.id, e.target.value as AppStatus);
            })
          }
          className="h-8 flex-1 rounded-md border border-input bg-surface px-2 text-xs"
          aria-label="Changer le statut"
        >
          {APP_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        {pending ? (
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        ) : (
          <button
            onClick={() => start(() => void deleteApplication(app.id))}
            className="text-muted-foreground hover:text-danger"
            aria-label="Supprimer la candidature"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
    </Card>
  );
}
