import "../styles/global.css";
import Footer from "../components/Footer.jsx";
import PostCard from "../components/PostCard";
import SearchBox from "../components/SearchBox.jsx";
import InlineCode from "../components/InlineCode.jsx";
import { posts } from "../lib/posts";

function BlogPage() {
  return (
    <>
      <main className="max-w-[780px] mx-auto px-4 w-full gap-4">
        <h1 className="font-bold text-5xl mt-5 mb-4">Root ☕️</h1>
        <p>
          Welcome to my blog! It’s a space of ideas, thoughts, projects and
          other writings I’d want to share with the world. This site might mean
          more to me than it does to you, but I do hope you will find something
          that interests you or sparks inspiration.
        </p>
        <p>
          Browse with the search <InlineCode>⌘k</InlineCode>, or click your way through the
          growing heap of notes.
        </p>
        <p>
          I find it kind of funny that notes and nodes sound similar, but that
          might just be me.
        </p>
        <div className="my-10">
          <SearchBox />
        </div>
        {posts.length === 0 ? (
          <p className="opacity-45 pb-12">No posts yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {posts.map((post) => (
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
