npm i pg
npm i dotenv
npm i sequelize express
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer 
**npx sequelize-cli db:migrate**