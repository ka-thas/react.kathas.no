import "../styles/global.css";
import Footer from "../components/footer.jsx";
import PostCard from "../components/PostCard";
import { posts } from "../lib/posts";

function BlogPage() {
  const recentPosts = posts.slice(0, 3);
  const olderPosts = posts.slice(3);

  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full">
        <h1 className="font-bold text-5xl mt-5 mb-4">Blog ☕️</h1>
        <p className="mb-8 opacity-70 max-w-[520px]">
          Articles I've written about my projects, my studies, and other interests.
        </p>
        {posts.length === 0 ? (
          <p className="opacity-45 pb-12">No posts yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
            <div className="flex flex-col gap-3 pb-12">
              {olderPosts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default BlogPage;
