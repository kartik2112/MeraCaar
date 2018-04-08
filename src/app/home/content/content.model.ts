export class Content{
    public elemCode:string;
    public parentGrpName: string;
    public elemName: string;
    public anchorDisplay: boolean;

    public youTubeUrl: string;
    public sampleImageUrl: string;
    public explanation: string;
    public references: Array<string>;

    public arrow_tail_path_d: string;
    public arrow_head_path_d: string;

    public soundUrl:string;

    public constructor(){
        this.elemCode = this.parentGrpName = this.elemName = this.youTubeUrl = this.sampleImageUrl = this.explanation = this.arrow_head_path_d = this.arrow_tail_path_d = "";
        this.anchorDisplay = true;
        this.references = [];
    }
}