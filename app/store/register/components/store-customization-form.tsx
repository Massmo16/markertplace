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
  logo: z.array(z.string()).optional(),
  bannerImage: z.array(z.string()).optional(),
  primaryColor: z.string(),
  accentColor: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal(''))
  }).optional()
})

interface StoreCustomizationFormProps {
  data: any
  updateData: (data: any) => void
}

export function StoreCustomizationForm({ data, updateData }: StoreCustomizationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: data.logo || [],
      bannerImage: data.bannerImage || [],
      primaryColor: data.primaryColor || '#000000',
      accentColor: data.accentColor || '#ffffff',
      socialLinks: {
        facebook: data.socialLinks?.facebook || '',
        instagram: data.socialLinks?.instagram || '',
        twitter: data.socialLinks?.twitter || ''
      }
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Logo</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || []}
                  onChange={(urls) => field.onChange(urls)}
                  onRemove={(url) => field.onChange(field.value?.filter((val) => val !== url))}
                />
              </FormControl>
              <FormDescription>
                Upload your store logo (recommended size: 200x200px)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || []}
                  onChange={(urls) => field.onChange(urls)}
                  onRemove={(url) => field.onChange(field.value?.filter((val) => val !== url))}
                />
              </FormControl>
              <FormDescription>
                Upload a banner image for your store (recommended size: 1200x300px)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Input type="color" {...field} className="w-20 h-10" />
                    <Input 
                      type="text" 
                      value={field.value}
                      onChange={field.onChange}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Choose your store's main color
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accentColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accent Color</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Input type="color" {...field} className="w-20 h-10" />
                    <Input 
                      type="text" 
                      value={field.value}
                      onChange={field.onChange}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Choose a complementary color
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Media Links</h3>
          
          <FormField
            control={form.control}
            name="socialLinks.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/your-store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="https://instagram.com/your-store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialLinks.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/your-store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
} 