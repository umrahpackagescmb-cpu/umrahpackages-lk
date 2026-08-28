"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Package as PackageIcon, Pencil, Trash2 } from "lucide-react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { EmptyState } from "@/components/layout/empty-state";
import { formatLkr } from "@/lib/format";
import { setPackagePublished, deletePackage } from "@/lib/actions/packages";
import type { Package } from "@/types/domain";

function PublishedToggle({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: (next: boolean) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = async (next: boolean) => {
    setPending(true);
    setError(null);
    const result = await onToggle(next);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Couldn't update.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Switch checked={checked} onCheckedChange={handleChange} disabled={pending} aria-label="Toggle published" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function DeletePackageButton({ pkg, onDeleted }: { pkg: Package; onDeleted: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setPending(true);
    setError(null);
    const result = await deletePackage(pkg.id);
    setPending(false);
    if (result.ok) {
      setOpen(false);
      onDeleted();
    } else {
      setError(result.error ?? "Couldn't delete this package. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete package">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this package?</DialogTitle>
          <DialogDescription>
            &ldquo;{pkg.title}&rdquo; will be permanently removed. This can&rsquo;t be undone.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? "Deleting..." : "Delete package"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PackageList({ packages: initialPackages }: { packages: Package[] }) {
  const [packages, setPackages] = React.useState(initialPackages);

  const removePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePackageState = (id: string, patch: Partial<Package>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  if (packages.length === 0) {
    return (
      <EmptyState
        icon={PackageIcon}
        title="No packages yet"
        description="Add your first Umrah package so pilgrims comparing offers on UmrahPackages.lk can find your agency."
        actionLabel="Add Package"
        actionHref="/agency/packages/new"
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-white shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={pkg.coverImageUrl}
                    alt={pkg.title}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-xl border border-border object-cover"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[220px] items-center gap-1 truncate text-sm font-semibold text-brand-navy hover:text-brand-gold-dark"
                    >
                      <span className="truncate">{pkg.title}</span>
                      <ExternalLink className="size-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-brand-navy">{formatLkr(pkg.priceLkr)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{pkg.durationDays} days</TableCell>
              <TableCell>
                <Badge variant={pkg.isPublished ? "success" : "outline"}>
                  {pkg.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                <PublishedToggle
                  checked={pkg.isPublished}
                  onToggle={async (next) => {
                    const result = await setPackagePublished(pkg.id, next);
                    if (result.ok) updatePackageState(pkg.id, { isPublished: next });
                    return result;
                  }}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" aria-label="Edit package" asChild>
                    <Link href={`/agency/packages/${pkg.id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeletePackageButton pkg={pkg} onDeleted={() => removePackage(pkg.id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
