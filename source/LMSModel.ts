import { SubjectsModel } from "./SubjectsModel";

export class LMSModel {
    private subjects: Map<string, SubjectsModel>;
    constructor() {
        this.subjects = new Map<string, SubjectsModel>();
    }

    public async add(subject: SubjectsModel) {
        this.subjects.set(subject.id, subject);
    }

    public async remove(id: string) {
        this.subjects.delete(id);
    }

    public async verify(id: string) {
        return this.subjects.has(id);
    }

    public async read(id: string) {
        return  this.subjects.get(id);
    }

    public async readAll() {
        return Array.from(this.subjects).map(([key]) => key);
    }

}
