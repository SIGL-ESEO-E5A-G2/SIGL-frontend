
qbuild:
	docker-compose -f app.qbuild.yml down
	docker-compose -f app.qbuild.yml build
	docker-compose -f app.qbuild.yml up --remove-orphans 
	docker-compose -f app.qbuild.yml down

.DEFAULT_GOAL := help
