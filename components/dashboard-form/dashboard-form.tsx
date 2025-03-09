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
import CreateDashboardFormData from './create/create-form'
import TrackerFormData from './update/update-form'
import { useDashboardForm } from './use-update-form'

export default function DashboardForm({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetCoffeeId(userId)

  if (isLoading) return <Loader />
  if (isError) throw new Error(`Error inesperado: ${isError}`)

  return !data?.data ? (
    <CreateDashboardFormData />
  ) : (
    <TrackerFormData defaultData={data?.data} />
  )
}
