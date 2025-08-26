'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema } from '@/app/lib/schema'
import { useRouter } from 'next/navigation'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/shared/shadcn/card'
import {
  Select, SelectValue, SelectContent, SelectItem,
  SelectTrigger, SelectGroup, SelectLabel
} from '@/components/ui/shared/shadcn/select'
import { Label } from '@/components/ui/shared/shadcn/label'
import { Input } from '@/components/ui/shared/shadcn/input'
import { Textarea } from '@/components/ui/shared/shadcn/textarea'
import { Button } from '@/components/ui/shared/shadcn/button'
import useFetch from '@/hooks/use-fetch'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const OnBoardingForm = ({ industries, defaultValues }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const router = useRouter()
  const { loading: updateLoading, fn: updateFunction, data: updateResult } = useFetch(updateUser)

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues
  })

  const watchIndustry = watch('industry')

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry} - ${values.subIndustry.toLowerCase().replace(/ /g, '-')}`
      await updateFunction({ ...values, industry: formattedIndustry })
    } catch (error) {
      console.log('Onboarding Error:', error)
    }
  }

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
      const selected = industries.find(ind => ind.id === defaultValues.industry)
      setSelectedIndustry(selected || null)
    }
  }, [defaultValues, industries, reset])

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success('Profile Completed Successfully')
      router.push('/dashboard')
      router.refresh()
    }
  }, [updateResult, updateLoading])

  return (
    <div className='flex items-center justify-center'>
      <Card className='w-full max-w-lg mt-10 mx-2'>
        <CardHeader>
          <CardTitle className='gradient-title text-4xl'>Complete Your Profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {/* Industry */}
            <div className='space-y-2'>
              <Label htmlFor='industry'>Industry</Label>
              <Select onValueChange={(value) => {
                setValue('industry', value)
                setSelectedIndustry(industries.find(ind => ind.id === value))
                setValue('subIndustry', '')
              }} value={watchIndustry}>
                <SelectTrigger id='industry'>
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem value={ind.id} key={ind.id}>{ind.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && <p className='text-sm text-red-500'>{errors.industry.message}</p>}
            </div>

            {/* SubIndustry */}
            {watchIndustry && selectedIndustry && (
              <div className='space-y-2'>
                <Label htmlFor='subIndustry'>Specialization</Label>
                <Select
                  onValueChange={(value) => setValue('subIndustry', value)}
                  value={watch('subIndustry')}
                >
                  <SelectTrigger id='subIndustry'>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && <p className='text-sm text-red-500'>{errors.subIndustry.message}</p>}
              </div>
            )}

            {/* Experience */}
            <div className='space-y-2'>
              <Label htmlFor='experience'>Years of Experience</Label>
              <Input
                id='experience'
                type='number'
                min='0'
                max='50'
                placeholder='Enter years of Experience'
                {...register('experience')}
              />
              {errors.experience && <p className='text-sm text-red-500'>{errors.experience.message}</p>}
            </div>

            {/* Skills */}
            <div className='space-y-2'>
              <Label htmlFor='skills'>Skills</Label>
              <Input id='skills' placeholder='e.g., Python, JavaScript, Project Management' {...register('skills')} />
              <p className='text-sm text-muted-foreground'>Separate multiple skills with commas</p>
              {errors.skills && <p className='text-sm text-red-500'>{errors.skills.message}</p>}
            </div>

            {/* Bio */}
            <div className='space-y-2'>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea id='bio' placeholder='Tell us about your professional background' className='h-32' {...register('bio')} />
              {errors.bio && <p className='text-sm text-red-500'>{errors.bio.message}</p>}
            </div>

            <Button type='submit' className='w-full' disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnBoardingForm
