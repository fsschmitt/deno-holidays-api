.DEFAULT_GOAL = help
.PHONY: help run

include .env

help:
	@echo -e "MAKE COMMANDS AVAILABLE:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-12s\033[0m %s\n", $$1, $$2}'

run: ## Run deno application
	deno run --allow-env --allow-net=${SECURITY_NET} --allow-read=${SECURITY_READ} src/index.ts
