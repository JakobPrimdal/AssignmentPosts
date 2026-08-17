const API_URL = "https://dummyjson.com";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
  // Not sent by the API, getFeed() adds it.
  author?: User;
};
export type Comment = {
  id: number;
  body: string;
  likes: number;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

// The user list is always the same, so we only download it once.
let cachedUsers: User[] | null = null;

async function getUsers(): Promise<User[]> {
  if (cachedUsers) return cachedUsers;

  const response = await fetch(`${API_URL}/users?limit=0&select=firstName,lastName,username,image`);
  const data = await response.json();

  cachedUsers = data.users;
  return data.users;
}

// Gets one page of posts and adds the author to each of them
export async function getFeed(limit: number, skip: number): Promise<{ posts: Post[]; total: number }> {
  const response = await fetch(`${API_URL}/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Could not load posts");

  const data = await response.json();
  const users = await getUsers();

  // A post only tells us the userId, so we look the user up ourselves.
  const posts: Post[] = data.posts.map((post: Post) => ({
    ...post,
    author: users.find(user => user.id === post.userId),
  }));

  return { posts, total: data.total };
}
//single post
export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Could not load post");

  const post = await response.json();
  const users = await getUsers();

  return { ...post, author: users.find(user => user.id === post.userId) };
}
//all comments of a given post
export async function getComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error("Could not load comments");

  const data = await response.json();
  return data.comments;
}

export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Could not delete post");
}
