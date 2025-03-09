'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../../ui/button'
import { useCreateForm } from './use-create-form'

export default function CreateDashboardFormData() {
  const { form, onSubmit, isLoading, error } = useCreateForm()

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="add"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>Añadir dinero</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      className="rounded-full text-3xl h-24 w-24 text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cup_price"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>Precio taza</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      className="rounded-full text-3xl h-24 w-24 text-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full">Crear</Button>
        </form>
      </Form>
    </section>
  )
}
