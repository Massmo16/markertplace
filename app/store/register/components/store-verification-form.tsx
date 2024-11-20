'use client'

import { Input } from '@/components/ui/input'
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
import { ImageUpload } from '@/components/image-upload'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  identityDocument: z.array(z.string()).min(1, 'Please upload an identity document'),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions'
  })
})

interface StoreVerificationFormProps {
  data: any
  updateData: (data: any) => void
}

export function StoreVerificationForm({ data, updateData }: StoreVerificationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email || '',
      phone: data.phone || '',
      identityDocument: data.identityDocument || [],
      termsAccepted: data.termsAccepted || false,
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription>
                This email will be used for important store communications
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input placeholder="+27 XX XXX XXXX" {...field} />
              </FormControl>
              <FormDescription>
                A phone number where we can reach you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identityDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identity Verification</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(urls) => field.onChange(urls)}
                  onRemove={(url) => field.onChange(field.value.filter((val) => val !== url))}
                />
              </FormControl>
              <FormDescription>
                Upload a valid ID document or business registration
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the terms and conditions
                </FormLabel>
                <FormDescription>
                  By accepting, you agree to our terms of service and privacy policy
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
} 