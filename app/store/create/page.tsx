'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const storeFormSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  storeUrl: z.string().min(3, 'Store URL must be at least 3 characters')
    .regex(/^[a-zA-Z0-9-]+$/, 'Store URL can only contain letters, numbers, and hyphens'),
})

export default function CreateStorePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: '',
      description: '',
      storeUrl: '',
    },
  })

  async function onSubmit(values: z.infer<typeof storeFormSchema>) {
    try {
      setIsLoading(true)
      // Here you would typically make an API call to create the store
      // For now, we'll just simulate it and redirect
      console.log(values)
      router.push('/store/create/plan')
    } catch (error) {
      console.error('Error creating store:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Store</h1>
          <p className="mt-2 text-muted-foreground">
            Let's get started with setting up your online store
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell customers what your store is about..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of your store and what you sell
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

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Continue to Choose Plan'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
} 