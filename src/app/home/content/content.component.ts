import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Content} from './content.model'
import {ContentService} from './content.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit{
    
    // public _paramSub: any;
    private _data:Content;
    private _errorStr:string;
    private _videoSafeUrl:any;
    // private _sound:

    constructor(private _route:ActivatedRoute, public _contentService:ContentService, private _sanitizer: DomSanitizer){
        
    }

    public ngOnInit() {
        //Reference for fixing problem of nested subscribe
        //   https://stackoverflow.com/a/37748799/5370202
        this._route.params
        .flatMap(params => {
            var elemId:string = params['elem'];

            // console.log("Received param");
            // console.log(this);

            return this._contentService.getContent(elemId);
        })
        .subscribe( tempData => {
                // console.log("Received tempData");
                // this.updateData(tempData);
                
                if(tempData){
                    // console.log(this._data);

                    this._data = tempData;
                    this._errorStr = "";
                    
                    this._contentService.updateActiveContent(this._data);
                }
                else{
                    this._errorStr = "No such content found";
                }
        
                this._videoSafeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._data.youTubeUrl);  //Reference: https://stackoverflow.com/a/39429498/5370202
        });
    }

    public updateData(tempData:Content){
        if(tempData){
            this._data = tempData;
            this._errorStr = "";
            
            this._contentService.updateActiveContent(this._data);
        }
        else{
            this._errorStr = "No such content found";
        }

        this._videoSafeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._data.youTubeUrl);  //Reference: https://stackoverflow.com/a/39429498/5370202
    }

}