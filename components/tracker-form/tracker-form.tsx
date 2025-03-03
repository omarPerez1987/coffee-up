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
import { Loader } from '@/lib/loader'
import { useRouter } from 'next/navigation'
import { useTrackerForm } from './use-tracker-form'

function TrackerFormData({ defaultData }: { defaultData?: CoffeeTracker }) {
  const { form, onSubmit, isLoading, error } = useTrackerForm({ defaultData })

  return (
    <>
      <h1>Tracking</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled />
                </FormControl>
                <FormMessage>{error}</FormMessage>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cups"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tazas</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
    </>
  )
}

export default function TrackerForm({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetCoffeeId(userId)

  if (isLoading) return <Loader />
  if (isError) throw new Error(`Error inesperado: ${isError}`)

  return <TrackerFormData defaultData={data?.data} />
}
