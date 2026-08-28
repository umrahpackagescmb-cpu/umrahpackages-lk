"use client";

import * as React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { agencyProfileFormSchema, type AgencyProfileFormValues } from "@/lib/validations/agency-profile";
import { updateAgencyProfile } from "@/lib/actions/agencies";
import type { Agency } from "@/types/domain";

export function AgencyProfileForm({ agency, agencyId }: { agency: Agency; agencyId: string }) {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgencyProfileFormValues>({
    resolver: zodResolver(agencyProfileFormSchema),
    defaultValues: {
      name: agency.name,
      description: agency.description,
      city: agency.city,
      address: agency.address ?? "",
      phone: agency.phone,
      whatsapp: agency.whatsapp,
      email: agency.email,
      website: agency.website ?? "",
    },
  });

  const onSubmit = async (values: AgencyProfileFormValues) => {
    setServerError(null);
    setSaved(false);
    const result = await updateAgencyProfile(agencyId, values);
    if (!result.ok) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSaved(true);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="gap-4 lg:col-span-1">
        <h2 className="font-display text-base font-semibold text-brand-navy">Logo</h2>
        <div className="flex items-center gap-4">
          <Image
            src={agency.logoUrl}
            alt={agency.name}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-xl border border-border object-cover"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Logo changes aren&rsquo;t self-service yet — contact us at{" "}
          <a href="mailto:Umrahpackages@gmail.com" className="font-medium text-brand-navy underline underline-offset-2">
            Umrahpackages@gmail.com
          </a>{" "}
          to update your logo.
        </p>
      </Card>

      <Card className="lg:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div>
            <Label htmlFor="name">Agency name</Label>
            <Input id="name" className="mt-1.5" placeholder="Your agency's name" {...register("name")} />
            {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="mt-1.5"
              rows={4}
              placeholder="Tell pilgrims what makes your agency stand out"
              {...register("description")}
            />
            {errors.description && <p className="mt-1.5 text-xs text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" className="mt-1.5" placeholder="Colombo, Kandy..." {...register("city")} />
              {errors.city && <p className="mt-1.5 text-xs text-destructive">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="address">Address (optional)</Label>
              <Input id="address" className="mt-1.5" placeholder="Street address" {...register("address")} />
              {errors.address && <p className="mt-1.5 text-xs text-destructive">{errors.address.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" className="mt-1.5" placeholder="+94 7X XXX XXXX" {...register("phone")} />
              {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" className="mt-1.5" placeholder="+94 7X XXX XXXX" {...register("whatsapp")} />
              {errors.whatsapp && <p className="mt-1.5 text-xs text-destructive">{errors.whatsapp.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-1.5" placeholder="you@agency.com" {...register("email")} />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="website">Website (optional)</Label>
              <Input id="website" className="mt-1.5" placeholder="https://..." {...register("website")} />
              {errors.website && <p className="mt-1.5 text-xs text-destructive">{errors.website.message}</p>}
            </div>
          </div>

          {serverError && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>
          )}
          {saved && !serverError && (
            <p className="flex items-center gap-2 rounded-lg bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
              <CheckCircle2 className="size-4 shrink-0 text-brand-gold-dark" />
              Profile updated.
            </p>
          )}

          <div>
            <Button type="submit" variant="gold" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
