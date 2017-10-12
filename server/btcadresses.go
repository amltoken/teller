package server

import (
	"encoding/binary"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"github.com/amltoken/teller/src/util/httputil"
	"github.com/boltdb/bolt"
	"github.com/rs/cors"
	"os"
)

var database *bolt.DB

type BtcAddressJSON struct {
	Addresses []string `json:"btc_addresses"`
}

type CountBtc struct {
	All  int
	Used int
	Free int
}


//db functions
func openDB() *bolt.DB {
	db, err := bolt.Open("btcaddr.db", 0600, nil)
	db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte("addresses_btc"))
		if err != nil {
			return fmt.Errorf("create bucket: %s", err)
		}
		_, err = tx.CreateBucketIfNotExists([]byte("used_btc"))
		if err != nil {
			return fmt.Errorf("create bucket: %s", err)
		}
		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
	return db
}



func valueExist(bucket string, value string) (bool, error) {
	exist := false
	database.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte(bucket))
		b.ForEach(func(k, v []byte) error {
				s := string(v[:])
			if s == value {
				exist = true
			}
			return nil
		})
		return nil
	})

	return exist, nil
}

func setUsed(address string) {
	exist, err := valueExist("addresses_btc", address)
	if err != nil {
		fmt.Errorf("Accept to bucket failed: %v", err)
	}
	used, err := valueExist("used_btc", address)
	if err != nil {
		fmt.Errorf("Accept to bucket failed: %v", err)
	}
	log.Println(exist, " ", used)
	database.Update(func(tx *bolt.Tx) error {

		if exist && !used {
			b := tx.Bucket([]byte("used_btc"))
			id, _ := b.NextSequence()
			key := int(id)
			err = b.Put(itob(key), []byte(address))
			if err != nil {
				log.Println("TYT:", err)
			}
			return err
		}

		return nil
	})
}

func getFree() BtcAddressJSON {
	var btc_adr BtcAddressJSON

	database.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("addresses_btc"))
		b.ForEach(func(k, v []byte) error {
			s := string(v[:])
			used, err := valueExist("used_btc", s)
			if err != nil {
				fmt.Errorf("Accept to bucket failed: %v", err)
			}
			if !used {
				btc_adr.Addresses = append(btc_adr.Addresses, s)
			}

			return nil
		})
		return nil
	})

	return btc_adr
}

func getUsed() BtcAddressJSON {
	var btc_adr BtcAddressJSON
	database.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("used_btc"))
		b.ForEach(func(k, v []byte) error {
			s := string(v[:])
			btc_adr.Addresses = append(btc_adr.Addresses, s)
			return nil
		})
		return nil
	})

	return btc_adr
}

// itob returns an 8-byte big endian representation of v.
func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}

// method: POST
// url: /addbtc  {"btc_addresses": ["1st_add", "2nd_adr", ...]}
var AddBtcAddresses = func(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var adr BtcAddressJSON
	err := decoder.Decode(&adr)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	log.Println(adr.Addresses)

	for _, btcAddres := range adr.Addresses {
		exist, err := valueExist("addresses_btc", btcAddres)
		if err != nil {
			fmt.Errorf("Accept to bucket failed: %v", err)
		}
		log.Println(exist)
		if !exist {

			database.Update(func(tx *bolt.Tx) error {
				b := tx.Bucket([]byte("addresses_btc"))
				id, _ := b.NextSequence()
				key := int(id)
				err = b.Put(itob(key), []byte(btcAddres))
				if err != nil {
					log.Println("Put error:", err)
				}
				return err
			})

		}
	}

	fmt.Fprintf(w, "added.")
}

// method: POST
// url: /setusedbtc  {"btc_addresses": ["1st_add", "2nd_adr", ...]}
var SetUsedBtc = func(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var adr BtcAddressJSON
	err := decoder.Decode(&adr)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	log.Println(adr.Addresses)

	for _, btcAddres := range adr.Addresses {
		setUsed(btcAddres)
	}
	fmt.Fprintf(w, "set used.")
}

// method: GET
// url: /getbtc
var GetBtcAddresses = func(w http.ResponseWriter, r *http.Request) {
	log.Println("show all.")

	var btc_adr BtcAddressJSON
	database.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("addresses_btc"))
		b.ForEach(func(k, v []byte) error {
			fmt.Printf("value=%s\n", v)
			s := string(v[:])
			btc_adr.Addresses = append(btc_adr.Addresses, s)
			return nil
		})
		return nil
	})

	httputil.JSONResponse(w, btc_adr)
}

// method: GET
// url: /getusedbtc
var GetBtcUsedAddresses = func(w http.ResponseWriter, r *http.Request) {
	log.Println("show used.")
	btc_adr :=getUsed()
	httputil.JSONResponse(w, btc_adr)
}

// method: GET
// url: /allfreebtc
var GetAllFreeBTC = func(w http.ResponseWriter, r *http.Request) {
	log.Println("show free.")
	btc_adr := getFree()
	httputil.JSONResponse(w, btc_adr)
}

// method: GET
// url: /getcountbtc
var GetCountBTC = func(w http.ResponseWriter, r *http.Request) {
	log.Println("show free.")
	var count CountBtc

	btc_adr := getFree()
	count.Free = len(btc_adr.Addresses)

	btc_adr = getUsed()
	count.Used = len(btc_adr.Addresses)
	count.All = count.Free + count.Used

	httputil.JSONResponse(w, count)
}




func LaunchServer(port string) {
	database = openDB()
	defer os.Remove(database.Path())
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("../static/dist")))
	mux.HandleFunc("/addbtc", AddBtcAddresses)
	mux.HandleFunc("/getbtc", GetBtcAddresses)
	mux.HandleFunc("/getusedbtc", GetBtcUsedAddresses)
	mux.HandleFunc("/setusedbtc", SetUsedBtc)
	mux.HandleFunc("/allfreebtc", GetAllFreeBTC)
	mux.HandleFunc("/getcountbtc", GetCountBTC)

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":"+port, handler)
}
