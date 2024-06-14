'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Resource } from '../Table/columns';
import { ResourceBadge } from './ResourceBadge';

interface ResourcesModalProps {
  roleName: string;
  resources: Resource[];
  children: React.ReactNode;
}

export function ResourcesModal({ roleName, resources, children }: ResourcesModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Recursos del rol {roleName}</DialogTitle>
          <DialogDescription>Lista completa de recursos asociados a este rol.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {resources.map((resource) => (
            <ResourceBadge key={resource.id} name={resource.name} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
