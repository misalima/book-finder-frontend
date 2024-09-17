interface Book {
    id: string,
    title: string,
}

interface Status {
    id: string,
    name: string,
}


export interface IBookInList {
    book: Book,
    status: Status,
}