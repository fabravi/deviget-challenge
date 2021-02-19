import { Post, PostsStatus } from "../types/types";

// Checks if all posts were dismissed.
export const allPostsDismissed = (posts: Post[], status: PostsStatus) => {
  const numberOfDismissed = posts.reduce(
    (accum, post) => (status[post.id]?.dismiss ? accum + 1 : accum),
    0
  );
  return numberOfDismissed === posts.length;
};
