import * as z from 'zod'

// TS4-friendly parsing without enum/union/literal overloads
const stringBoolean = z.string().refine((v) => v === 'true' || v === 'false')
const configBoolean = stringBoolean.default('true').transform((v) => v === 'true')

const relationModelString = z
	.string()
	.refine((v) => v === 'default' || v === 'true' || v === 'false')
	.default('true')
const relationModel = relationModelString.transform((v) =>
	v === 'default' ? 'default' : v === 'true'
)

const modelCaseString = z.string().refine((v) => v === 'PascalCase' || v === 'camelCase')

export const configSchema = z.object({
	relationModel: relationModel,
	modelSuffix: z.string().default('Model'),
	modelCase: modelCaseString.default('PascalCase'),
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
