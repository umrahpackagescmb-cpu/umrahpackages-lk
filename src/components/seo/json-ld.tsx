/**
 * Renders a JSON-LD <script> tag. `data` is JSON.stringify'd server-side —
 * safe against injection because we control every value passed in (never
 * pass raw unescaped user HTML here).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
