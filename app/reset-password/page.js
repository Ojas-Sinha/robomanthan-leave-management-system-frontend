import { Suspense } from "react";
import ResetClient from "./ResetClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetClient />
    </Suspense>
  );
}
