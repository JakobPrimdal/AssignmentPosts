import type { Post } from "@/api/posts";

export function PostCard({ post }: { post: Post }) {
  const author = post.author;
  const name = author ? author.firstName + " " + author.lastName : "Unknown user";
  const username = author ? author.username : "unknown";

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 sm:p-6">
      <header className="flex items-center gap-3">
        <img
          src={author?.image}
          alt=""
          className="size-11 shrink-0 rounded-full bg-slate-800 ring-1 ring-slate-700"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-100">{name}</p>
          <p className="truncate text-sm text-slate-500">@{username}</p>
        </div>
      </header>

      <h2 className="mt-4 text-lg leading-snug font-semibold text-slate-50">{post.title}</h2>
      <p className="mt-2 leading-relaxed text-slate-300">{post.body}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <li key={tag} className="rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-400">
            #{tag}
          </li>
        ))}
      </ul>

      <footer className="mt-5 flex items-center gap-6 border-t border-slate-800 pt-4 text-sm text-slate-400">
        <span>👍 {post.reactions.likes}</span>
        <span>👎 {post.reactions.dislikes}</span>
        <span>{post.views} views</span>
      </footer>
    </article>
  );
}
