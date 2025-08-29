import { ConfigService } from '@nestjs/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
})

type Env = z.infer<typeof envSchema>

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = envSchema.parse(config)
  return validatedConfig
}

export const EnvService = ConfigService<Env>
