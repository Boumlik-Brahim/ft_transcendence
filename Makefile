build:
	docker-compose -f ./srcs/docker-compose.yml up --build

run:
	docker-compose -f ./srcs/docker-compose.yml up

down:
	docker-compose -f ./srcs/docker-compose.yml down

clean: down
	docker volume rm $$(docker volume ls -q);

fclean: down
	docker system prune -a -f;

.PHONY: build run down clean fclean