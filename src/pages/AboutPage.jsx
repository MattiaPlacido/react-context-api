import { usePosts } from "../contexts/PostsContext";

export default function AboutPage() {
  const { posts } = usePosts();
  return (
    <main className="container py-5 text-center">
      <h2>About</h2>
    </main>
  );
}
