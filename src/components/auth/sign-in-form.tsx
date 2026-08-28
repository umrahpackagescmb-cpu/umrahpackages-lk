"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInInput) => {
    setError(null);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError("Sign-in isn't available yet — this deployment hasn't connected a Supabase project.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError || !data.user) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const redirectParam = searchParams.get("redirect");
      const role = profile?.role as string | undefined;
      const fallback = role === "travel_agency" ? "/agency" : "/admin";

      router.push(redirectParam || fallback);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="mt-1.5" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" className="mt-1.5" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>}
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" size="lg" variant="gold" disabled={submitting} className="w-full">
        {submitting ? <Loader2 className="animate-spin" /> : <LogIn />}
        Sign in
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Are you a travel agency?{" "}
        <Link href="/sign-up" className="font-medium text-brand-navy hover:text-brand-gold-dark">
          Register your agency
        </Link>
      </p>
    </form>
  );
}
