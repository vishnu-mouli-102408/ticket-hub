"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { refundEventTickets } from "@/actions/refund-event-ticket";
import { useMutation } from "convex/react";
import { Ban } from "lucide-react";
import { toast } from "sonner";

import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export default function CancelEventButton({
  eventId,
}: {
  eventId: Id<"events">;
}) {
  const [isCancelling, setIsCancelling] = useState(false);

  const router = useRouter();
  const cancelEvent = useMutation(api.events.cancelEvent);

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this event? All tickets will be refunded and the event will be cancelled permanently."
      )
    ) {
      return;
    }

    setIsCancelling(true);
    try {
      await refundEventTickets(eventId);
      await cancelEvent({ eventId });
      //   toast({
      //     title: "Event cancelled",
      //     description: "All tickets have been refunded successfully.",
      //   });
      toast.success("Event cancelled", {
        description: "All tickets have been refunded successfully.",
        duration: 5000,
        closeButton: true,
      });
      router.push("/seller/events");
    } catch (error) {
      console.error("Failed to cancel event:", error);
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: "Failed to cancel event. Please try again.",
      //   });
      toast.error("Uh oh! Something went wrong.", {
        description: "Failed to cancel event. Please try again.",
        duration: 5000,
        closeButton: true,
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isCancelling}
      className="flex items-center cursor-pointer gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Ban className="w-4 h-4" />
      <span>{isCancelling ? "Processing..." : "Cancel Event"}</span>
    </button>
  );
}
