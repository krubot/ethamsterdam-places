website_ipfs := $(shell ipfs --api /ip4/127.0.0.1/tcp/5001 add -rq website/)

all: website

.PHONY: website
website:
	brave-browser "ipfs://$(lastword ${website_ipfs})"

.PHONY: ipfs
ipfs:
	docker run -it --name ipfs-mainnet -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/go-ipfs:v0.11.0

.PHONY: compile
compile:
	node scripts/compile.js

.PHONY: deploy
deploy:
	node scripts/deploy.js
