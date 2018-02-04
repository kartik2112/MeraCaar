import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Content} from './content.model'
import {ContentService} from './content.service'

@Component({
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    providers: [ContentService]
})

export class ContentComponent implements OnInit{
    
    private _paramSub: any;
    private _data:Content;
    private _errorStr:string;

    constructor(private _route:ActivatedRoute, private _contentService:ContentService){
        
    }

    public ngOnInit() {
        this._paramSub = this._route.params.subscribe(params => {
            var elemId:string = params['elem'];

            this._contentService.getContent(elemId)
            .then(comp => this._data = comp)
            .catch(err => this._errorStr = err);
        })
    }

}