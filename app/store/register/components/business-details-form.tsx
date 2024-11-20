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
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  registrationNumber: z.string().optional(),
  taxNumber: z.string().optional(),
  businessAddress: z.string().min(10, 'Please provide a complete address'),
  businessType: z.enum(['individual', 'company', 'partnership']),
  phoneNumber: z.string().min(10, 'Please provide a valid phone number'),
})

interface BusinessDetailsFormProps {
  data: any
  updateData: (data: any) => void
}

export function BusinessDetailsForm({ data, updateData }: BusinessDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: data.businessName || '',
      registrationNumber: data.registrationNumber || '',
      taxNumber: data.taxNumber || '',
      businessAddress: data.businessAddress || '',
      businessType: data.businessType || 'individual',
      phoneNumber: data.phoneNumber || '',
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
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Business Name" {...field} />
              </FormControl>
              <FormDescription>
                The official name of your business
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Business Registration Number" {...field} />
                </FormControl>
                <FormDescription>
                  Your company registration number if applicable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VAT/Tax Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="VAT/Tax Number" {...field} />
                </FormControl>
                <FormDescription>
                  Your VAT or tax registration number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="company">Registered Company</option>
                  <option value="partnership">Partnership</option>
                </select>
              </FormControl>
              <FormDescription>
                Select your business structure
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+27 XX XXX XXXX" {...field} />
              </FormControl>
              <FormDescription>
                A contact number for your business
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your complete business address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your primary business location
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
} 