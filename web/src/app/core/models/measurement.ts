export class Measurement {
    _id: string;
    type: string;
    createdAt: Date;
    constructor(_id: string, type: string, createdAt: Date){ 
        this._id = _id;
        this.type = type;
        this.createdAt = createdAt;
    }
}