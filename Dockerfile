FROM node:alpine

RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing task=2.6.2-r2
RUN apk add --no-cache python3

# Set environment variables
ENV TASKDATA=/root/.task
ENV TASKRC=/root/.taskrc
ENV REPORTS=
ENV TZ=

WORKDIR /app

COPY . .

RUN npm install
RUN npm run disable-telemetry
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

COPY start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
