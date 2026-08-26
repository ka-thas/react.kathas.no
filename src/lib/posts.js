import { client } from "./sanityClient";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current,
  title,
  "date": publishedAt,
  "description": excerpt
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "date": publishedAt,
  "description": excerpt,
  body,
  mainImage
}`;

export async function getAllPosts() {
  return client.fetch(POSTS_QUERY);
}

export async function getPostBySlug(slug) {
  return client.fetch(POST_QUERY, { slug });
}

export function isNew(date) {
  if (!date) return false;
  return Date.now() - new Date(date).getTime() < 30 * 24 * 60 * 60 * 1000;
}

export function formatDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
    : "";
}
