FROM node:18-buster

WORKDIR /var/workspace/sigl-front

# Copy run script
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Launch npm start
ENTRYPOINT ["/run.sh"]