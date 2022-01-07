FROM node:latest

COPY . .

RUN npm install
RUN npm run build

ENV DOTENV PRODUCTION
ENV PORT 5000

ENV CORS_URL <Your URL>
ENV COOKIE_SECRET <Your Secret>

EXPOSE 5000
CMD node dist/app.js

