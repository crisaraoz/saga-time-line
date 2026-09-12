import { FranchisePageSkeleton } from "@/components/franchise/FranchisePageSkeleton";
import { AppHeader } from "@/components/layout/AppHeader";

export default function TitleLoading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <FranchisePageSkeleton cards={3} />
    </div>
  );
}
