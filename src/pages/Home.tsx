import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import {useMemo, useState} from "react";
import {useDebouncedValue} from "@/hooks/useDebouncedValue.ts";
import {SearchBar} from "@/components/SearchBar.tsx";

export function Home() {
  const { posts, loading, error, hasMore, loadMore, retry } = usePosts();

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredPosts = useMemo(() => {
      const query = debouncedSearch.trim().toLowerCase();
      if (!query)
          return posts
      return posts.filter(
          post => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
      );
  }, [posts, debouncedSearch])

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
        <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-4 px-4 py-4">
                <h1 className="text-lg font-bold tracking-tight text-amber-200">Feed</h1>
                <SearchBar value={search} onChange={setSearch} />
            </div>
        </header>

      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {loading && <p className="py-6 text-center text-slate-500">Loading posts…</p>}

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

        {!loading && !error && hasMore && (
          <button
            type="button"
            onClick={loadMore}
            className="mx-auto rounded-full border border-slate-700 bg-slate-900 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Load more posts
          </button>
        )}
      </main>
    </div>
  );
}

export default Home;
