import { useEffect, useState } from "react";
import { getFeed, type Post } from "@/api/posts";

const POSTS_PER_PAGE = 12;

export interface NewPostInput {
  title: string
  body: string
  tags: string[]
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getFeed(POSTS_PER_PAGE, page * POSTS_PER_PAGE)
      .then(data => {
        // The first page replaces the list, the next ones are added to the end.
        setPosts(oldPosts => (page === 0 ? data.posts : [...oldPosts, ...data.posts]));
        setTotal(data.total);
      })
      .catch(() => setError("Something went wrong while loading the posts."))
      .finally(() => setLoading(false));
  }, [page, attempt]);

  return {
    posts,
    loading,
    error,
    hasMore: posts.length < total,
    loadMore: () => setPage(page + 1),
    // Changing attempt makes the effect above run again.
    retry: () => setAttempt(attempt + 1),
    //remove the post
    removePost: (id: number) => {
      setPosts(oldPosts => oldPosts.filter(post => post.id !== id));
      setTotal(oldTotal => oldTotal - 1);
    },
    // Add a locally-created post to the top of the feed
    addPost: (input: NewPostInput)=> {
      const newPost: Post = {
        id: Math.floor(Math.random() * 10000),
        title: input.title,
        body: input.body,
        tags: input.tags,
        reactions: { likes: 0, dislikes: 0},
        views: 0,
        userId: 0,
        author: {
          id: 0,
          firstName: "You",
          lastName: "",
          username: "you",
          image: "https://api.dicebear.com/7.x/initials/svg?seed=You"
        },
      };
      setPosts(oldPosts => [newPost, ...oldPosts])
      setTotal((oldTotal => oldTotal + 1))
    }
  };
}
