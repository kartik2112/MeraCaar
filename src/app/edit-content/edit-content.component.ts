import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ContentService} from '../home/content/content.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Content} from '../home/content/content.model';
import {ContentPartial} from '../home/content/contentPartial.model';

declare var particlesJS: any;

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css','../app.component.css']
})
export class EditContentComponent implements OnInit {

  @ViewChild('ReferencesSection') refSection:ElementRef;
  @ViewChild('mainForm') mainForm:ElementRef;
  private carData:Content = new Content();
  private modificationKey:string = "";
  private _sendingData:boolean = false;
  private _successMessage:string;
  private _waitState:boolean = true;
  private _allCont:Array<ContentPartial>;

  constructor(public _contentService:ContentService, private _sanitizer: DomSanitizer) {
    this._waitState = true;
    this._contentService.prefetchBasicAll()
    .subscribe( allCont => {
        this._allCont = allCont;
        this._waitState = false;
    });
  }

  ngOnInit() {
    particlesJS.load('particles-js', '../../assets/particles.json', null);
  }

  public dummyFn(){
    console.log("Logging dummy fn");
  }

  public fetchData(elemCode:string){
    this._waitState = true;
    this._contentService.getContent(elemCode)
      .subscribe( carData => {
        carData.youTubeUrl = carData.youTubeUrl.substr("https://www.youtube.com/embed/".length);
        this.carData = carData;
        console.log(carData.references);
        this._waitState = false;
      } );
  }

  public addReference(){
    // console.log("calling");
    // this.refSection.nativeElement.innerHTML = this.refSection.nativeElement.innerHTML + '<input class="form-control" placeholder="Enter reference URL" type="url" name="carData[references[]]" required />';
    this.carData.references.push('');
  }

  public removeReference(){
    this.carData.references.pop();
  }

  public trackByIndex(index: number, value: number) {
    return index;
  }


  public sendData(){
    if(this.modificationKey==""){
      alert("Please enter password before submitting data!");
      return;
    }
    this._sendingData = true;
    this._waitState=true;
    this._contentService.updateComponent(this.carData,this.modificationKey)
      .subscribe( resp => {
        console.log(resp);
        // this.mainForm.nativeElement.reset();
        this._sendingData = false;
        this._successMessage = `${this.carData.elemName}(${this.carData.elemCode}) component has been updated in the database`;
        this.carData = new Content();
        this._waitState=false;
        window.scrollTo(0,0);
        window.setTimeout(function(){
          this._successMessage = "";
        },5000);
      });
  }

  public deleteComp(){
    if(this.modificationKey==""){
      alert("Please enter password before submitting data!");
      return;
    }
    if(confirm(`Are you sure about deleting data about component:${this.carData.elemName}(${this.carData.elemCode})`)){
      this._sendingData = true;
      this._waitState=true;
      this._contentService.deleteComponent(this.carData.elemCode,this.modificationKey)
        .subscribe( resp => {
          console.log(resp);
          // this.mainForm.nativeElement.reset();
          this._sendingData = false;
          this._successMessage = `${this.carData.elemName}(${this.carData.elemCode}) component has been deleted from the database`;
          this.carData = new Content();
          this._allCont.splice(this._allCont.indexOf( this._allCont.find(elem => elem.elemCode == this.carData.elemCode) ),1);
          this._waitState=false;
          window.scrollTo(0,0);
          window.setTimeout(function(){
            this._successMessage = "";
          },5000);
        });
    }
  }

}
