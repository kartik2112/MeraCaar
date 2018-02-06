import {Component,ViewChild,ElementRef} from '@angular/core'
import {ActivatedRoute,Router} from '@angular/router'
import {Content} from './content/content.model'
import {ContentService} from './content/content.service'

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css','./home.carComps.component.css','./content/content.component.css'],
    providers: [ContentService]
})

export class HomeComponent{
    private _allCont:Array<Content>
    private dispMode:string = "Sys"
    private _paramSub:any
    private _childData:Content
    private _errorStr:string
    private _startAnim:boolean = false;
    private _searchQueryStr:string = ""

    private _audio:any

    @ViewChild('blop') blop:ElementRef
    @ViewChild('audio1') audio1:ElementRef
    // @ViewChild('car_brake') car_brake:ElementRef
    // @ViewChild('engine_rev') engine_rev:ElementRef
    // @ViewChild('differential') differential:ElementRef
    // @ViewChild('fan') fan:ElementRef

    constructor(private _route:ActivatedRoute, private _contentService:ContentService, private _router:Router){
        this._allCont = this._contentService.getAll()
    }

    public ngOnInit() {
        console.log(this._route)
        this._paramSub = this._contentService.observeActiveContent().subscribe(component => {

            if(component){
                this._childData = component;
                this._errorStr = "";
            }
            else{
                this._errorStr = "No such content found";
            }
            console.log(this._childData)

            setTimeout(() => {
                this.audio1.nativeElement.currentTime = 0;
                this.audio1.nativeElement.play();
            } , 2000 );  
            

            // if(this._childData.elemCode == 'engineRWD' || this._childData.elemCode == 'engineFWD'){
            //     this['engine_rev'].nativeElement.volume = 0.2;
            //     this['engine_rev'].nativeElement.currentTime = 0;
            //     this['engine_rev'].nativeElement.play();
            // }
            // else if(this._childData.elemCode == 'tyres'){
            //     this['car_screech'].nativeElement.currentTime = 0;
            //     this['car_screech'].nativeElement.play();
            // }
            // else if(this._childData.elemCode == 'discBrake'){
            //     this['car_brake'].nativeElement.currentTime = 1.5;
            //     this['car_brake'].nativeElement.play();
            // }
            // else if(this._childData.elemCode == 'differential'){
            //     this['differential'].nativeElement.currentTime = 0;
            //     this['differential'].nativeElement.play();
            // }
            // else if(this._childData.elemCode == 'radiator'){
            //     this['fan'].nativeElement.currentTime = 0;
            //     this['fan'].nativeElement.play();
            // }

            this.dispMode = this._childData.parentGrpName  
            setTimeout(() => {this._startAnim = true;} , 1500 );          
        })
    }

    public modifyDisplayContents(selectMode:string){        
        this._startAnim = false;
        this._router.navigate(['.'],{relativeTo: this._route});
        this.dispMode = selectMode;
    }

    public openComponent(component:string){
        if(!!this._childData && this._childData.elemCode != component){
            this._startAnim = false;
        }        
        this._router.navigate(['.',component],{relativeTo: this._route});
    }

    public playAudio(){
        // this._audio = new Audio();
        // this._audio.src = "../../assets/sounds/blop.mp3";
        // this._audio.load();
        // this._audio.play();

        this.blop.nativeElement.currentTime = 0;
        this.blop.nativeElement.play();

        // const audioElem=document.querySelector(`#audio1`);
        // //console.log(e);

        // if(!audioElem) return;

        // audioElem.currentTime=0;
        // audioElem.play();
    }

    public updateSearchQuery(eve:string){
        // console.log(eve)
        this._searchQueryStr = eve
    }
}