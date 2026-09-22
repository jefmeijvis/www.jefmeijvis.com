export type BlogpostSummary = {
    id: number;
    title: string;
    path: string;
    description: string;
    date: string;
    category: string;
    published: boolean;
    views?: number;
};

export type Blogpost = BlogpostSummary & {
    html: string;
};
