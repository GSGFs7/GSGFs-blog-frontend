export interface vndbAuthInfo {
  id: string;
  permissions: string[];
  username: string;
}

export interface vndbStatistics {
  vn: number;
  chars: number;
  tags: number;
  releases: number;
  staff: number;
  producers: number;
  traits: number;
}

interface VNTitle {
  lang: string;
  title: string;
}

export interface vndbVNQuery {
  more: boolean;
  results: [
    {
      alttitle: string; // official title
      rating: number;
      title: string;
      titles: VNTitle[];
      image: {
        url: string;
      };
      id: string;
    },
  ];
}
