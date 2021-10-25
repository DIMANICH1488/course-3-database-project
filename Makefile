
migrate-new:
	@npx knex --debug migrate:make xxx

migrate-last:
	@npx knex --debug migrate:up

unmigrate-last:
	@npx knex --debug migrate:down

migrate:
	@npx knex --debug migrate:latest

unmigrate:
	@npx knex --debug migrate:rollback --all

seed-new:
	@npx knex --debug seed:make xxx

seed:
	@npx knex --debug seed:up

unseed:
	@npx knex --debug seed:down
