# Staff Scheduler App

## How to run

### Use the demo
You can use the [demo app deployed on Heroku](https://staff-scheduler-barbusa.herokuapp.com).

Also, you can access the demo [documentation on Swaggerhub](https://app.swaggerhub.com/apis/Cordo-van-Saviour/staff-scheduler/0.0.1) and run tests from there

### Running it locally
1. Download .env file to the root of the project [using this link](https://podino.s3.us-west-1.amazonaws.com/dotenv.file) 
2. `mv dotenv.file ~/YOUR_APP_LOCATION/.env`
3. Run `docker-compose up -d`
4. Run `sequelize-cli db:migrate --config=config/config.js --env=docker`
5. Run `sequelize-cli db:seed:all --config=config/config.js --env=docker`
6. start testing

Optionally, you can get JWT keys with long expiration date for testing purposes:
* [JWT Admin](https://podino.s3.us-west-1.amazonaws.com/jwt.admin.txt)
* [JWT Staff User](https://podino.s3.us-west-1.amazonaws.com/jwt.developer.txt)

> I've spent [6] hours trying to debug the issue why `sequelize db:migrate` doesn't work inside the Docker.  

## Security practices

#### Headers
This app is secured by [helmet.js](https://helmetjs.github.io/)

#### Concurrent requests
As of right now, concurrent requests are limited by `express-rate-limit`. This is suboptimal and before going to 
production obviously we should use nginx, firewall, a real load balancer, etc.

#### Query injection prevention
We are setting up a query injection vulnerabilities prevention by always using [Sequelize](https://sequelize.org/)

### Potential improvements
- *Add more tests*
  - Code coverage should be a lot better but since there is not a lot of business logic, a decision was made to not write unitt tests for the functions that only call libraries like Sequelize or Jsonwebtoken. Integration tests are fine
- *Secret Management System*
  - We should set up something like [HashiCorp Vault](https://www.vaultproject.io/) as an alternative to existing secret store. 
- *Add SSL*
  - Self-explanatory
- *Automated vulnerability scanner*
  - We should continually scan for vulnerabilities in this project using [Snyk](https://snyk.io/) or [Github](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors). As of right now, per `npm audit`, we have zero known vulnerabilities.
- *CI / CD*
- ...

### Logging practices

> Your application code should not handle log routing

Essentially we're not defining separate transports in-app for development and production. This isn't an application concern, 
but application that has separation of concerns done right should handle this on infrastructure level.

## Production
`pm2` should be used in production

## Potential Improvements