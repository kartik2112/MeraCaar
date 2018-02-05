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
    
    private _paramSub: any;
    private _data:Content;
    private _errorStr:string;
    private _videoSafeUrl:any

    constructor(private _route:ActivatedRoute, private _contentService:ContentService, private _sanitizer: DomSanitizer){
        
    }

    public ngOnInit() {
        this._paramSub = this._route.params.subscribe(params => {
            var elemId:string = params['elem'];

            // this._contentService.getContent(elemId)
            // .then(comp => this._data = comp)
            // .catch(err => this._errorStr = err);

            let tempData = this._contentService.getContent(elemId);
            if(tempData){
                this._data = tempData;
                this._errorStr = "";
                this._contentService.updateActiveContent(this._data);
            }
            else{
                this._errorStr = "No such content found";
            }

            this._videoSafeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._data.youTubeUrl);  //Reference: https://stackoverflow.com/a/39429498/5370202
        })
    }

}