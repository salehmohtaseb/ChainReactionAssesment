# Chain-Reaction-assessment
This repo is to handle Chain-Reaction assessment

### Pre requirements to install on your device  
	* Install postgres database 
		* Mac
			* visit this site and download the postgresSQL latest version for the pgadmin 
				* https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
			* for locally https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399
				* if its asked for a password after installation run this as a super admin
				* sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
						ALTER ROLE
					* login using the postgres as a password
			
		* Linux 
			* visit this site and follow the steps 
			* https://r00t4bl3.com/post/how-to-install-postgresql-13-on-linux-mint-20-ulyana
	
	* Install Redis 
		* Mac 
			* https://phoenixnap.com/kb/install-redis-on-mac
		*linux
			* https://linuxtechlab.com/how-install-redis-server-linux/
	* install node 
		* https://nodejs.org/en/download/

# How to start the server locally
* clone the repo
* copy .env.sample and apply you config 
     `cp .env.sample .env `
* do the following commands 
    ``` 
        - run npm i -d 
        - run npm run db:create 
        - run npm run db:migrate 
        - run npm run db:seed
        - run npm run start
    ```
    check the seed files to get the email and pass for the users 

# How to start via docker 
	```
		docker build . -t chainreaction
		docker-compose up
		go to you browser http://127.0.0.1:3001/docs/
	```

# Swagger documentation 
    got to your server host:port/docs eg: localhost:3001/docs
