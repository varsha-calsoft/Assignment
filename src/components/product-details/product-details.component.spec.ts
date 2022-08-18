import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/services/api.services';
import {
    HttpClientTestingModule,
    HttpTestingController
  } from "@angular/common/http/testing";
import { ProductDetailsComponent } from './product-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let apiServicefake: ApiService;
  let httpTestingController: HttpTestingController;
  
  let  productData = [
    {
      category: "men's clothing",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      id: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 109.95,
      rating: {rate: 3.9, count: 120},
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports:[MatDialogModule,  BrowserAnimationsModule, HttpClientTestingModule, MatFormFieldModule,MatTableModule ],
      providers:[ApiService, HttpClient, MatSnackBar, Overlay, MatDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
 
    httpTestingController = TestBed.inject(HttpTestingController);
    apiServicefake = TestBed.inject(ApiService)
   
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product details', ()=>{
    let data: Array<any>=[]
    component.ngOnInit()
    apiServicefake.getproductDetails().subscribe({
      next: res =>{
        data = res
        expect(data[0]).toEqual(productData[0])
        
      },
      error: err=>{
        console.log(err);
      }
     
    })
    
  })



  it('should delete product', ()=>{
    component.deleteProduct(0)
    apiServicefake.deleteProduct(0).subscribe({
      next: data=>{
        expect(data).toEqual(productData[0])
      },
      error: err=>{
        console.log(err);
      }
    })
  })

  it('should open snack bar',()=>{
    spyOn(component._snackBar,"open").and.callThrough();
    component.openSnackBar("Hii");
    expect(component._snackBar.open).toHaveBeenCalled();
  })

  it('should open dialog', ()=>{
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    const app = fixture.componentInstance;
    component.openDialog();
  })
});
