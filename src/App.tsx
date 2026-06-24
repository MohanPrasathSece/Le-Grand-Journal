import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./routes/index";
import EnquiryPage from "./routes/enquiry";
import PrivacyPage from "./routes/privacy";
import TermsPage from "./routes/terms";

// Monkey-patch history navigation to allow state-based routing triggers
if (typeof window !== "undefined") {
  const patchHistoryMethod = (type: "pushState" | "replaceState") => {
    const orig = window.history[type];
    return function (this: History, ...args: any[]) {
      const rv = orig.apply(this, args);
      const ev = new Event(type.toLowerCase());
      window.dispatchEvent(ev);
      return rv;
    };
  };
  window.history.pushState = patchHistoryMethod("pushState");
  window.history.replaceState = patchHistoryMethod("replaceState");
}

const queryClient = new QueryClient();

export default function App() {
  const [path, setPath] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0); // Scroll to top on client-side route changes
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
    };
  }, []);

  const renderPage = () => {
    if (path === "/enquiry") {
      return <EnquiryPage />;
    }
    if (path === "/privacy") {
      return <PrivacyPage />;
    }
    if (path === "/terms") {
      return <TermsPage />;
    }
    return <IndexPage />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      {renderPage()}
    </QueryClientProvider>
  );
}
