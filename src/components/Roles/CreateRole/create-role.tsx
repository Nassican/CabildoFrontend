'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  //SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  //toast,
  useToast,
} from '@/components/ui/use-toast';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe por lo menos tener 3 caracteres',
  }),
});

interface CreateRoleSheetProps {
  onRoleCreated: () => void;
}

export function CreateRoleSheet({ onRoleCreated }: CreateRoleSheetProps) {
  const axiosAuth = useAxiosAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axiosAuth.post('/roles', values);
      const message = `El rol "${res.data.name}" ha sido creado exitosamente`;
      //console.log(res.data);
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
          <SheetTitle>Crear nuevo rol</SheetTitle>
          <SheetDescription>Escribe el nombre del nuevo rol que deseas crear</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <div className="grid gap-4 py-4">
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input id="name" className="col-span-3" {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                </>
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
