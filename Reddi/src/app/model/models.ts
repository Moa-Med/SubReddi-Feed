/*ITEM*/
export interface ServerDataFull {
    data : ServerData;
}

interface ServerData {
    children : ServerChild[];
}

interface ServerChild {
    data : Item;
}

export interface Item {

    id : string;
    thumbnail : string;
    created : number;
    num_comments : number;
    author : string;
    score : number;
    permalink : string;
    title : string;
    selftext : string;
    url : string;
}
