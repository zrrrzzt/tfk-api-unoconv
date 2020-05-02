FROM telemark/docker-node-unoconv:10.20.1

#### Begin setup ####

# Bundle app source
COPY . /src

# Change working directory
WORKDIR /src

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000
ENV PAYLOAD_MAX_SIZE 1048576
ENV PAYLOAD_TIMEOUT 120000
ENV TIMEOUT_SERVER 120000
ENV TIMEOUT_SOCKET 140000

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 & node standalone.js