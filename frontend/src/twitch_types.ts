export declare module TwitchData {
    export interface SubIdData {
      id: string;
      login: string;
      display_name: string;
      type: string;
      broadcaster_type: string;
      description: string;
      profile_image_url: string;
      offline_image_url: string;
      view_count: number;
    }
  
    export interface IdRoot {
      data: SubIdData[];
    }
  
    export interface Channel {
      mature: boolean;
      status: string;
      broadcaster_language: string;
      broadcaster_software: string;
      display_name: string;
      game: string;
      language: string;
      _id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
      partner: boolean;
      logo: string;
      video_banner: string;
      profile_banner?: any;
      profile_banner_background_color?: any;
      url: string;
      views: number;
      followers: number;
      broadcaster_type: string;
      description: string;
      private_video: boolean;
      privacy_options_enabled: boolean;
    }
  
    export interface ChannelData {
      created_at: Date;
      channel: Channel;
      notifications: boolean;
    }
  
    export interface RootChannel {
      _total: number;
      follows: ChannelData[];
    }
  
    export interface User {
      display_name: string;
      _id: string;
      name: string;
      type: string;
      bio?: any;
      created_at: Date;
      updated_at: Date;
      logo: string;
    }
    export interface RootUser {
      _total: number;
      users: User[];
    }
    export type ErrorMsg = {
      error: string;
    };
  }
  