FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:3000"

# Run tests
RUN npm test

RUN npm run build

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]

