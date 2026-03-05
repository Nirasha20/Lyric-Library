import { useQuery } from '@tanstack/react-query';
import { lyricsRepository } from '@/services';
import type { SongsQueryParams } from '@/types';

/** Fetch all songs with optional sort. */
export const useSongs = (params: SongsQueryParams = {}) =>
  useQuery({
    queryKey: [
      'songs',
      params.sort ?? 'title',
      params.query ?? '',
      params.artistId ?? '',
      params.albumId ?? '',
      params.genre ?? '',
    ],
    queryFn: () => lyricsRepository.getSongs(params),
  });

/** Fetch songs for a specific artist. */
export const useSongsByArtist = (artistId: string) =>
  useQuery({
    queryKey: ['songs', 'artist', artistId],
    queryFn: () => lyricsRepository.getSongsByArtist(artistId),
    enabled: !!artistId,
  });
