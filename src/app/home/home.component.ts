import {Component} from '@angular/core'
import {ActivatedRoute,Router} from '@angular/router'
import {Content} from './content/content.model'
import {ContentService} from './content/content.service'

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css','./home.carComps.component.css'],
    providers: [ContentService]
})

export class HomeComponent{
    private dispMode:string = "Sys"
    private _paramSub:any
    private _childData:Content
    private _errorStr:string
    private _startAnim:boolean = true;

    constructor(private _route:ActivatedRoute, private _contentService:ContentService, private _router:Router){
        
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

            this.dispMode = this._childData.parentGrpName            
        })
    }

    public modifyDisplayContents(selectMode:string){
        this._startAnim = false;
        this._router.navigate(['.'],{relativeTo: this._route});
        this.dispMode = selectMode;
    }

    public openComponent(component:string){
        this._startAnim = false;
        setTimeout(() => {this._startAnim = true;} , 1500 );
        this._router.navigate(['.',component],{relativeTo: this._route});
    }
}