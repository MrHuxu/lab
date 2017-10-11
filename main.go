package main

import (
	"github.com/MrHuxu/lab/server/web"
)

func main() {
	server := web.NewServer(13109, "server/web/templates/*", "server/public")
	server.Run()
}
