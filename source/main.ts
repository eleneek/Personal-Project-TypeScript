import {
    GradesbooksModel,
    GroupsModel,
    LMSModel,
    PupilsModel,
    SubjectsModel,
    TeachersModel,
} from ".";

import { PupilsSchema } from "./interface/pupilsSchema";
import { RecordSchema } from "./interface/recordSchema";
import { TeachersSchema } from "./interface/teachersSchema";

const teacherElena: TeachersSchema = {dateOfBirth: "10-03-2000", description: "string",
    emails: [{ email: "e.kvara@gmail.com", primary: true }],
    image: "safhjevfbh",
    name: { first: "elene", last: "kvaratskhelia" },
    phones: [{ phone: "12314253564564", primary: false }],
    sex: "female", subjects: [{ subject: "English" }],
};

const pupilElena: PupilsSchema = {dateOfBirth: "10-03-2000", description: "string",
    image: "safhjevfbh",
    name: { first: "elene", last: "kvaratskhelia" },
    phones: [{ phone: "12314253564564", primary: false }],
    sex: "female",
};

const pupilElenaUp = {description: "string", name: { first: "elene", last: "kvaratskhelia" },
    phones: [{ phone: "12314253564561", primary: false}, { phone: "12314253564569", primary: true}],
    sex: "female",
};

(async () => {
    const history = new SubjectsModel({
        description: "123", lessons: 24,  title: "History",
    });
    const biology = new SubjectsModel({
       description: "123", lessons: 24,  title: "Biology",
    });

    const LMS = new LMSModel();
    await LMS.add(history);
    await LMS.add(biology);
    const teachers = new TeachersModel();
    const teacherID = await teachers.add(teacherElena);
    const pupil = new PupilsModel();
    const pupulId = await pupil.add(pupilElena);
    // const updatePupil = await pupil.update(pupulId,pupilSchema2)
    console.log(await pupil.read(pupulId));
    const pupulId2 = await pupil.add(pupilElena);
    const group = new GroupsModel(pupil);
    const groupID = await group.add(236);
    await group.addPupil(groupID, pupilElena);

    const level = 1;
    const grade = await new GradesbooksModel(group, teachers, LMS);
    const gradebook = await grade.add(level, groupID);

    const record: RecordSchema = { pupilId: pupulId, teacherId: teacherID, subjectId: history.id, lesson: 1, mark: 9 };
    const record2: RecordSchema = { pupilId: pupulId, teacherId: teacherID, subjectId: biology.id, lesson: 2, mark: 5 };
    const record3: RecordSchema = {
        lesson: 2,
        mark: 5,
        pupilId: pupulId2,
        subjectId: biology.id,
        teacherId: teacherID,
    };
    await grade.addRecord(gradebook, record);
    await grade.addRecord(gradebook, record2);
    await grade.addRecord(gradebook, record3);

    const oliver = await grade.read(gradebook, pupulId);
    const all = await grade.readAll(gradebook);
    console.log(oliver);
})();
