'use client';

import { Checkbox } from '@/components/ui/checkbox';

interface ResourceCheckboxProps {
  resource: { id: number; nombre_recurso: string };
  isChecked: boolean;
  onToggle: (resourceId: number) => void;
}

export function ResourceCheckbox({ resource, isChecked, onToggle }: ResourceCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={isChecked} onCheckedChange={() => onToggle(resource.id)} id={`resource-${resource.id}`} />
      <label
        htmlFor={`resource-${resource.id}`}
        className="my-2 text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {resource.nombre_recurso}
      </label>
    </div>
  );
}
