import React from "react";
import { NodeItem } from "@/types/Node";
import PdfDetail from "./PdfDetail";
import WebDetail from "./WebDetail";
import InstagramDetail from "./InstagramDetail";
import ThreadsDetail from "./ThreadsDetail";
import YoutubeDetail from "./YoutubeDetail";


export default function NodeDetail({ node }: { node: NodeItem }) {
  switch (node.displayDataType) {
    case "pdf":
      return <PdfDetail node={node} />;

    case "web":
      return <WebDetail node={node} />;

    case "instagram":
      return <InstagramDetail node={node} />;

    case "threads":
      // ...
      return <ThreadsDetail node={node} />;

    case "youtube":
      // ...
      return <YoutubeDetail node={node} />;

    default:
      return null;
  }
}
