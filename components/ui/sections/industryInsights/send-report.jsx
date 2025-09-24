import React from "react";
import { Input } from "../../shared/shadcn/input";
import { Button } from "../../shared/shadcn/button";
import { toast } from "sonner";
import { useState } from "react";
import { SendReportAction } from "@/actions/send-report";
import { useRouter } from "next/navigation";
const SendReport = ({ insights }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendReport = async () => {
    if (!email) return toast.error("Please enter an email");
    setSending(true);
    try {
      const result = await SendReportAction(email, insights);
      if (result?.status === "sent") {
        toast.success("Report sent successfully!");
      } else {
        toast.error(result?.error || "Failed to send report");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="flex gap-2 items-end">
      <Input
        placeholder="Enter email to send report"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="max-w-sm border border-black"
      />
      <Button
        className="cursor-pointer"
        onClick={handleSendReport}
        disabled={sending}
      >
        {sending ? "Sending..." : "Send Report"}
      </Button>
      <div className="ml-auto">
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/onboarding")}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default SendReport;
