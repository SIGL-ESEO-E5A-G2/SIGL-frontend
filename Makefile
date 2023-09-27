
verifyquality: ## Lint the code
	ng lint 

clean: ## Clean Up temporary files
	rm -Rf .m2/*
	rm -Rf tests_auto/log/*
	rm -Rf target/*

qbuild:
	docker-compose -f app.qbuild.yml down
	docker-compose -f app.qbuild.yml build
	docker-compose -f app.qbuild.yml up --remove-orphans 
	docker-compose -f app.qbuild.yml down

.DEFAULT_GOAL := help
