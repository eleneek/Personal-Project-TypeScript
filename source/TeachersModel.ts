import {generateID} from "./generateId";
import {TeachersSchema} from "./interface/teachersSchema";

class TeachersModel {
   public  teachers: Map<string, TeachersSchema>;

    constructor() {
        this.teachers = new Map();
    }

    public async add(teacher: TeachersSchema) {
        // Validator.validate(teacher,teacherSchema)
        const id = generateID();
        this.teachers.set(id, teacher);
        return id;
    }
    // changed  any to  object
    public async read(id: string): Promise<TeachersSchema> {
        return {id, ...this.teachers.get(id)};
    }

    public async update(id: string, teacher: TeachersSchema) {
        // Validator.validate(teacher,teacherSchema,true)
        return this.teachers.set(id, teacher);
    }

    public async  remove(id: string) {
        this.teachers.delete(id);
    }

}

export {TeachersModel};
