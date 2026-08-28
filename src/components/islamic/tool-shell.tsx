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
        <div className="mx-auto max-w-2xl">{children}</div>
      </div>
    </>
  );
}
