package server

import (
	"encoding/json"
	"encoding/binary"
	"fmt"
	"log"
	"net/http"

	"github.com/boltdb/bolt"
)

type BtcAddressJSON struct {
	Addresses []string `json:"btc_addresses"`
}

var Status = func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "teller api works.")
}

func openDB() *bolt.DB {
	db, err := bolt.Open("btcaddr.db", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

// itob returns an 8-byte big endian representation of v.
func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}


var AddBtcAddresses = func(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var adr BtcAddressJSON
	err := decoder.Decode(&adr)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	log.Println(adr.Addresses)
	db := openDB()

	for _, btcAddres := range adr.Addresses {
		db.Update(func(tx *bolt.Tx) error {
			b, err := tx.CreateBucketIfNotExists([]byte("addresses"))
			if err != nil {
				return fmt.Errorf("create bucket: %s", err)
			}
			id, _ := b.NextSequence()
			key := int(id)
			err = b.Put(itob(key), []byte(btcAddres))
			return err
		})
	}
	db.Close()
	fmt.Fprintf(w, "added.")
}

var GetBtcAddresses = func(w http.ResponseWriter, r *http.Request) {
	log.Println("asd")
	db := openDB()
	db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("addresses"))
		b.ForEach(func(k, v []byte) error {
			fmt.Printf("value=%s\n", v)
			return nil
		})
		return nil
	})
	db.Close()
	fmt.Fprintf(w, "ok.")
}

func LaunchServer(port string) {
	http.HandleFunc("/", Status)
	http.HandleFunc("/addbtc", AddBtcAddresses)
	http.HandleFunc("/getbtc", GetBtcAddresses)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
