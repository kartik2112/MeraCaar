import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ContentService} from '../home/content/content.service'
import { DomSanitizer } from '@angular/platform-browser';
import {Content} from '../home/content/content.model'

declare var particlesJS: any;

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.css']
})
export class ModifyContentComponent implements OnInit {
  
  private _allCodes:Array<String>;
  private _validCode:boolean=true;
  @ViewChild('ReferencesSection') refSection:ElementRef;
  private carData:Content = new Content();
  private modificationKey:string = "";
  private _sendingData:boolean = false;

  constructor(public _contentService:ContentService, private _sanitizer: DomSanitizer) {
    this._contentService.getAllCodes()
      .subscribe( _allCodes => {
          this._allCodes = _allCodes;
      });
  }

  ngOnInit() {
    particlesJS.load('particles-js', '../../assets/particles.json', null);
    
  }
  public dummyFn(){
    console.log("Logging dummy fn");
  }

  public verifyCode(newCode:string){
    console.log("Finding "+newCode);
    if(this._allCodes.indexOf(newCode)==-1){
      this._validCode = true;
      console.log("Unique code");
    }
    else{
      this._validCode = false;
      console.log("Repeated code");
    }
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
    this._sendingData = true;
    this._contentService.addNewComponent(this.carData,this.modificationKey)
      .subscribe( resp => {
        console.log(resp);
        this._sendingData = false;
      });
  }
}
