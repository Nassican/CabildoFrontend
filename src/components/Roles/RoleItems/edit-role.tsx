'use client';

import axios, { AxiosError } from 'axios';
import { Edit } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

import { ResourceCheckbox } from '../ResourceItems/ResourceCheckbox';

interface EditRoleSheetProps {
  role: { id: number; name: string; recursos: { id: number; name: string }[] };
  onUpdate: () => void;
}

export function EditRoleSheet({ role, onUpdate }: EditRoleSheetProps) {
  const [roleName, setRoleName] = useState(role.name);
  const [resources, setResources] = useState<{ id: number; nombre_recurso: string }[]>([]);
  const [selectedResources, setSelectedResources] = useState<number[]>(role.recursos.map((r) => r.id));
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const axiosAuth = useAxiosAuth();

  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axiosAuth.get('/resources');
        setResources(response.data);

        // Asegura que 'profile' esté seleccionado
        const profileId = response.data.find((r: { nombre_recurso: string }) => r.nombre_recurso === 'profile')?.id;
        if (profileId && !selectedResources.includes(profileId)) {
          setSelectedResources((prev) => [...prev, profileId]);
        }
      } catch (error) {
        console.error('Error al obtener los recursos:', error);
      }
    };

    if (isOpen) {
      fetchResources();
    }
  }, [axiosAuth, isOpen, selectedResources]);

  const handleToggleResource = (resourceId: number) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    );
  };

  const handleUpdateRole = async () => {
    setIsSaving(true);
    try {
      await axiosAuth.post('/roles/assignres', { rolId: role.id, name: roleName, recursosIds: selectedResources });

      toast({ title: 'Éxito', description: 'Rol actualizado correctamente' });
      onUpdate(); // Llama a la función para actualizar la tabla
      setIsOpen(false); // Cierra el modal después de una actualización exitosa
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: ReactNode; error: string }>;
        if (axiosError.response) {
          toast({ title: 'Error', description: axiosError.response.data.message });
          return;
        }
      }
      toast({ title: 'Error', description: 'Error al actualizar el rol. Por favor, intenta de nuevo.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Edit size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar rol</SheetTitle>
          <SheetDescription>Actualiza el nombre y los recursos del rol</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="grid items-center gap-2">
            <Label htmlFor="name" className="text-left">
              Nombre
            </Label>
            <Input id="name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
          </div>
          <div>
            <Label className="my-2">Recursos</Label>
            {resources.map((resource) => (
              <ResourceCheckbox
                key={resource.id}
                resource={resource}
                isChecked={selectedResources.includes(resource.id)}
                onToggle={handleToggleResource}
              />
            ))}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleUpdateRole} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
