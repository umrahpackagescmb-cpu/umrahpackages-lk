"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { packageFormSchema, type PackageFormValues } from "@/lib/validations/package";
import { createPackage, updatePackage } from "@/lib/actions/packages";
import type { Package } from "@/types/domain";

const STAR_OPTIONS = [1, 2, 3, 4, 5];

function buildDefaultValues(pkg?: Package): PackageFormValues {
  return {
    title: pkg?.title ?? "",
    priceLkr: pkg?.priceLkr ?? 0,
    priceUsd: pkg?.priceUsd ?? "",
    durationDays: pkg?.durationDays ?? 7,
    departureCity: pkg?.departureCity ?? "",
    airline: pkg?.airline ?? "",
    makkahHotel: pkg?.makkahHotel ?? "",
    makkahHotelStars: pkg?.makkahHotelStars ?? 4,
    makkahHotelLat: pkg?.makkahHotelLat ?? "",
    makkahHotelLng: pkg?.makkahHotelLng ?? "",
    madinahHotel: pkg?.madinahHotel ?? "",
    madinahHotelStars: pkg?.madinahHotelStars ?? 4,
    madinahHotelLat: pkg?.madinahHotelLat ?? "",
    madinahHotelLng: pkg?.madinahHotelLng ?? "",
    mealPlan: pkg?.mealPlan ?? "",
    transport: pkg?.transport ?? "",
    visaIncluded: pkg?.visaIncluded ?? true,
    groupType: pkg?.groupType ?? "group",
    category: pkg?.category ?? "standard",
    departureDates: pkg?.departureDates?.length ? pkg.departureDates.map((date) => ({ date })) : [],
    seatsAvailable: pkg?.seatsAvailable ?? "",
    inclusions: pkg?.inclusions.join("\n") ?? "",
    exclusions: pkg?.exclusions.join("\n") ?? "",
    tags: pkg?.tags.join(", ") ?? "",
    isPublished: pkg?.isPublished ?? true,
  };
}

