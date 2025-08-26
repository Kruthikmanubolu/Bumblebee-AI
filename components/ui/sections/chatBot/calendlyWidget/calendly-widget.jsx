"use client";
import { InlineWidget } from "react-calendly";

export default function CalendlyWidget({ url, onBooking }) {
  return (
    <div className="w-full h-[600px]">
      <InlineWidget
        url={url}
        styles={{ height: "600px" }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "2563eb", // Tailwind blue
          textColor: "000000",
        }}
        // Fires after booking is scheduled
        onEventScheduled={(e) => {
          console.log("Booking event:", e.data);
          const email = e?.data?.payload?.invitee?.email;
          if (email) onBooking(email);
        }}
      />
    </div>
  );
}
