import { LoadingSpinner } from "@/components";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner variant="pinwheel" />
    </div>
  );
}
