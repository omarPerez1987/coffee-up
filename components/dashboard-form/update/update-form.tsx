'use client'

import { useDebounce } from '@/lib/hooks/use-debounce'
import { formatNumber } from '@/lib/utils'
import { Coffee } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import { useUpdateForm } from './use-update-form'

interface UpdateFormDataProps {
  defaultData: CoffeeTracker
}

interface SetValues {
  add?: number
  cup_price?: number
  cups?: number
}

export default function UpdateFormData({ defaultData }: UpdateFormDataProps) {
  const { form, onSubmit, error } = useUpdateForm({ defaultData })

  const [initialValues, setInitialValues] = useState<SetValues>({
    add: defaultData?.balance ?? undefined,
    cup_price: defaultData?.cup_price ?? 0,
    cups: defaultData?.cups ?? 0,
  })

  const [add, setAdd] = useState<string | undefined>(undefined)
  const [values, setValues] = useState<Partial<SetValues> | SetValues>(
    initialValues
  )
  const debouncedValues = useDebounce(values, 500)

  useEffect(() => {
    if (initialValues !== debouncedValues) {
      onSubmit(debouncedValues)
      setInitialValues(debouncedValues)
      setAdd(undefined)
    }
  }, [debouncedValues, onSubmit, initialValues])

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Form {...form}>
        <div className="flex items-center justify-center gap-4">
          <Button className="flex flex-col rounded-full text-5xl h-28 w-28 sm:h-32 sm:w-32 bg-primary cursor-default">
            <span className="text-xs uppercase">Balance</span>
            {defaultData?.balance ?? 0}
          </Button>

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
                    className="rounded-full text-3xl h-24 w-24 text-center appearance-none no-spinner"
                    placeholder={String(defaultData.cup_price)}
                    min={0}
                    onChange={e =>
                      setValues({
                        cup_price: formatNumber(e.target.value) || undefined,
                      })
                    }
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />

          <Button className="flex flex-col rounded-full text-5xl h-28 w-28 sm:h-32 sm:w-32 bg-primary cursor-default">
            <Coffee />
            {defaultData?.cups ?? 0}
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-11">
          <FormField
            control={form.control}
            name="add"
            render={() => (
              <FormItem className="flex flex-col items-center justify-center gap-4">
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="off"
                    className="rounded-full text-3xl h-24 w-24 text-center"
                    value={add ?? undefined}
                    placeholder="+"
                    min={0}
                    onChange={e => {
                      setValues({
                        add: formatNumber(e.target.value) || undefined,
                      })
                      setAdd(e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />

          <Button
            className="rounded-full text-3xl h-24 w-24 text-center hover:rotate-12"
            onClick={() => setValues({ cups: -1 })}
          >
            <Coffee className="min-w-[1.5rem] min-h-[1.5rem]" />
          </Button>
        </div>
      </Form>
    </section>
  )
}
