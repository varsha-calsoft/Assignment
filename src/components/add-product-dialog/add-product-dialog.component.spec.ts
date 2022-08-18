import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/services/api.services';
import { ProductDetailsComponent } from '../product-details/product-details.component';

import { AddProductDialogComponent } from './add-product-dialog.component';
let apiServicefake: ApiService;
let httpTestingController: HttpTestingController;

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductDialogComponent ],
      imports:[ MatFormFieldModule,HttpClientTestingModule,FormsModule, MatInputModule, BrowserAnimationsModule, MatDialogModule, ],
      providers:[ApiService, HttpClient, { provide: MatDialogRef,useValue:{} }, MatSnackBar,HttpTestingController, Overlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpTestingController = TestBed.inject(HttpTestingController);
    apiServicefake = TestBed.inject(ApiService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new product', ()=>{
    component.onClickSubmit();
    let requestBody = {
      category: "cloths",
      description: "nice fabric",
      image: "https://i.pravatar.cc",
      price: 99,
      title: "shirt",
    }
    let result={
        category: "cloths",
        description: "nice fabric",
        id: 21,
        image: "https://i.pravatar.cc",
        price: 99,
        title: "shirt",
      
    }

    apiServicefake.addNewProduct(requestBody).subscribe({
      next:( res:any) =>{
        console.log(res);
        expect(result).toEqual(res)
      },
      error: err=>{
        console.log(err);
      }
     
    })
    
  })
  
  it('should call titleChange', ()=>{
    component.titleChange('shirt')
    expect(component.title).toBe('shirt')
  })

  it('should call categoryChange', ()=>{
    component.categoryChange('cloths')
    expect(component.category).toBe('cloths')
  })

  it('should call descriptionChange', ()=>{
    component.descriptionChange('nice fabric')
    expect(component.description).toBe('nice fabric')
  })

  it('should call priceChange', ()=>{
    component.priceChange(99)
    expect(component.price).toBe(99)
  })



  it('should open snack bar',()=>{
    spyOn(component._snackBar,"open").and.callThrough();
    component.openSnackBar("Hii");
    expect(component._snackBar.open).toHaveBeenCalled();
  })
});
