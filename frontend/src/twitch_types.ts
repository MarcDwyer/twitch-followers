export declare module TwitchLookUp {
  export interface RootLookUp {
    data: User[];
  }

  export interface User {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    followed_at: string;
  }

  export type ResolvedList = Array<TwitchLookUp.User | ErrorMsg>;

  export interface MyData {
    cursor: string;
    _total: number;
    follows: ResolvedList;
    viewing: User;
  }
}
export declare module TwitchFollowers {
  export interface RootFollowers {
    total: number;
    data: Daum[];
    pagination: Pagination;
  }

  export interface Daum {
    from_id: string;
    from_name: string;
    to_id: string;
    to_name: string;
    followed_at: string;
  }

  export interface Pagination {
    cursor: string;
  }
}

export type ErrorMsg = {
  error: string;
};

export type GeneralData = {
  user: TwitchLookUp.User;
  follows: TwitchFollowers.RootFollowers;
};
