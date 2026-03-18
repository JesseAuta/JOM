import { Suspense } from "react";   
import BookingPage from "./booking";
export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage />
    </Suspense>
  );
}