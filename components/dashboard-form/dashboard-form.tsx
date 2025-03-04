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
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useGetCoffeeId } from '@/lib/hooks/use-get-coffee-id'
import { Loader } from '@/lib/loader'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useDashboardForm } from './use-dashboard-form'

function DashboardFormData({ defaultData }: { defaultData?: CoffeeTracker }) {
  const { form, onSubmit, isLoading, error } = useDashboardForm({ defaultData })

  const [initialValues, setInitialValues] = useState({
    add: defaultData?.balance ?? undefined,
    cup_price: defaultData?.cup_price ?? 0,
  })

  const [values, setValues] = useState(initialValues)
  const debouncedValues = useDebounce(values, 500)

  useEffect(() => {
    if (initialValues !== debouncedValues) {
      onSubmit(debouncedValues)
      setInitialValues(debouncedValues)
    }
  }, [debouncedValues, onSubmit, initialValues])

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Button className="rounded-full text-5xl h-32 w-32 bg-primary cursor-default">
        {defaultData?.balance ?? 0}
      </Button>

      <Form {...form}>
        <div className="flex flex-col items-center gap-4 pt-11">
          <FormField
            control={form.control}
            name="add"
            render={() => (
              <FormItem className="flex flex-col items-center justify-center gap-4">
                <FormLabel>Añadir dinero</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="off"
                    className="rounded-full text-3xl h-24 w-24 text-center"
                    onChange={e =>
                      setValues({
                        ...values,
                        add: Number(e.target.value) || undefined,
                      })
                    }
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cup_price"
            render={() => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel>Precio taza</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="off"
                    className="rounded-full text-3xl h-24 w-24 text-center"
                    value={values.cup_price}
                    onChange={e =>
                      setValues({
                        ...values,
                        cup_price: Number(e.target.value) || 0,
                      })
                    }
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </section>
  )
}

export default function DashboardForm({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetCoffeeId(userId)

  if (isLoading) return <Loader />
  if (isError) throw new Error(`Error inesperado: ${isError}`)

  return <DashboardFormData defaultData={data?.data} />
}
