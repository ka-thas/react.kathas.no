import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import PostCard from "../components/PostCard";
import SearchBox from "../components/SearchBox.jsx";
import { posts } from "../lib/posts";

function BlogPage() {
  const recentPosts = posts.slice(0, 3);
  const olderPosts = posts.slice(3);

  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full gap-4">
        <h1 className="font-bold text-5xl mt-5 mb-4">Blog ☕️</h1>
        <p className="opacity-70">
          Welcome to my blog! It’s a graph of ideas, thoughts, projects and other
          writings I’d want to share with the world. This site might mean to me
          than it is to you, but I do hope you will find something that
          interests you or sparks inspiration.
        </p>
        <p className="opacity-70">
          This is more of a “hub” node to find other pages. Browse with the
          search{" "}
          <span className="font-mono bg-black/10 px-1.5 py-0.5 rounded text-[0.875em] text-accent-yellow">
            ⌘k
          </span>
          , or follow links through the network of notes.
        </p>
        <p className="opacity-70">
          I find it kind of funny that notes and nodes sound similar, but that
          might just be me.
        </p>
        <SearchBox />
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
