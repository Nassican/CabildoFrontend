'use client';

import { Badge } from '@/components/ui/badge';

interface ResourceBadgeProps {
  name: string;
}

export function ResourceBadge({ name }: ResourceBadgeProps) {
  return (
    <Badge variant="secondary" className="flex flex-wrap items-center gap-2 capitalize">
      {name}
    </Badge>
  );
}
