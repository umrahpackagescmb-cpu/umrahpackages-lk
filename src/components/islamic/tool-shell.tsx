import { Info } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";

export function ToolShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Islamic Tools", href: "/islamic-tools" },
          { label: title },
        ]}
      />
      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          {children}

          {/* Every Islamic Tools page shares this note — general guidance,
           * not tied to any school of thought or organization, with a
           * pointer to a real scholar for anything ruling-specific. Kept
           * here in the shared shell so it's consistent site-wide rather
           * than re-typed (and potentially re-worded) on each page. */}
          <div className="mt-12 flex gap-3 rounded-2xl border border-border bg-brand-gray/40 p-4 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
            <p>
              This tool and its guidance are presented in general terms and are not affiliated with, or
              speaking on behalf of, any particular school of thought, sect, or organization. For a ruling
              specific to your own situation, please consult your Maulavi or a qualified religious scholar
              you trust.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
