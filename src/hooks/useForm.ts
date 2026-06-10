import { useState, ChangeEvent, FormEvent } from 'react'
import { z } from 'zod'

type FormErrors<T> = Partial<Record<keyof T, string>>

interface UseFormReturn<T> {
  values: T
  errors: FormErrors<T>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  isSuccess: boolean
  reset: () => void
}

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  schema: z.ZodSchema<T>,
  onSubmit: (data: T) => Promise<void>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof T]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = schema.safeParse(values)
    if (!result.success) {
      const fieldErrors: FormErrors<T> = {}
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof T
        if (!fieldErrors[field]) fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setIsSubmitting(true)
    setErrors({})
    try {
      await onSubmit(result.data)
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSuccess(false)
  }

  return { values, errors, handleChange, handleSubmit, isSubmitting, isSuccess, reset }
}
