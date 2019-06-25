import {generateID} from "./generateId";
import {SubjectsSchema} from "./interface/subjectsSchema";
class SubjectsModel {
    public title?: string;
    public lessons: number;
    public description?: string;
    public id: string;

    public allSubjects: SubjectsSchema;
    constructor(subject: SubjectsSchema) {
        this.id = generateID();
        this.title = subject.title;
        this.lessons = subject.lessons;
        this.description = subject.description;
    }

}

export { SubjectsModel };
