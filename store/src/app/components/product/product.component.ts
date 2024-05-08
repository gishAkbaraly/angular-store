import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { PricePipe } from '../../pipes/price.pipe';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule, 
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    TruncateNamePipe, 
    PricePipe
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService : ConfirmationService) {}


  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();


  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    console.log("Je suis appeller");
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
      reject: () => {
        console.log("Rejected");
      }
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {}
}

