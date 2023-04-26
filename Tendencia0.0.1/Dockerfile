FROM node:19

WORKDIR /src
		
COPY package*.json ./ 	 
		
RUN npm install
		
COPY . .
		
EXPOSE 54321
		
CMD ["babel-node", "index.js"]