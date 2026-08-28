"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { siteConfig } from "@/lib/site-config";
import {
  whatsappSubscribeSchema,
  type WhatsAppSubscribeValues,
} from "@/lib/validations/whatsapp-subscribe";

/**
 * "Get daily Quran verses & hadith on WhatsApp" opt-in gate, shown at the
 * bottom of the Daily Quran Verse and Daily Hadith pages. Submits to
 * /api/whatsapp-subscribe (writes to `whatsapp_subscribers`, demo-mode
 * safe — see that route), then reveals the WhatsApp Community join link.
 *
 * Consent is a required checkbox, not assumed — WhatsApp's own Business
 * Messaging Policy requires opt-in consent before messaging someone, and
 * the copy here is written to be honestly kept: don't repurpose these
 * numbers for anything beyond what's disclosed (see the migration file's
 * comment for the same note aimed at whoever operates this later).
 */
export function WhatsAppCommunityGate({ source }: { source: "daily-quran-verse" | "daily-hadith" }) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WhatsAppSubscribeValues>({
    resolver: zodResolver(whatsappSubscribeSchema),
    defaultValues: { phone: "", consent: false, source, company: "" },
  });

  const onSubmit = async (values: WhatsAppSubscribeValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/whatsapp-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card className="items-center gap-3 border-brand-gold/30 bg-brand-gold/5 py-10 text-center">
        <CheckCircle2 className="size-9 text-success" />
        <h3 className="font-display text-lg font-semibold text-brand-navy">You&rsquo;re in!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Tap below to join the WhatsApp Community — you&rsquo;ll get daily
          Qur&rsquo;an verses and hadith straight to your phone.
        </p>
        <Button variant="gold" size="lg" asChild className="mt-1 bg-[#25D366] text-white hover:bg-[#1ebc59]">
          <Link href={siteConfig.links.whatsappCommunity} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Join the WhatsApp Community
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="gap-4 border-brand-gold/30 bg-brand-gold/5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
          <MessageCircle className="size-5" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-brand-navy">
            Get daily Qur&rsquo;an verses &amp; hadith on WhatsApp
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your number to unlock our WhatsApp Community invite link.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
        {/* Honeypot — hidden from real users via CSS. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`company-${source}`}>Company</label>
          <input id={`company-${source}`} tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div>
          <Label htmlFor={`phone-${source}`} className="sr-only">
            Phone number
          </Label>
          <Input
            id={`phone-${source}`}
            type="tel"
            placeholder="+94 7X XXX XXXX"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>}
        </div>

        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="mt-0.5"
              />
              <span>
                I agree to receive occasional WhatsApp updates from{" "}
                {siteConfig.name}. This is a WhatsApp <strong>Community</strong>,
                not a group — your number stays private from other members,
                and we will never sell or share it with anyone else.
              </span>
            </label>
          )}
        />
        {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

        {status === "error" && (
          <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        )}

        <Button
          type="submit"
          variant="gold"
          disabled={status === "submitting"}
          className="self-start bg-[#25D366] text-white hover:bg-[#1ebc59]"
        >
          {status === "submitting" ? <Loader2 className="animate-spin" /> : <MessageCircle />}
          Get the WhatsApp link
        </Button>

        <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brand-gold-dark" />
          You can leave the Community any time. We don&rsquo;t use your
          number for anything besides these updates.
        </p>
      </form>
    </Card>
  );
}
