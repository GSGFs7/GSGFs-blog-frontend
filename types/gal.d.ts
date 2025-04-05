export interface GalData {
  id: number;
  vndb_id: string;
  title: string;
  title_cn?: string;
  cover_image?: string;
  vndb_rating?: number;
  character_score?: number;
  story_score?: number;
  comprehensive_score?: number;
  summary?: string; // No spoilers
  review?: string;
}

interface gal {
  id: number;
  vndb_id: string;
  title?: string;
  title_cn?: string;

  character_score?: number;
  story_score?: number;
  comprehensive_score?: number;
  vndb_rating?: number;

  created_at: string;
  update_at: string;

  summary?: string;
  review?: string;

  cover_image?: string;
}

export interface GalResponse {
  gals: gal[];
  pagination: {
    total: number;
    page: number;
    size: number;
  };
}
