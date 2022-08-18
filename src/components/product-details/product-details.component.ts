import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.services';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { IproductDetails } from './product-details.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})


export class ProductDetailsComponent implements OnInit {

  public productData: Array<IproductDetails> = []

  public  displayedColumns: string[] = ['id', 'title', 'category','description', 'price', 'image', 'delete']; 

  constructor(
    private apiService: ApiService,
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  private getProductDetails()
  {
    this.apiService.getproductDetails<any>().subscribe({
      next: (data): any =>{
        if(data)
        {
          console.log(data);
          
          this.productData = data
        }
      },
      error: (e)=>{
        console.log(e)
        this.openSnackBar('Failed to fetch product details. Please try again.');
      }
    }
      )
  }

  public deleteProduct(productId: number){
    console.log(productId);
    this.apiService.deleteProduct(productId).subscribe({
      next: (data): any =>{
        if(data)
        {
          console.log(data);
          this.openSnackBar('Product deleted successfully!')
        }
      },
      error: (e)=>{
        console.log(e)
        this.openSnackBar('Failed to delete product. Please try again.')
      }
    }
    )
  }

  public openDialog()
  {
    let dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px', 
      height:'450px',
    })

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: "top", 
      horizontalPosition: "center" 
    });
  }
}
