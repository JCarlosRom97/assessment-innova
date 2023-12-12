
export interface UserInterface {
    user:{
        id: number,
        name: string
    }
}

export interface UserReduxInterface  {
    users:{
        data:[]
    }
}

export type RootStackParamList = {
    AlbumDetail: { id: number, title: string } | undefined;
  };

export type ParamList = {
    AlbumDetail: {
        id: number;
        title: string; 
    };
};