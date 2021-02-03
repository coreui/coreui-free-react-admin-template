FROM node:14.15.4

ADD ./compose/reactjs/start.sh /
RUN sed -i 's/\r//' start.sh
RUN chmod +x start.sh

ADD . /app
WORKDIR /app
