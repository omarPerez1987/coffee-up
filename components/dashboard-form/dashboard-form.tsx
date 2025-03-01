'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useGetCoffeeId } from '@/lib/hooks/use-get-coffee-id'
import { useDashboardForm } from './use-dashboard-form'

export default function DashboardForm({ userId }: { userId: string }) {
  const { data: defaultData } = useGetCoffeeId(userId)
  const { form, onSubmit, isLoading, error } = useDashboardForm({ defaultData })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insertar dinero</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insertar dinero..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{error}</FormMessage>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cupPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio taza</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insertar dinero..."
                  {...field}
                />
              </FormControl>
              <FormMessage>{error}</FormMessage>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
