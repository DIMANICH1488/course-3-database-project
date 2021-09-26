
migrate-new:
	@npx knex --debug migrate:make xxx

migrate:
	@npx knex --debug migrate:up

unmigrate:
	@npx knex --debug migrate:down

seed-new:
	@npx knex --debug seed:make xxx

seed:
	@npx knex --debug seed:up

unseed:
	@npx knex --debug seed:down
