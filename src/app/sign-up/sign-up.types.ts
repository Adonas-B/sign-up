import { z } from 'zod'

export const PersonalisationOptionsSchema = z.enum(['seasonal', 'recipes', 'fruit', 'veg', 'drinks', 'household'])
export const CommunicationOptionsSchema = z.enum(['phone', 'email', 'text', 'post'])

export const signUpFormSchema = z.object(
	{
		name: z.string().min(2, { message: 'Name is Required' }),
		dietary_requirements: z.enum(['none', 'vegan', 'vegetarian']),
		personalisation: z.array(PersonalisationOptionsSchema).optional(),
		communication: z.array(CommunicationOptionsSchema).optional(),
	}
)

export type SignUpFormValues = z.infer<typeof signUpFormSchema>
export type PersonalisationOptions = z.infer<typeof PersonalisationOptionsSchema>
export type CommunicationOptions = z.infer<typeof CommunicationOptionsSchema>