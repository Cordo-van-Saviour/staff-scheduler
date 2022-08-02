# Staff Scheduler App

## How to run

### Use the demo
You can use the [DEMO app deployed on Heroku](https://staff-scheduler-barbusa.herokuapp.com).

Also, you can access the demo [documentation on Swaggerhub](https://app.swaggerhub.com/apis/Cordo-van-Saviour/scheduler/0.0.1) and run tests from there

### Running it locally
1. Download .env file to the root of the project [using this link](https://podino.s3.us-west-1.amazonaws.com/dotenv.file) 
2. `mv dotenv.file ~/YOUR_APP_LOCATION/.env`
3. Make sure the `DB_HOST` is set to `localhost`
4. Run `docker-compose up -d postgres`
5. Run `sequelize db:migrate`
6. Change the `DB_HOST` in `.env` file to `postgres`
7. Run `docker-compose up -d backend`

> I've spent [4] hours trying to debug the issue why `sequelize db:migrate` doesn't work inside the Docker. I'll retry it fresh.  

## Security practices

#### Headers
This app is secured by [helmet.js](https://helmetjs.github.io/)

#### Concurrent requests
As of right now, concurrent requests are limited by `express-rate-limit`. This is suboptimal and before going to 
production obviously we should use nginx, firewall, a real load balancer, etc.

#### Query injection prevention
We are setting up a query injection vulnerabilities prevention by always using [Sequelize](https://sequelize.org/)

#### TODO: Moment
[Moment.js](https://www.npmjs.com/package/moment) is a legacy project, now in maintenance mode. Even though there are (possibly) better alternatives such as [luxon](https://www.npmjs.com/package/luxon) or [day.js](https://www.npmjs.com/package/dayjs), we chose to use moment since it is the most widely used and most well known library. We should talk about migrating away.  

#### TODO: bcrypt
This project uses `bcryptjs` at this moment which is slower than `bcrypt`. We had issues on M1 Macs during the development with `bcrypt` so we didn't want to waste time solving it but in future iterations `bcryptjs` should be changed.

#### TODO: Secret management system
We should set up something like [HashiCorp Vault](https://www.vaultproject.io/) as an alternative to existing secret store.

#### TODO: Add SSL
Self-explanatory

#### TODO: Add Snyk or another automated vulnerability scanner
We should continually scan for vulnerabilities in this project using [Snyk](https://snyk.io/) or [Github](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors). As of right now, per `npm audit`, we have zero known vulnerabilities.

## Logging practices

#### Your application code should not handle log routing
Essentially we're not defining separate transports in-app for development and production. This isn't an application concern, 
but application that has separation of concerns done right should handle this on infrastructure level.

## Production
`pm2` should be used in production

## Potential Improvements
* CI / CD
* SSL
* Secret Management System
* bcrypt
* ...
