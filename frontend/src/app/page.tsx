import { Metadata } from "next";
import { BountyList } from "@/components/BountyList";

export const metadata: Metadata = {
  title: "ChileDAO Bounties",
  description: "Find and apply for bounties in the ChileDAO ecosystem",
};

export const dynamic = "force-dynamic";

export default function Home() {
  return <BountyList />;
}
