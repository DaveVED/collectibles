# Base image for AWS Lambda
FROM public.ecr.aws/lambda/nodejs:18 AS base

# Stage 1: Builder (prune dependencies and code using Turbo)
FROM base AS builder
# Install libc6-compat if necessary (based on the previous example)
RUN apk update && apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install Turbo globally for pruning and building
RUN npm install -g turbo

# Copy the full monorepo to the container
COPY . .

# Prune the monorepo, keeping only the relevant package (`tcg-reference-api` in this case)
RUN turbo prune tcg-reference-api --docker

# Stage 2: Installer (install pruned dependencies)
FROM base AS installer
WORKDIR /app

# Install libc6-compat if necessary
RUN apk update && apk add --no-cache libc6-compat

# Copy the pruned package.json and lockfile from the builder
COPY --from=builder /app/out/json/ .

# Install only production dependencies (from pruned workspace)
RUN npm install --prod --frozen-lockfile

# Stage 3: Builder (build the pruned package)
COPY --from=builder /app/out/full/ .

# Run the Turbo build for the specific package (`tcg-reference-api`)
RUN npm run build --workspace=tcg-reference-api

# Stage 4: Final stage for AWS Lambda
FROM public.ecr.aws/lambda/nodejs:18

# Set working directory
WORKDIR /app

# Copy the built application from the installer
COPY --from=installer /app .

# Set the command to Lambda handler
CMD ["lambda.handler"]  # Ensure your Lambda handler file is properly set, e.g., "dist/lambda.handler"
