"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { formatDate } from "@/lib/format";
import { deleteBlogPost, setBlogPostStatus } from "@/lib/actions/blog";
import type { BlogPost } from "@/types/domain";

function DeletePostButton({ post, onDeleted }: { post: BlogPost; onDeleted: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setPending(true);
    setError(null);
    const result = await deleteBlogPost(post.id);
    setPending(false);
    if (result.ok) {
      setOpen(false);
      onDeleted();
    } else {
      setError(result.error ?? "Couldn't delete this post. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete post">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this post?</DialogTitle>
          <DialogDescription>
            &ldquo;{post.title}&rdquo; will be permanently removed. This can&rsquo;t be undone.
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
            {pending ? "Deleting..." : "Delete post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatusToggleButton({ post, onChanged }: { post: BlogPost; onChanged: (status: BlogPost["status"]) => void }) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const next = post.status === "published" ? "draft" : "published";

  const handleClick = async () => {
    setPending(true);
    setError(null);
    const result = await setBlogPostStatus(post.id, next);
    setPending(false);
    if (result.ok) {
      onChanged(next);
    } else {
      setError(result.error ?? "Couldn't update status.");
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <Button variant="outline" size="sm" onClick={handleClick} disabled={pending}>
        {pending ? "Updating..." : next === "published" ? "Publish" : "Unpublish"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function BlogManager({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = React.useState(initialPosts);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<BlogPost | null>(null);

  const handleCreated = (post: BlogPost) => {
    setPosts((prev) => [post, ...prev]);
    setCreateOpen(false);
  };

  const handleUpdated = (post: BlogPost) => {
    setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
    setEditingPost(null);
  };

  const removePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStatus = (id: string, status: BlogPost["status"]) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status, publishedAt: status === "published" ? new Date().toISOString() : p.publishedAt } : p,
      ),
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Content Management</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Write, edit, and publish articles for the UmrahPackages.lk blog.
          </p>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="gold">
              <Plus /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New blog post</DialogTitle>
              <DialogDescription>Draft a new article. You can publish it now or save it as a draft.</DialogDescription>
            </DialogHeader>
            <BlogPostForm onSaved={handleCreated} onCancel={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        {posts.length === 0 ? (
          <EmptyState title="No posts yet" description="Articles you publish will appear here." />
        ) : (
          <div className="rounded-2xl border border-border/70 bg-white shadow-soft">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-[280px]">
                      <p className="truncate text-sm font-semibold text-brand-navy">{post.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{post.excerpt}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{post.category}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{post.author}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "success" : "outline"}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <StatusToggleButton post={post} onChanged={(status) => updateStatus(post.id, status)} />
                        <Button variant="ghost" size="icon" aria-label="Edit post" onClick={() => setEditingPost(post)}>
                          <Pencil className="size-4" />
                        </Button>
                        <DeletePostButton post={post} onDeleted={() => removePost(post.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={editingPost != null} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>Update the article and save your changes.</DialogDescription>
          </DialogHeader>
          {editingPost && (
            <BlogPostForm post={editingPost} onSaved={handleUpdated} onCancel={() => setEditingPost(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
