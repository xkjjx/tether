export interface Category {
    id: number;
    name: string;
}

export interface Person {
    id: number;
    category_id?: number;
    name: string;
}

export interface Meeting {
    id: number;
    person_id?: number;
    name: string;
    time: Date;
}

export interface OneTimeReminder {
    id: number;
    person_id?: number;
    name: string;
    time: string;
}

export interface RecurringReminder {
    id: number;
    person_id?: number;
    frequency_count: number;
    frequency_unit: string;
    frequency_start: string;
}
