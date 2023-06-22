import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../lib/mongodb";
export const getAppProps = async (ctx) => {
  const userSession = await getSession(ctx.req, ctx.res);
  const client = await clientPromise;
  const db = await client.db("AIBlogDB");
  const userProfile = await db
    .collection("users")
    .findOne({ auth0Id: userSession.user.sub });
  if (!userProfile) {
    return {
      availableTokens: 0,
      posts: [],
    };
  }

  const posts = await db
    .collection("posts")
    .find({
      userId: userProfile._id,
    })
    .limit(5)
    .sort({ created: -1 })
    .toArray();
  return {
    availableTokens: userProfile.availableTokens,
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      created: created.toString(),
      ...rest,
    })),
    postId: ctx.params?.postId || null,
  };
};
