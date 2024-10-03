import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "hooks/use-toast"
import { Heir } from "@/types"

const heirSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_initial: z.string().max(1).optional(),
  suffix: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  street_address_1: z.string().min(1, "Street address is required"),
  street_address_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be a 2-letter code"),
  zip_code: z.string().length(5, "ZIP code must be 5 digits"),
  target_percentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
  relation: z.string().optional(),
})

type HeirFormData = z.infer<typeof heirSchema>

interface AddHeirModalProps {
  onAddHeir: (heir: Heir) => void;
}

export function AddHeirModal({ onAddHeir }: AddHeirModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<HeirFormData>({
    resolver: zodResolver(heirSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_initial: "",
      suffix: "",
      email: "",
      phone: "",
      street_address_1: "",
      street_address_2: "",
      city: "",
      state: "",
      zip_code: "",
      target_percentage: 0,
      relation: "",
    },
  })

  const onSubmit = async (data: HeirFormData) => {
    try {
      const response = await fetch('/api/heirs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const newHeir = await response.json()
        onAddHeir(newHeir)
        setIsOpen(false)
        form.reset()
        toast({
          title: "Success",
          description: "New heir added successfully",
        })
      } else {
        throw new Error('Failed to add new heir')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new heir",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Heir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Heir</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add other form fields here */}
            <Button type="submit">Add Heir</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}