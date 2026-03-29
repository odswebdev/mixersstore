FROM node:18
WORKDIR /
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
EXPOSE 3000
CMD ["node", "backend/server.js"]