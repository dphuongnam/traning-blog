interface IBlog {
    id: number;
    content: string;
    author: string;
    title: string;
    image: string;
    categories: ICategory[];
}

interface ICategory {
    idCate: number;
    title: string;
}
