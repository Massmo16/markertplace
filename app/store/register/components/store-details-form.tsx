'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  storeName: z.string().min(3, 'Store name must be at least 3 characters'),
  storeDescription: z.string().min(10, 'Description must be at least 10 characters'),
  storeUrl: z.string().min(3).regex(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers, and hyphens allowed'),
})

interface StoreDetailsFormProps {
  data: any
  updateData: (data: any) => void
}

export function StoreDetailsForm({ data, updateData }: StoreDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: data.storeName || '',
      storeDescription: data.storeDescription || '',
      storeUrl: data.storeUrl || '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values)
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Store" {...field} />
              </FormControl>
              <FormDescription>
                This is how your store will appear to customers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell customers about your store..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Briefly describe what you sell and your store's mission
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store URL</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">
                    marketplace.com/store/
                  </span>
                  <Input placeholder="my-store" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                Choose a unique URL for your store
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
} 