import { FranchisePageSkeleton } from "@/components/franchise/FranchisePageSkeleton";
import { AppHeader } from "@/components/layout/AppHeader";

export default function FranchiseLoading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <FranchisePageSkeleton />
    </div>
  );
}
