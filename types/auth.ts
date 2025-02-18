export interface sessionType {
  id?: number;
  name?: string;
  avatar_url?: string;
  provider?: string;
  iat?: number;
  exp?: number;
}

export interface githubResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  notification_email: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

type ProfileOrderType = Array<
  | "me"
  | "recent_activity"
  | "beatmaps"
  | "historical"
  | "kudosu"
  | "top_ranks"
  | "medals"
>;

export interface osuResponse {
  cover_url: string;
  discord?: string;
  has_supported: boolean;
  interests: string;
  join_date: string;
  location: string;
  max_blocks: number;
  max_friends: number;
  occupation?: string;
  playmode: "osu" | "mania" | "taiko" | "fruits";
  playstyle: string[]; // Device choices of the user.
  post_count: number; // Number of forum posts
  profile_hue?: number; // Custom colour hue in HSL degrees (0–359).
  profile_order: ProfileOrderType; // ordered array of sections in user profile page
  title?: string; // user-specific title
  title_url?: string;
  twitter?: string;
  website?: string;
}
