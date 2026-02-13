export interface MusicMetadata {
  src: string;
  album?: string;
  artist?: string;
  bitrate?: number;
  coverData?: string;
  coverMimeType?: string;
  duration?: number; // s
  sampleRate?: number;
  size?: number; // Bytes
  title?: string;
  isMetadataReady: boolean;
}
