import { FC } from 'react'
import clsx from 'clsx'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  type?: string
  label: string
  register: UseFormRegister<FieldValues>
  name: string
  error: any
  rules?: any
  className?: string
  labelClassName?: string
}

export const TextInput: FC<InputProps> = (props) => {
  const [inputParent] = useAutoAnimate<HTMLDivElement>()
  const {
    label,
    type,
    register,
    name,
    error,
    className,
    labelClassName,
    rules,
    disabled,
    ...rest
  } = props

  return (
    <div ref={inputParent}>
      <label
        htmlFor={name}
        className={clsx('block text-sm font-medium', labelClassName)}
      >
        {label}
      </label>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <input
          {...register(name, rules)}
          type={type || 'text'}
          name={name}
          id={name}
          className={clsx(
            disabled
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'text-gray-800',
            'block w-full rounded-md border-blue-300 pr-10 placeholder-zinc-300 sm:text-sm ',
            className
          )}
          {...rest}
        />
        {error && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        )}
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-400' id='email-error'>
          {error.message}
        </p>
      )}
    </div>
  )
}
