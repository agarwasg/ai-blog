import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("AIBlogDB");
    const userProfile = await db.collection("users").findOne({ auth0Id: sub });
    const { postId } = req.body;
    await db.collection("posts").deleteOne({
      _id: new ObjectId(postId),
      userId: userProfile._id,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("trying to delete a post", error);
  }
  return;
});