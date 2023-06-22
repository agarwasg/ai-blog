import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { Kalam, DM_Sans } from "@next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PostProvider } from "../context/postsContext";
config.autoAddCss = false;

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const kalam = Kalam({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <PostProvider>
        <main className={`${dmSans.variable} ${kalam.variable}`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </PostProvider>
    </UserProvider>
  );
}

export default MyApp;
