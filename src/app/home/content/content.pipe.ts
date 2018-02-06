import {Pipe, PipeTransform} from '@angular/core'
import {Content} from './content.model'

@Pipe({
    name: 'searchContentPipe',
    pure: true
})

export class searchContentPipe implements PipeTransform{
    transform(comps:Array<Content>, searchQuery:string){
        if(searchQuery==""){
            return comps;
        }
        let tempComp = comps.filter( comp => {
            // console.log(searchQuery)
            return comp.elemName.toLowerCase().indexOf(searchQuery.toLowerCase())!=-1;
        } );
        // console.log(tempComp)

        return tempComp
    }

}