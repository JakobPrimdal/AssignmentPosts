import { useEffect, useState } from "react";
import { getComments, getPost, type Comment, type Post } from "@/api/posts";

export function usePost(postId: number) {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([getPost(postId), getComments(postId)])
            .then(([postData, commentsData]) => {
                setPost(postData);
                setComments(commentsData);
            })
            .catch(() => setError("Something went wrong while loading this post."))
            .finally(() => setLoading(false));
    }, [postId, attempt]);

    return {
        post,
        comments,
        loading,
        error,
        // Changing attempt makes the effect above run again.
        retry: () => setAttempt(a => a + 1),
    };
}