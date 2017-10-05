package proxy

import "github.com/amltoken/teller/src/daemon"

type sessionMgr struct {
	sns chan *daemon.Session
}
