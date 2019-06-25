import {generateID} from "./generateId";
import { GroupsModel } from "./GroupsModel";
import {RecordSchema} from "./interface/recordSchema";
import { LMSModel } from "./LMSModel";
import { TeachersModel } from "./TeachersModel";

interface Gradebook {
    level: number;
    groupID: string;
    records: RecordSchema[];
}

class GradesbooksModel {
    public gradeBook: Map<string, Gradebook>;
    public groups: GroupsModel;
    public teachers: TeachersModel;
    public LMS: LMSModel;

    constructor(groups: GroupsModel, teachers: TeachersModel, LMS: LMSModel) {
        this.gradeBook = new Map();
        this.groups = groups;
        this.teachers = teachers;
        this.LMS = LMS;
    }

    public async add(level: number, groupID: string) {
        if ( !level || typeof level !== "number" ) {
            throw new Error("Level should be a Number!");
        }
        const id = generateID();
        this.gradeBook.set( id, { level, groupID, records: [] });

        return id;
    }

    public async clear() {
        return this.gradeBook.clear();
    }

    public async addRecord(id: string, record: RecordSchema) {
        if (this.gradeBook.has(id)) {
            const grade = this.gradeBook.get(id);
            if (grade) {
                grade.records.push(record);
            }
        }
        // Validator.validate(record,schemaRecord)
    }

    public async read(id: string, pupil: string) {

        let records;
        if (this.gradeBook.has(id)) {
            const grade = this.gradeBook.get(id);

            if (grade) {
                records = grade.records.filter((record) => record.pupilId === pupil);
            } else {
                throw new Error("Grade is undefined!");
            }
        }

        if (!this.groups) {
            throw new Error("Group does not exist");
        }

        if (this.groups.pupil) {
            if (records) {
                if (records[0].pupilId) {
                    let pupilR = await this.groups.pupil.read(records[0].pupilId);
                    if (pupilR && pupilR.name) {
                        const { name: { first, last } } = pupilR;
                        pupilR = await this.groups.pupil.read(records[0].pupilId);
                        const result: {name: string, records: object[]} = {
                            name: `${first} ${last}`,
                            records: [],
                        };
                        for (const { teacherId, subjectId, lesson, mark } of records) {
                            if (!teacherId) {
                                throw new Error("Teacher ID was not found!");
                            }
                            const { name: teacherName } = await this.teachers.read(teacherId);

                            if (!teacherName) {
                                throw new Error("Name is missing");
                            }

                            if (!teacherName.first) {
                                throw new Error("Firstname is missing");
                            }
                            const firstname = teacherName.first;

                            if (!teacherName.last) {
                                throw new Error("Lastname is missing");
                            }

                            const lastname = teacherName.last;

                            if (!subjectId) {
                                throw new Error("Subject ID was not found!");
                            }
                            const LMSData = await this.LMS.read(subjectId);
                            if (!LMSData) {
                                throw new Error("NO data");
                            }
                            const subject = LMSData.title;

                            result.records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
                        }
                        return result;
                    }

                }
            }
        } else {
            return [];
        }

    }

    public async readAll(id: string) {

        let records;

        if (this.gradeBook.has(id)) {
            const grade = this.gradeBook.get(id);
            if (grade) {
                 records = grade.records;
            }
        } else {
            throw  new Error("Grade is undefined!");
        }

        const result = new Map();

        if (!records) {
            return [];
        }
        for (const { pupilId, teacherId, subjectId, lesson, mark } of records) {

            if (!result.has(pupilId)) {
                if (!records) {
                    throw new Error("Record was not found!");
                }

                if (!records[0].pupilId) {
                    throw new Error("Pupil Id is not in the Records!");
                }

                let pupil = await this.groups.pupil.read(records[0].pupilId);
                if (pupil && pupil.name) {
                    const { name: { first, last } } = pupil;
                    pupil = await this.groups.pupil.read(records[0].pupilId);
                }
                if (!teacherId) {
                    throw new Error("Teacher ID was not Found!");
                }

                if (!subjectId) {
                    throw new Error("Subject ID was not Found!");
                }
                const { name: tname } = await this.teachers.read(teacherId);

                if (!tname) {
                    throw new Error("name was not found!");
                }

                if (!tname.first) {
                    throw new Error ("Firstname was not found!");
                }

                const fName = tname.first;

                if (!tname.last) {
                    throw new Error("Lastname was not found!");
                }

                const fLast = tname.last;
                const LMSData = await this.LMS.read(subjectId);
                if (!LMSData) {
                    throw new Error("NO data");
                }
                const subject = LMSData.title;
                result.get(pupilId).records.push({ teacher: `${fName} ${fLast}`, subject, lesson, mark });
                return Array.from(result.values());
        }   }
    }

}

export { GradesbooksModel };
