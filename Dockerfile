FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

#you can use yarn/pnpm or bun install as per your distro
RUN npm install  

RUN apk add --no-cache postgresql-client

RUN npm run build 



FROM postgres:14-alpine AS final
COPY --from=builder /app /app

# Expose port for your application
EXPOSE 3000

# Entrypoint for your application server
CMD ["npm", "run" , "dev"]
