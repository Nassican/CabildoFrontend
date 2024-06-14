'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  //toast,
  useToast,
} from '@/components/ui/use-toast';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { ResourceCheckbox } from '../ResourceItems/ResourceCheckbox';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe por lo menos tener 3 caracteres',
  }),
  recursosIds: z.array(z.number()),
});

interface CreateRoleSheetProps {
  onRoleCreated: () => void;
}

export function CreateRoleSheet({ onRoleCreated }: CreateRoleSheetProps) {
  const axiosAuth = useAxiosAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const [resources, setResources] = useState<{ id: number; nombre_recurso: string }[]>([]);
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

    if (isSheetOpen) {
      fetchResources();
    }
  }, [axiosAuth, isSheetOpen, selectedResources]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      recursosIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      values.recursosIds = selectedResources;
      console.log(values);
      const res = await axiosAuth.post('/roles', values);
      const message = `El rol "${res.data.name}" ha sido creado exitosamente`;
      console.log(res.data);
      toast({
        title: 'Rol creado',
        description: message,
      });
      setIsSheetOpen(false); // Cerrar el Sheet cuando la petición sea exitosa
      onRoleCreated(); // Llamar la función para recargar los roles
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          message: ReactNode;
          error: string;
        }>;
        if (axiosError.response) {
          toast({
            title: 'Error',
            description: axiosError.response.data.message,
          });
          return;
        }
      }
      toast({
        title: 'Error',
        description: 'Error al crear el rol. Por favor, intenta de nuevo.',
      });
    }
  };

  const handleToggleResource = (resourceId: number) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    );
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Plus size={15} className="mr-2" />
          <Label>Crear rol</Label>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">Crear nuevo rol</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Nuevo rol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recursosIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recursos</FormLabel>
                  <FormControl>
                    {/* Checkboxes para los recursos */}
                    <div>
                      {resources.map((resource) => (
                        <ResourceCheckbox
                          key={resource.id}
                          resource={resource}
                          isChecked={selectedResources.includes(resource.id)}
                          onToggle={handleToggleResource}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">
                <Plus size={15} className="mr-2" />
                Crear
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
