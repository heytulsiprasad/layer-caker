import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image},
  writingSeason,
  writingMonth
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image},
  writingSeason,
  writingMonth,
  body
}`);