export function PackageForm({ agencyId, pkg }: { agencyId: string; pkg?: Package }) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: buildDefaultValues(pkg),
  });

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({ control, name: "departureDates" });

  const onSubmit = async (values: PackageFormValues) => {
    setServerError(null);
    const result = pkg ? await updatePackage(pkg.id, agencyId, values) : await createPackage(agencyId, values);

    if (!result.ok) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/agency/packages");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Basics</CardTitle>
          <CardDescription>The core details pilgrims see first.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="title">Package title</Label>
            <Input
              id="title"
              className="mt-1.5"
              placeholder="e.g. Premium 14-Day Makkah & Madinah Umrah"
              {...register("title")}
            />
            {errors.title && <p className="mt-1.5 text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="priceLkr">Price (LKR)</Label>
            <Input id="priceLkr" type="number" min={0} className="mt-1.5" {...register("priceLkr")} />
            {errors.priceLkr && <p className="mt-1.5 text-xs text-destructive">{errors.priceLkr.message}</p>}
          </div>

          <div>
            <Label htmlFor="priceUsd">Price (USD, optional)</Label>
            <Input id="priceUsd" type="number" min={0} className="mt-1.5" {...register("priceUsd")} />
            {errors.priceUsd && <p className="mt-1.5 text-xs text-destructive">{errors.priceUsd.message}</p>}
          </div>

          <div>
            <Label htmlFor="durationDays">Duration (days)</Label>
            <Input id="durationDays" type="number" min={1} max={60} className="mt-1.5" {...register("durationDays")} />
            {errors.durationDays && <p className="mt-1.5 text-xs text-destructive">{errors.durationDays.message}</p>}
          </div>

          <div>
            <Label htmlFor="departureCity">Departure city</Label>
            <Input id="departureCity" className="mt-1.5" placeholder="Colombo (CMB)" {...register("departureCity")} />
            {errors.departureCity && (
              <p className="mt-1.5 text-xs text-destructive">{errors.departureCity.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label>Departure dates (optional)</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Add every date this package departs at the price above. If a date needs a
              different price, list it as a separate package instead of adding it here.
            </p>

            <div className="mt-3 flex flex-col gap-2">
              {dateFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    type="date"
                    aria-label={`Departure date ${index + 1}`}
                    className="max-w-56"
                    {...register(`departureDates.${index}.date` as const)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove this date"
                    onClick={() => removeDate(index)}
                  >
                    <X className="size-4" />
                  </Button>
                  {errors.departureDates?.[index]?.date && (
                    <p className="text-xs text-destructive">{errors.departureDates[index]?.date?.message}</p>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => appendDate({ date: "" })}
            >
              <Plus className="size-4" /> Add departure date
            </Button>

            {errors.departureDates?.message && (
              <p className="mt-1.5 text-xs text-destructive">{errors.departureDates.message}</p>
            )}
            {errors.departureDates?.root?.message && (
              <p className="mt-1.5 text-xs text-destructive">{errors.departureDates.root.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="seatsAvailable">Seats available (optional)</Label>
            <Input id="seatsAvailable" type="number" min={0} className="mt-1.5" {...register("seatsAvailable")} />
            {errors.seatsAvailable && (
              <p className="mt-1.5 text-xs text-destructive">{errors.seatsAvailable.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Flight &amp; Hotels</CardTitle>
          <CardDescription>Airline and accommodation for this package.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="airline">Airline</Label>
            <Input id="airline" className="mt-1.5" placeholder="SriLankan Airlines" {...register("airline")} />
            {errors.airline && <p className="mt-1.5 text-xs text-destructive">{errors.airline.message}</p>}
          </div>

          <div>
            <Label htmlFor="makkahHotel">Makkah hotel</Label>
            <Input id="makkahHotel" className="mt-1.5" {...register("makkahHotel")} />
            {errors.makkahHotel && <p className="mt-1.5 text-xs text-destructive">{errors.makkahHotel.message}</p>}
          </div>

          <div>
            <Label htmlFor="makkahHotelStars">Makkah hotel stars</Label>
            <Controller
              control={control}
              name="makkahHotelStars"
              render={({ field }) => (
                <Select value={String(field.value)} onValueChange={field.onChange}>
                  <SelectTrigger id="makkahHotelStars" className="mt-1.5 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAR_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} star{n > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-5 rounded-xl border border-dashed border-border p-4">
            <div className="col-span-2">
              <p className="text-sm font-medium text-brand-navy">
                Makkah hotel coordinates <span className="font-normal text-muted-foreground">(optional)</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Adds a real walking-route map and distance/time to Masjid al-Haram
                on your listing. Leave blank if you don&rsquo;t know it — find it by
                searching the hotel name on{" "}
                <a
                  href="https://www.openstreetmap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-navy"
                >
                  OpenStreetMap
                </a>{" "}
                and copying the coordinates.
              </p>
            </div>
            <div>
              <Label htmlFor="makkahHotelLat">Latitude</Label>
              <Input id="makkahHotelLat" type="number" step="any" placeholder="21.4187" className="mt-1.5" {...register("makkahHotelLat")} />
              {errors.makkahHotelLat && <p className="mt-1.5 text-xs text-destructive">{errors.makkahHotelLat.message}</p>}
            </div>
            <div>
              <Label htmlFor="makkahHotelLng">Longitude</Label>
              <Input id="makkahHotelLng" type="number" step="any" placeholder="39.8258" className="mt-1.5" {...register("makkahHotelLng")} />
              {errors.makkahHotelLng && <p className="mt-1.5 text-xs text-destructive">{errors.makkahHotelLng.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="madinahHotel">Madinah hotel</Label>
            <Input id="madinahHotel" className="mt-1.5" {...register("madinahHotel")} />
            {errors.madinahHotel && <p className="mt-1.5 text-xs text-destructive">{errors.madinahHotel.message}</p>}
          </div>

          <div>
            <Label htmlFor="madinahHotelStars">Madinah hotel stars</Label>
            <Controller
              control={control}
              name="madinahHotelStars"
              render={({ field }) => (
                <Select value={String(field.value)} onValueChange={field.onChange}>
                  <SelectTrigger id="madinahHotelStars" className="mt-1.5 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAR_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} star{n > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-5 rounded-xl border border-dashed border-border p-4">
            <div className="col-span-2">
              <p className="text-sm font-medium text-brand-navy">
                Madinah hotel coordinates <span className="font-normal text-muted-foreground">(optional)</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Same idea, but to Al-Masjid an-Nabawi. Leave blank if unknown.
              </p>
            </div>
            <div>
              <Label htmlFor="madinahHotelLat">Latitude</Label>
              <Input id="madinahHotelLat" type="number" step="any" placeholder="24.4686" className="mt-1.5" {...register("madinahHotelLat")} />
              {errors.madinahHotelLat && <p className="mt-1.5 text-xs text-destructive">{errors.madinahHotelLat.message}</p>}
            </div>
            <div>
              <Label htmlFor="madinahHotelLng">Longitude</Label>
              <Input id="madinahHotelLng" type="number" step="any" placeholder="39.6096" className="mt-1.5" {...register("madinahHotelLng")} />
              {errors.madinahHotelLng && <p className="mt-1.5 text-xs text-destructive">{errors.madinahHotelLng.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="mealPlan">Meal plan (optional)</Label>
            <Input id="mealPlan" className="mt-1.5" placeholder="Half Board" {...register("mealPlan")} />
            {errors.mealPlan && <p className="mt-1.5 text-xs text-destructive">{errors.mealPlan.message}</p>}
          </div>

          <div>
            <Label htmlFor="transport">Transport (optional)</Label>
            <Input id="transport" className="mt-1.5" placeholder="Private AC Coach" {...register("transport")} />
            {errors.transport && <p className="mt-1.5 text-xs text-destructive">{errors.transport.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Details</CardTitle>
          <CardDescription>Group type, category, and what&rsquo;s included.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="groupType">Group type</Label>
              <Controller
                control={control}
                name="groupType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="groupType" className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category" className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="visaIncluded"
            render={({ field }) => (
              <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <div>
                  <Label htmlFor="visaIncluded">Visa included</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">Is the Umrah visa bundled in the price?</p>
                </div>
                <Switch id="visaIncluded" checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />

          <div>
            <Label htmlFor="inclusions">Inclusions</Label>
            <Textarea
              id="inclusions"
              className="mt-1.5"
              rows={5}
              placeholder={"Return airfare\nUmrah visa\n5★ Haram-view hotels"}
              {...register("inclusions")}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">One inclusion per line.</p>
            {errors.inclusions && <p className="mt-1.5 text-xs text-destructive">{errors.inclusions.message}</p>}
          </div>

          <div>
            <Label htmlFor="exclusions">Exclusions (optional)</Label>
            <Textarea
              id="exclusions"
              className="mt-1.5"
              rows={4}
              placeholder={"Personal expenses\nQurbani (optional add-on)"}
              {...register("exclusions")}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">One exclusion per line.</p>
            {errors.exclusions && <p className="mt-1.5 text-xs text-destructive">{errors.exclusions.message}</p>}
          </div>

          <div>
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input id="tags" className="mt-1.5" placeholder="5-star, haram-view, group-departure" {...register("tags")} />
            <p className="mt-1.5 text-xs text-muted-foreground">Comma-separated, used for search &amp; filters.</p>
            {errors.tags && <p className="mt-1.5 text-xs text-destructive">{errors.tags.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-brand-navy">Publishing</CardTitle>
          <CardDescription>Control whether this package is visible to the public.</CardDescription>
        </CardHeader>
        <CardContent>
          <Controller
            control={control}
            name="isPublished"
            render={({ field }) => (
              <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <div>
                  <Label htmlFor="isPublished">Publish this package</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Unpublished packages are only visible to you.
                  </p>
                </div>
                <Switch id="isPublished" checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
        </CardContent>
      </Card>

      {serverError && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" disabled={isSubmitting} asChild>
          <Link href="/agency/packages">Cancel</Link>
        </Button>
        <Button type="submit" variant="gold" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
          {pkg ? "Save Changes" : "Create Package"}
        </Button>
      </div>
    </form>
  );
}
