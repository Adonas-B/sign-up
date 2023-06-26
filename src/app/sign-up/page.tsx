'use client'

import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Container,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  useToast,
  CircularProgress,
  Center,
} from '@chakra-ui/react'
import { zodResolver } from "@hookform/resolvers/zod";

import { CommunicationOptionsSchema, PersonalisationOptionsSchema, SignUpFormValues, signUpFormSchema } from './sign-up.types'
import { CustomRadioGroup } from '../components/RadioGroup'
import { CustomCheckboxGroup } from '../components/CheckboxGroup'

export default function Page() {
  const [userPreferences, setUserPreferences] = useState<SignUpFormValues | null>()
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToast()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  })

  useEffect(() => {
    const userPrefs = window.localStorage.getItem('userPrefs')
    if (userPrefs !== null) {
      setUserPreferences(JSON.parse(userPrefs))
      reset()
    }
    setIsLoaded(true)
  }, [reset])

  console.log('userPreferences', userPreferences?.personalisation)


  useEffect(() => {
    if (userPreferences) {
      reset(userPreferences);
    }
  }, [reset, userPreferences]);

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    window.localStorage.setItem('userPrefs', JSON.stringify(data))
    setUserPreferences(data)
    toast({
      title: 'Preferences Saved.',
      description: `Thanks ${data.name}. Your prefences have been saved`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const options = signUpFormSchema.shape.dietary_requirements.options
  const checkboxOptions = PersonalisationOptionsSchema.options
  const communicationOptions = CommunicationOptionsSchema.options

  const nameInput = useMemo(() => {
    return <FormControl mb={8} isInvalid={errors.name !== undefined} hidden={userPreferences?.name !== undefined}>
      <FormLabel mb={4} htmlFor='name'>Please tell us your name</FormLabel>
      <Input
        id='name'
        placeholder='John Smith'
        {...register('name')}
      />
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
    </FormControl>
  }, [errors.name, register, userPreferences?.name])


  const dietaryRadio = useMemo(() => {
    return <FormControl mb={8} isInvalid={errors.dietary_requirements !== undefined}>
      <FormLabel mb={4} htmlFor="dietary_requirements">Dietary Requirements</FormLabel>
      <CustomRadioGroup name="dietary_requirements" options={options} control={control} />
      <FormErrorMessage>
        {errors.dietary_requirements && errors.dietary_requirements.message}
      </FormErrorMessage>
    </FormControl>
  }, [control, errors.dietary_requirements, options])

  const personalisationCheckboxes = useMemo(() => {
    return <FormControl mb={8} isInvalid={errors.personalisation !== undefined}>
      <FormLabel mb={4} htmlFor="personalisation">Personalise</FormLabel>
      <CustomCheckboxGroup name="personalisation" options={checkboxOptions} control={control} />
      <FormErrorMessage>
        {errors.personalisation && errors.personalisation.message}
      </FormErrorMessage>
    </FormControl>
  }, [control, errors.personalisation, checkboxOptions])

  const communicationCheckboxes = useMemo(() => {
    return <FormControl mb={8} isInvalid={errors.communication !== undefined}>
      <FormLabel mb={4} htmlFor="communication">Communication Preferences</FormLabel>
      <CustomCheckboxGroup name="communication" options={communicationOptions} control={control} />
      <FormErrorMessage>
        {errors.communication && errors.communication.message}
      </FormErrorMessage>
    </FormControl>
  }, [control, errors.communication, communicationOptions])


  return (
    <Container maxW='container.md'>
      {userPreferences?.name && <Text fontSize='3xl' mb={8}>Welcome back {userPreferences.name}</Text>}
      {isLoaded ?
        <form onSubmit={handleSubmit(onSubmit)} >
          {nameInput}
          {dietaryRadio}
          {personalisationCheckboxes}
          {communicationCheckboxes}
          <Box display='flex' justifyContent='end'>
            <Button my={4} bg='brand.100' isLoading={isSubmitting} type='submit'>
              Save Preferences
            </Button>
          </Box>
        </form>
        : <Center><CircularProgress isIndeterminate color="brand.100" /></Center>}
      <Text>{userPreferences?.name}</Text>
      <Text>{userPreferences?.dietary_requirements}</Text>
      <Text>{userPreferences?.personalisation?.join(', ')}</Text>
      <Text>{userPreferences?.communication?.join(', ')}</Text>
    </Container>
  )

}
