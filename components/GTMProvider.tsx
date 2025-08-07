"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

/**
 * GTMProvider listens for route changes in the Next.js App Router and
 * pushes a pageview event to the GTM dataLayer on every navigation.
 * This is required because the default GTM snippet only fires on the
 * initial page load, so SPA navigations are otherwise not tracked.
 */
export default function GTMProvider({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).dataLayer) return;

    (window as any).dataLayer.push({
      event: "pageview",
      page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
