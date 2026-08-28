"use client";

import * as React from "react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { EmptyState } from "@/components/layout/empty-state";
import { formatDate } from "@/lib/format";
import { setInquiryStatus } from "@/lib/actions/inquiries";
import { cn } from "@/lib/utils";
import type { Inquiry, InquiryChannel, InquiryStatus } from "@/types/domain";

const CHANNEL_LABELS: Record<InquiryChannel, string> = {
  whatsapp: "WhatsApp",
  phone: "Phone",
  email: "Email",
  form: "Contact form",
};

const STATUS_FILTERS: { value: InquiryStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

function StatusPicker({ inquiry, onChange }: { inquiry: Inquiry; onChange: (status: InquiryStatus) => void }) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = async (value: string) => {
    const status = value as InquiryStatus;
    setPending(true);
    setError(null);
    const result = await setInquiryStatus(inquiry.id, status);
    setPending(false);
    if (result.ok) {
      onChange(status);
    } else {
      setError(result.error ?? "Couldn't update status.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Select value={inquiry.status} onValueChange={handleChange} disabled={pending}>
        <SelectTrigger size="sm" className="w-[130px]" aria-label={`Update status for ${inquiry.name}'s inquiry`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function AgencyInquiriesTable({ inquiries: initialInquiries }: { inquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = React.useState(initialInquiries);
  const [filter, setFilter] = React.useState<InquiryStatus | "all">("all");

  const updateStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  if (inquiries.length === 0) {
    return (
      <EmptyState
        title="No inquiries yet"
        description="When a pilgrim reaches out over WhatsApp, phone, email, or your contact form, it'll show up here."
      />
    );
  }

  const visible = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === f.value
                ? "bg-brand-navy text-white"
                : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {visible.length === 0 ? (
          <EmptyState title="No inquiries found" description="Inquiries matching this filter will appear here." />
        ) : (
          <div className="rounded-2xl border border-border/70 bg-white shadow-soft">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <p className="text-sm font-semibold text-brand-navy">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {inquiry.phone ?? inquiry.email ?? "—"}
                      </p>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {inquiry.packageTitle ?? "General"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="muted">{CHANNEL_LABELS[inquiry.channel]}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusPicker inquiry={inquiry} onChange={(status) => updateStatus(inquiry.id, status)} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(inquiry.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
