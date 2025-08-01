"use client"

export interface Pattern {
  id: string
  title: string
  description: string
  category: "layout" | "navigation" | "forms" | "data-display" | "feedback" | "overlay"
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  dependencies: string[]
  code: string
  preview?: string
  complexity: "simple" | "moderate" | "complex"
  useCase: string
}

export const patterns: Pattern[] = [
  {
    id: "responsive-grid",
    title: "Responsive Grid Layout",
    description: "A flexible grid system that adapts to different screen sizes using CSS Grid and Tailwind CSS.",
    category: "layout",
    difficulty: "beginner",
    complexity: "simple",
    tags: ["grid", "responsive", "layout", "css-grid"],
    dependencies: ["tailwindcss"],
    useCase:
      "Perfect for product listings, image galleries, or any content that needs to be displayed in a grid format.",
    code: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
    </div>
  ))}
</div>`,
    preview: "A responsive grid that shows 1 column on mobile, 2 on tablet, 3 on desktop, and 4 on large screens.",
  },
  {
    id: "modal-dialog",
    title: "Modal Dialog Component",
    description: "A reusable modal dialog with backdrop, close functionality, and accessibility features.",
    category: "overlay",
    difficulty: "intermediate",
    complexity: "moderate",
    tags: ["modal", "dialog", "overlay", "accessibility"],
    dependencies: ["@radix-ui/react-dialog", "tailwindcss"],
    useCase: "Use for confirmations, forms, image previews, or any content that needs to overlay the main interface.",
    code: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function ModalExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" className="col-span-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
    preview: "A modal dialog with proper focus management and keyboard navigation support.",
  },
  {
    id: "data-table",
    title: "Advanced Data Table",
    description: "A feature-rich data table with sorting, filtering, pagination, and row selection.",
    category: "data-display",
    difficulty: "advanced",
    complexity: "complex",
    tags: ["table", "data", "sorting", "filtering", "pagination"],
    dependencies: ["@tanstack/react-table", "tailwindcss"],
    useCase: "Perfect for admin dashboards, user management, or any interface that needs to display tabular data.",
    code: `import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"

export function DataTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}`,
    preview: "A fully-featured data table with sorting, filtering, and pagination capabilities.",
  },
  {
    id: "form-validation",
    title: "Form with Validation",
    description: "A comprehensive form component with real-time validation, error handling, and submission states.",
    category: "forms",
    difficulty: "intermediate",
    complexity: "moderate",
    tags: ["form", "validation", "react-hook-form", "zod"],
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    useCase: "Essential for user registration, contact forms, settings pages, or any data input interface.",
    code: `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function ValidationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" }
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}`,
    preview: "A form with comprehensive validation, error messages, and loading states.",
  },
]
