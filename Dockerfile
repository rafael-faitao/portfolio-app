# Production Dockerfile for Next.js (Node runtime)
# Build stage
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN   if [ -f package-lock.json ]; then npm ci --legacy-peer-deps;   elif [ -f yarn.lock ]; then yarn install --frozen-lockfile;   elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile;   else npm i; fi

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Optional: enable standalone output for slimmer runtime image
# RUN printf "\nexport default { output: 'standalone' }\n" >> next.config.mjs
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# If using 'standalone' output, copy .next/standalone and .next/static instead
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
