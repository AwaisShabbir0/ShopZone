import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import ChatBotWidget from "../components/ChatBotWidget";
import { useEffect } from "react";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import Layout from "../layout/Layout";
import store from "../redux/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => nProgress.start();
    const handleStop = () => nProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {router.pathname.startsWith("/admin") ? (
          <div className="bg-[#ececec] min-h-screen">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        ) : (
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
            <ChatBotWidget/>
          </Layout>
        )}
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
