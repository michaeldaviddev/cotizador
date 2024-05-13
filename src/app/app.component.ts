import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cotizador';
  item$!: Observable<any>;
  firestore: Firestore = inject(Firestore);

  solesAmount: number = 0;
  dollarAmount: number = 0;
  salePrice: number = 0;
  purchasePrice: number = 0;

  public flexDirection: string = 'column';

  toggleFlexDirection() {
    this.flexDirection = (this.flexDirection === 'column') ? 'column-reverse' : 'column';
  }

  ngOnInit() {
    const itemDoc = doc(this.firestore, 'rates/TDmXIypgLKKfNggHHSnw');
    this.item$ = docData(itemDoc);

    this.item$.subscribe((data) => {
      console.log(data);
      this.salePrice = data.sale_price;
      this.purchasePrice = data.purchase_price;
    });
  }

  changeSolesAmount() {
    this.solesAmount = this.dollarAmount * this.purchasePrice;
  }

  changeDollarAmount() {
    this.dollarAmount = this.solesAmount / this.salePrice;
  }
}
