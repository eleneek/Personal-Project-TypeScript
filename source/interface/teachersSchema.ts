export interface TeachersSchema {
    id?: string;
    name?: {
        first: string;
        last: string;
    };
    image?: string;
    dateOfBirth?: string;
    emails?: [
        {
        email: string;
        primary: boolean;
        }
    ];
    phones?: [
        {
        phone: string;
        primary: boolean;
        }
    ];
    sex?: string;
    subjects?: [
        {
        subject: string;
        }
    ];
    description?: string;
}
