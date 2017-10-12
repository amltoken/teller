import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private title: string = "";
  private addresses: string[];
  private newaddress: string;
  private newbtc: string[] = [];
  private used: string[] = [];
  public count: {All: number, Free: number, Used: number};
  constructor(private api: ApiService) {

  }


  public getBTC() {
    this.api.getBTC().subscribe((data:any) => {

      let btc = JSON.parse(data._body);
      this.addresses = btc.btc_addresses;
      this.title = "all addresses:";
    })
  }

  public getCount() {
    this.api.getCount().subscribe((data:any) => {

      let count = JSON.parse(data._body);
      this.count = count;
    })
  }

  public getFree() {
    this.api.getFreeBTC().subscribe((data:any) => {

      let btc = JSON.parse(data._body);
      this.addresses = btc.btc_addresses;
      this.title = "free addresses:";
    })
  }

  public getUsed() {
    this.api.getUsedBTC().subscribe((data:any) => {

      let btc = JSON.parse(data._body);
      this.addresses = btc.btc_addresses;
      this.title = "used addresses:";
    })
  }

  public sendBTC() {
    console.log(this.newaddress)
    this.newbtc.push(this.newaddress);
    this.api.sendBTC(this.newbtc).subscribe((data:any)=> {
      this.newbtc = [];
    })
  }

  public Bind(address) {
    console.log(address)
    this.used.push(address);
    this.api.setUsed(this.used).subscribe((data:any)=> {
      this.used = [];
    })
  }

}
