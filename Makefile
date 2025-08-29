.PHONY: up down restart

up:
	docker compose up -d

down:
	docker compose down

restart: down
	docker compose up -d --build
