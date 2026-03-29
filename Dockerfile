FROM node:18
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
EXPOSE 3000
CMD ["node", "backend/src/server.js"]