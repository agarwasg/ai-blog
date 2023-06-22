import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParagraph } from "@fortawesome/free-solid-svg-icons";

export default function NewPost(props) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          topic,
          keywords,
        }),
      });
      const json = await response.json();
      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (error) {
      setGenerating(false);
    }
  };
  return (
    <div className="h-full overflow-hidden">
      {generating && (
        <div className="text-green-500 flex h-full animate-pulse w-full justify-center items-center flex-col">
          <FontAwesomeIcon
            icon={faParagraph}
            className="text-8xl"
          ></FontAwesomeIcon>
          <h6> Generating...</h6>
        </div>
      )}
      {!generating && (
        <div className="w-full h-full flex flex-col overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200"
          >
            <div>
              <label>
                <strong> Generate a blog post on topic of:</strong>
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="resize-none border-slate-800 w-full display-block my-2 px-4 py-2 rounded-sm"
                maxLength={180}
              ></textarea>
            </div>
            <div>
              <label>
                <strong> Targeting the following keywords:</strong>
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="resize-none border-slate-500 w-full display-block my-2 px-4 py-2 rounded-sm"
                maxLength={80}
              ></textarea>
              <small className="block mb-4">
                Separate Keywords with a comma
              </small>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={!topic.trim() || !keywords.trim()}
            >
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
