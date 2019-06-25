import {generateID} from "./generateId";
import {PupilsSchema} from "./interface/pupilsSchema";

export class PupilsModel {
    public pupils: Map<string, PupilsSchema>;

    constructor() {
        this.pupils = new Map();
    }

    public async add(pupil: PupilsSchema) {
        // Validator.validate(pupil,pupilsSchema)
        const id = generateID();
        this.pupils.set(id, pupil);

        return id;
    }

    public async read(id: string) {
        return this.pupils.get(id);
    }

    public async update(id: string, pupil: object) {
        // Validator.validate(pupil,pupilsSchema,true)
        return this.pupils.set(id, pupil);
    }

    public async remove(id: string) {
        this.pupils.delete(id);
    }

}
