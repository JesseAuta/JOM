import { Suspense } from "react";
import ServicesPage from "./services";

export default function Services() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesPage />
    </Suspense>
  );
}   