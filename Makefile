include .env
export $(shell sed 's/=.*//' .env)

DOCKER_PRUNE := docker container prune -f && \
                docker image prune -a -f && \
                docker volume prune -f && \

up:
	docker compose -f compose.yml -f compose.dev.yml up
down:
	docker compose -f compose.yml -f compose.dev.yml down
restart:
	docker compose -f compose.yml -f compose.dev.yml down && docker compose -f compose.yml -f compose.dev.yml up --build
logs:
	docker compose -f compose.yml -f compose.prod.ym logs -f
prune:
	@$(DOCKER_PRUNE)

# Production
production-up:
	@$(DOCKER_PRUNE) docker compose -f compose.yml -f compose.prod.yml up -d
production-down:
	docker compose -f compose.yml -f compose.prod.yml down
production-logs:
	docker compose -f compose.yml -f compose.prod.yml logs -f
