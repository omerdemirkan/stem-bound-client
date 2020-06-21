export interface IClassOriginal {
    type: string;
    roomNum: string;
    start: Date;
    end: Date;
    message: string;
}

export interface IClass {
    type: string;
    roomNum: string;
    start: Date;
    end: Date;
    message: string;
}

export interface ICourseOriginal {
    topic: string;
    shortDescription: string;
    longDescription: string;
    type: string;
    schedule: {
        classes: any[];
    };
    meta: {
        instructors: string[];
        students: string[];
        school: string;
    };
}

export interface ICourse {
    topic: string;
    shortDescription: string;
    longDescription: string;
    type: {
        original: string;
        display: string;
    };
    schedule: {
        classes: any[];
    };
    meta: {
        instructors: string[];
        students: string[];
        school: string;
    };
}
