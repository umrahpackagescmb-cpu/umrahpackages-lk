"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { blogPostFormSchema, type BlogPostFormValues } from "@/lib/validations/blog";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { slugify, generateClientId } from "@/lib/slug";
import type { BlogPost } from "@/types/domain";

function estimateReadMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function BlogPostForm({
  post,
  onSaved,
  onCancel,
}: {
  post?: BlogPost;
  onSaved: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content.join("\n\n") ?? "",
      category: post?.category ?? "",
      coverImageUrl: post?.coverImageUrl ?? "",
      status: post?.status ?? "draft",
    },
  });

  const onSubmit = async (values: BlogPostFormValues) => {
    setServerError(null);
    const result = post ? await updateBlogPost(post.id, values) : await createBlogPost(values);

    if (!result.ok) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    const paragraphs = values.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const saved: BlogPost = {
      id: post?.id ?? result.postId ?? generateClientId("post"),
      slug: post?.slug ?? generateClientId(slugify(values.title)),
      title: values.title,
      excerpt: values.excerpt,
      content: paragraphs,
      coverImageUrl: values.coverImageUrl || post?.coverImageUrl || "/placeholders/cover-1.jpg",
      category: values.category,
      author: post?.author ?? "Admin Team",
      readMinutes: estimateReadMinutes(values.content),
      publishedAt:
        values.status === "published"
          ? (post?.status === "published" ? post.publishedAt : new Date().toISOString())
          : (post?.publishedAt ?? new Date().toISOString()),
      status: values.status,
    };

    onSaved(saved);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" className="mt-1.5" placeholder="Post title" {...register("title")} />
        {errors.title && <p className="mt-1.5 text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          className="mt-1.5"
          rows={2}
          placeholder="A short one or two sentence summary"
          {...register("excerpt")}
        />
        {errors.excerpt && <p className="mt-1.5 text-xs text-destructive">{errors.excerpt.message}</p>}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          className="mt-1.5"
          rows={10}
          placeholder="Write the article body here. Separate paragraphs with a blank line."
          {...register("content")}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">Separate paragraphs with a blank line.</p>
        {errors.content && <p className="mt-1.5 text-xs text-destructive">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" className="mt-1.5" placeholder="Guides, Planning, Spiritual..." {...register("category")} />
          {errors.category && <p className="mt-1.5 text-xs text-destructive">{errors.category.message}</p>}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="coverImageUrl">Cover image URL (optional)</Label>
        <Input
          id="coverImageUrl"
          className="mt-1.5"
          placeholder="https://... (can be added later)"
          {...register("coverImageUrl")}
        />
        {errors.coverImageUrl && <p className="mt-1.5 text-xs text-destructive">{errors.coverImageUrl.message}</p>}
      </div>

      {serverError && <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>}

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" variant="gold" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
          {post ? "Save changes" : "Create post"}
        </Button>
      </DialogFooter>
    </form>
  );
}
