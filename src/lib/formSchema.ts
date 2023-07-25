import { z } from 'zod'

export const formSchema = z.object({
	mode: z.string().nonempty({ message: 'Generation mode is required.' }),
	description: z
		.string()
		.trim()
		.min(15, { message: 'Minimum of 15 characters required.' })
		.max(500, { message: 'Maximum of 500 charcters are allowed.' })
		.regex(/^[a-zA-Z0-9 ,."'_\-?!]+$/, {
			message: 'Description contains unsupported characters.'
		}),
	tone: z.string().default('professional'),
	creativity: z.string().default('0.9'),
	characters: z.number().default(200)
})
