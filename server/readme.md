Comando a serem executados.

npm install express
npm install @type/express -D // instalar os types do express

npm install ts-node -D

npm install typescritpt -D
npx tsc --init // arquivo para definir o que será utilizado no typescritpt

npx ts-node src/server.ts // executar programa

npm install ts-node-dev -D // para não ficar parando toda vez que alterar o código node;

alterar package json e incluit o script para facilitar a execução em dev

#### Executar migrations

npx knex migrate:latest --knexfile knexfile.ts migrate:latest
ou colocar no package.json "knex:migrate": "knex migrate:latest --knexfile knexfile.ts migrate:latest"
e executar npm run knex:migrate

### instalar cores para enxergar demais urls
npm install cores;
npm install @types/cors -D






