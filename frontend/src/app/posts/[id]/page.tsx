import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS } from "@/lib/mockPosts";
import { notFound } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const post = MOCK_POSTS.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <PostCard {...post} />
      </div>
    </div>
  );
}

