export interface QueryFilters {
    search?: string,
    type?: string,
    orderBy?: OrderByValues,
    orderByDirection?: OrderByDirection,
    page?: number,
    pageSize?: number
}

export enum OrderByValues {
    DEFAULT = 0,
    NAME = 1,
    AUTHOR = 2,
    DATE = 3
}

export enum OrderByDirection {
    DEFAULT = 0,
    ASC = 1,
    DESC = 2
}
