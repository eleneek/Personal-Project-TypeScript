import {generateID} from "./generateId";
import { PupilsModel } from "./PupilsModel";

interface GroupInterface {
    id?: string;
    room: number;
    students: Set<object>;
}
class GroupsModel {
    public pupil: PupilsModel;
    public groups: Map<string, GroupInterface>;
    public students: Set<object>;
    constructor(pupil: PupilsModel) {
        this.groups = new Map();
        this.pupil = pupil;
    }

    public  newerror(id: string) {
        if (!this.groups.has(id)) {
            throw new Error("There is no user with this id !");
        }
    }

    public iderror() {
        throw new Error("There is no such id !");
    }

    public async add(room: number) {

        const id = generateID();
        this.groups.set(id, { room, students: new Set() });

        return id;
    }

    public async read(id: string): Promise<GroupInterface> {
        this.newerror(id);
        const prevGroup: GroupInterface | undefined = this.groups.get(id);
        return Object.assign(prevGroup, {id});
    }

    public async remove(id: string) {
        this.newerror(id);

        this.groups.delete(id);
    }

    public async update(id: string, room: number) {
        this.newerror(id);
        const prevGroup = await this.read(id);
        const updatedGroup = {
            ...prevGroup,
            room,
        };
        this.groups.set(id, updatedGroup);
    }

    public async readAll() {
        const result: object[] = [];
        this.groups.forEach(({...group}, id: string) => {
            const students = Array.from(group.students);
            const rooms = group.room;
            result.push({ id, students, rooms });
        });

        return result;
    }

    public async addPupil(id: string, pupli: object) {
        if ( this.groups.has(id) ) {
            const groupId = this.groups.get(id);
            if (groupId) {
                groupId.students.add(pupli);
            }
        } else { this.iderror(); }
    }

    public async removePupil(id: string, pupli: object) {
        if ( this.groups.has(id) ) {
            const groupId = this.groups.get(id);
            if (groupId) {
                groupId.students.add(pupli);
            }
        } else { this.iderror(); }
    }
}

export { GroupsModel };
