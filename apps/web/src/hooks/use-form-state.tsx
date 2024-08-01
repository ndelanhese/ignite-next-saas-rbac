import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

type useFormStateProps = {
  action: (data: FormData) => Promise<FormState>
  onSuccess?: () => Promise<void> | void
  initialState?: FormState
}

export const useFormState = ({
  action,
  initialState,
  onSuccess,
}: useFormStateProps) => {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? { success: false, message: null, errors: null },
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })

    requestFormReset(form)
  }

  return [formState, handleSubmit, isPending] as const
}
