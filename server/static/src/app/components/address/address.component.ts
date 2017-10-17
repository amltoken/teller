import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnDestroy {
  private address: string;
  private routeSubscription: Subscription;
  private info: any;
  rows: Array< { index: string, block: number, hash: string}> = [];
  columns = [
    { prop: 'index' },
    { prop: 'block' },
    { prop: 'hash' },
  ];


  constructor(private api: ApiService, private route: ActivatedRoute ) {
    this.routeSubscription = route.params.subscribe(params=> {
      this.address=params['id'];
      this.api.getAddressInfoBTC(this.address).subscribe((data: any) => {
        let info = JSON.parse(data._body);
        this.info = info;
        this.changeRows(this.info.txs)
      })
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  public changeRows(transactions: any) {
    this.rows = [];
    for (let i=0; i<=transactions.length-1; i++) {
      this.rows.push({'index': transactions[i].tx_index, 'block': transactions[i].block_height, 'hash': transactions[i].hash})
    }
  }

}
