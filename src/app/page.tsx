"use client";

import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const redirect = useRouter().push;

  useEffect(() => redirect(paths.dashboard), []);
}
