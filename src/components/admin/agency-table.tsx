"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TrustBadgeList, TRUST_BADGE_CONFIG } from "@/components/badges/trust-badge";
import { formatDate } from "@/lib/format";
import { setAgencyActive, setAgencyBadges } from "@/lib/actions/agencies";
import type { Agency, TrustBadgeType } from "@/types/domain";

const ALL_BADGES = Object.keys(TRUST_BADGE_CONFIG) as TrustBadgeType[];

function ActiveToggle({ agency, onChange }: { agency: Agency; onChange: (isActive: boolean) => void }) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = async (next: boolean) => {
    setPending(true);
    setError(null);
    const result = await setAgencyActive(agency.id, next);
    setPending(false);
    if (result.ok) {
      onChange(next);
    } else {
      setError(result.error ?? "Couldn't update. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <Switch checked={agency.isActive} onCheckedChange={handleChange} disabled={pending} aria-label="Toggle active" />
        <span className="text-xs text-muted-foreground">{agency.isActive ? "Active" : "Pending"}</span>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function BadgeDialog({ agency, onChange }: { agency: Agency; onChange: (badges: TrustBadgeType[]) => void }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TrustBadgeType[]>(agency.badges);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setSelected(agency.badges);
      setError(null);
    }
  };

  const toggleBadge = (badge: TrustBadgeType, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, badge] : prev.filter((b) => b !== badge)));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const result = await setAgencyBadges(agency.id, selected);
    setSaving(false);
    if (result.ok) {
      onChange(selected);
      setOpen(false);
    } else {
      setError(result.error ?? "Couldn't save badges. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ShieldCheck /> Manage Badges
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trust badges — {agency.name}</DialogTitle>
          <DialogDescription>
            Assign or remove the badges shown on this agency&rsquo;s public listing and packages.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {ALL_BADGES.map((badge) => {
            const config = TRUST_BADGE_CONFIG[badge];
            const checked = selected.includes(badge);
            return (
              <label
                key={badge}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/70 px-3.5 py-2.5 hover:bg-brand-gray/40"
              >
                <Checkbox checked={checked} onCheckedChange={(v) => toggleBadge(badge, v === true)} />
                <span className="text-sm font-medium text-brand-navy">{config.label}</span>
              </label>
            );
          })}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={saving}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="gold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save badges"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AgencyTable({ agencies: initialAgencies }: { agencies: Agency[] }) {
  const [agencies, setAgencies] = React.useState(initialAgencies);

  const updateAgency = (id: string, patch: Partial<Agency>) => {
    setAgencies((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agency</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Badges</TableHead>
          <TableHead>Packages</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agencies.map((agency) => (
          <TableRow key={agency.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  src={agency.logoUrl}
                  alt={agency.name}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-xl border border-border object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brand-navy">{agency.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{agency.city}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <ActiveToggle agency={agency} onChange={(isActive) => updateAgency(agency.id, { isActive })} />
            </TableCell>
            <TableCell>
              {agency.badges.length > 0 ? (
                <TrustBadgeList badges={agency.badges} iconOnly />
              ) : (
                <span className="text-xs text-muted-foreground">None</span>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{agency.packageCount}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{formatDate(agency.createdAt)}</TableCell>
            <TableCell className="text-right">
              <BadgeDialog agency={agency} onChange={(badges) => updateAgency(agency.id, { badges })} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
