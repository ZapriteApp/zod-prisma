import { z } from 'zod'

const stringBoolean = z.union([z.literal('true'), z.literal('false')])
const configBoolean = stringBoolean
	.default('true')
	.transform((arg: 'true' | 'false') => arg === 'true')

export const configSchema = z.object({
	relationModel: z.union([z.literal('default'), configBoolean]),
	modelSuffix: z.string().default('Model'),
	modelCase: z.union([z.literal('PascalCase'), z.literal('camelCase')]).default('PascalCase'),
	useDecimalJs: configBoolean,
	imports: z.string().optional(),
	prismaJsonNullability: configBoolean,
})

export type Config = z.infer<typeof configSchema>

export type PrismaOptions = {
	schemaPath: string
	outputPath: string
	clientPath: string
}

export type Names = {
	model: string
	related: string
}
