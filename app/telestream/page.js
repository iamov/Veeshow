"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";

function StreamContent() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  if (!link) return <div>No link provided</div>;

  return (
    <iframe
      src={link}
      width="100%"
      height="100%"
      className="absolute inset-0 w-full h-full border-0"
      allowFullScreen
    />
  );
}

export default function TelestreamPage() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <StreamContent />
    </Suspense>
  );
}

// 🚨 This tells Next.js not to prerender
export const dynamic = "force-dynamic";
