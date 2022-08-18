


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/services/api.services';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})


export class AddProductDialogComponent implements OnInit {

  formdata = {};

  title: string = "";

  category: string = ''

  description: string = ''

  price: number = 0

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
   
  }

  public titleChange(title: string){
    this.title = title;
  }
  
  public categoryChange(category: string)
  {
    this.category = category;
  }

  public descriptionChange(description: string)
  {
    this.description = description
  }
  public priceChange(price: number)
  {
    this.price = price
  }


  onClickSubmit(){
    let requestBody = {
      title: this.title,
      price: this.price,
      description: this.description,
      image: 'https://i.pravatar.cc',
      category: this.category
    }
    this.apiService.addNewProduct(requestBody).subscribe(
      {
        next: data =>{
          console.log("Added record===", data);
          this.openSnackBar('Product added successfully!')
          this.dialogRef.close()
        },
        error: err=>{
          console.log("err===",err);
          this.openSnackBar('Failed while adding product. Please try again!')
          
        }
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: "top", 
      horizontalPosition: "center" 
    });
  }
}
