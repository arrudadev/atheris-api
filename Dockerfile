# ---- Base Stage ----
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build Stage ----
FROM dependencies AS build
COPY . .
RUN pnpm build

# ---- Development Target Stage ----
FROM dependencies AS development
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# ---- Production Target Stage ----
FROM base as production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nodejs
ENV NODE_ENV=production
COPY --chown=nodejs:nodejs package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --chown=nodejs:nodejs --from=build /app/dist ./dist
USER nodejs
EXPOSE 3000
CMD ["node", "dist/main"]