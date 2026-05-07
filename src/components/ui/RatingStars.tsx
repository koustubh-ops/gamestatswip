import { Star } from "lucide-react";

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-warning">
      <Star className="h-3.5 w-3.5 fill-current" />
      <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}
