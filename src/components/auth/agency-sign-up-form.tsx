"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { agencySignUpSchema, type AgencySignUpInput } from "@/lib/validations/auth";

export function AgencySignUpForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgencySignUpInput>({
    resolver: zodResolver(agencySignUpSchema),
    defaultValues: {
      agencyName: "",
      city: "",
      phone: "",
      whatsapp: "",
      description: "",
      email: "",
      password: "",
      company: "",
    },
  });

  const onSubmit = async (values: AgencySignUpInput) => {
    setError(null);

    // Honeypot tripped — silently pretend success.
    if (values.company) {
      setStatus("success");
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError("Registration isn't available yet — this deployment hasn't connected a Supabase project. Please email us instead.");
      return;
    }

    setStatus("submitting");
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.agencyName } },
      });

      if (signUpError || !data.user) {
        setError(signUpError?.message ?? "Couldn't create your account. Please try again.");
        setStatus("error");
        return;
      }

      const res = await fetch("/api/agency-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data.user.id,
          agencyName: values.agencyName,
          city: values.city,
          phone: values.phone,
          whatsapp: values.whatsapp,
          description: values.description,
          email: values.email,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Your login was created, but we couldn't finish setting up your agency. Please contact us.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-success/20 bg-success/5 py-14 text-center">
        <CheckCircle2 className="size-10 text-success" />
        <h3 className="font-display text-lg font-semibold text-brand-navy">Registration received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for registering! Our team will review your agency details and
          enable your dashboard once verified — usually within a couple of
          business days. We&rsquo;ll email you when you&rsquo;re live.
        </p>
        <Button variant="outline" size="sm" className="mt-2" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <Label htmlFor="agencyName">Agency name</Label>
        <Input id="agencyName" className="mt-1.5" placeholder="Your travel agency's name" {...register("agencyName")} />
        {errors.agencyName && <p className="mt-1.5 text-xs text-destructive">{errors.agencyName.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" className="mt-1.5" placeholder="Colombo" {...register("city")} />
          {errors.city && <p className="mt-1.5 text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" className="mt-1.5" placeholder="+94 7X XXX XXXX" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp number</Label>
        <Input id="whatsapp" className="mt-1.5" placeholder="+94 7X XXX XXXX" {...register("whatsapp")} />
        {errors.whatsapp && <p className="mt-1.5 text-xs text-destructive">{errors.whatsapp.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">About your agency</Label>
        <Textarea
          id="description"
          className="mt-1.5"
          rows={4}
          placeholder="Tell pilgrims what makes your agency trustworthy — years in business, licensing, specialties..."
          {...register("description")}
        />
        {errors.description && <p className="mt-1.5 text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Login email</Label>
          <Input id="email" type="email" className="mt-1.5" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" className="mt-1.5" placeholder="At least 8 characters" {...register("password")} />
          {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Your dashboard stays disabled until our team verifies your agency —
        this keeps every agency on UmrahPackages.lk trustworthy for pilgrims.
      </p>

      <Button type="submit" size="lg" variant="gold" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? <Loader2 className="animate-spin" /> : <UserPlus />}
        Register my agency
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-brand-navy hover:text-brand-gold-dark">
          Sign in
        </Link>
      </p>
    </form>
  );
}
