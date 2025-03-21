import { redirect } from "next/navigation";
import { SellerDashboard } from "@/components";
import { auth } from "@clerk/nextjs/server";

export default async function SellerPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerDashboard />
    </div>
  );
}
