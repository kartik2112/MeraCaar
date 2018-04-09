import {Component,ViewChild,ElementRef,ChangeDetectorRef,ViewEncapsulation } from '@angular/core'
import {ActivatedRoute,Router} from '@angular/router'
import {Content} from './content/content.model';
import {ContentPartial} from './content/contentPartial.model';
import {ContentService} from './content/content.service'

declare var particlesJS: any;

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css','./home.carComps.component.css','./content/content.component.css','../app.component.css']    
})

export class HomeComponent{
    private _allCont:Array<ContentPartial>
    private dispMode:string = "Sys";
    private _domainName:string;
    // private _paramSub:any
    private _childData:Content
    private _errorStr:string
    private _startAnim:boolean = false;
    private _searchQueryStr:string = "";
    private _waitState = true;

    private _audio:any

    @ViewChild('blop') blop:ElementRef
    @ViewChild('audio1') audio1:ElementRef
    // @ViewChild('car_brake') car_brake:ElementRef
    // @ViewChild('engine_rev') engine_rev:ElementRef
    // @ViewChild('differential') differential:ElementRef
    // @ViewChild('fan') fan:ElementRef

    constructor(private _route:ActivatedRoute, private _contentService:ContentService, private _router:Router, private cdr:ChangeDetectorRef ){
        // this._allCont = this._contentService.getAll()
        this._waitState = true;
        this._contentService.prefetchBasicAllUnique()
            .subscribe( allCont => {
                this._allCont = allCont;
                this._waitState = false;
            });
        this._domainName = this._contentService._domainName;
    }

    public ngOnInit() {
        // console.log(this._route)
        particlesJS.load('particles-js', '../../assets/particles.json', null);
        this._waitState = true;
        this._contentService.observeActiveContent()
            .subscribe(component => {

                if(component){
                    this._childData = component;
                    this._errorStr = "";
                }
                else{
                    this._errorStr = "No such content found";
                }
                // console.log(this._childData)

                setTimeout(() => {
                    this.audio1.nativeElement.currentTime = 0;
                    this.audio1.nativeElement.play();
                } , 500 );  
                
                this.dispMode = this._childData.parentGrpName;
                // setTimeout(() => {this._startAnim = true;} , 100 );          
                this._startAnim = true;
                this._waitState = false;
            });
        this.cdr.detectChanges();  //Reference: https://stackoverflow.com/a/35243106/5370202
    }

    public modifyDisplayContents(selectMode:string){
        this._startAnim = false;
        this._router.navigate(['.'],{relativeTo: this._route});
        this.dispMode = selectMode;
    }

    public openComponent(component:string){
        if(!!this._childData && this._childData.elemCode != component){
            this._startAnim = false;
            this._waitState = true;
            console.log("waitState made ",this._waitState);
        }        
        this._router.navigate(['.',component],{relativeTo: this._route});
        return false;
    }

    public playAudio(){
        // this._audio = new Audio();
        // this._audio.src = "../../assets/sounds/blop.mp3";
        // this._audio.load();
        // this._audio.play();

        this.blop.nativeElement.currentTime = 0;
        this.blop.nativeElement.play();

        // const audioElem=document.querySelector(`#audio1`);
        // console.log(e);

        // if(!audioElem) return;

        // audioElem.currentTime=0;
        // audioElem.play();
    }

    public updateSearchQuery(eve:string){
        // console.log(eve)
        this._searchQueryStr = eve
    }
}