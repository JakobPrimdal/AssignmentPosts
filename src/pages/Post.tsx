import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePost } from "@/hooks/usePost";
import { deletePost } from "@/api/posts";

export function Post() {
    const { id } = useParams();
    const postId = Number(id);
    const navigate = useNavigate();
    const { post, comments, loading, error, retry } = usePost(postId);

    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    async function handleDelete() {
        if (!confirm("Delete this post?")) return;

        setDeleting(true);
        setDeleteError(null);

        try {
            await deletePost(postId);
            navigate("/");
        } catch {
            setDeleteError("Could not delete this post.");
            setDeleting(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
            <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
                <div className="mx-auto max-w-2xl px-4 py-4">
                    <Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
                        ← Back to feed
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-6">
                {loading && <p className="py-6 text-center text-slate-500">Loading post…</p>}

                {error && (
                    <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-5 text-center">
                        <p className="text-red-100">{error}</p>
                        <button
                            type="button"
                            onClick={retry}
                            className="mt-3 rounded-full bg-red-500/15 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-500/25"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && post && (
                    <>
                        <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
                            <header className="flex items-center gap-3">
                                <img
                                    src={post.author?.image}
                                    alt=""
                                    className="size-11 shrink-0 rounded-full bg-slate-800 ring-1 ring-slate-700"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold text-slate-100">
                                        {post.author ? `${post.author.firstName} ${post.author.lastName}` : "Unknown user"}
                                    </p>
                                    <p className="truncate text-sm text-slate-500">@{post.author?.username ?? "unknown"}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                                >
                                    {deleting ? "Deleting…" : "Delete"}
                                </button>
                            </header>

                            <h1 className="mt-4 text-xl leading-snug font-semibold text-slate-50">{post.title}</h1>
                            <p className="mt-2 leading-relaxed text-slate-300">{post.body}</p>

                            <ul className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <li key={tag} className="rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-400">
                                        #{tag}
                                    </li>
                                ))}
                            </ul>

                            {deleteError && <p className="mt-3 text-sm text-red-400">{deleteError}</p>}

                            <footer className="mt-5 flex items-center gap-6 border-t border-slate-800 pt-4 text-sm text-slate-400">
                                <span>👍 {post.reactions.likes}</span>
                                <span>👎 {post.reactions.dislikes}</span>
                                <span>{post.views} views</span>
                            </footer>
                        </article>

                        <section className="mt-6">
                            <h2 className="mb-3 text-sm font-semibold text-slate-400">
                                {comments.length} comment{comments.length === 1 ? "" : "s"}
                            </h2>

                            <div className="flex flex-col gap-3">
                                {comments.map(comment => (
                                    <div key={comment.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                                        <p className="text-sm font-medium text-slate-300">{comment.user.fullName}</p>
                                        <p className="mt-1 text-slate-200">{comment.body}</p>
                                        <p className="mt-2 text-xs text-slate-500">👍 {comment.likes}</p>
                                    </div>
                                ))}

                                {comments.length === 0 && <p className="text-slate-500">No comments yet.</p>}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default Post;