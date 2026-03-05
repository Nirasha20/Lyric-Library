import { LyricsRepository } from './LyricsRepository';
import type {
  Artist,
  Song,
  Lyrics,
  SearchResult,
  SongSortMode,
} from '@/types';

import artistsData from '@/data/mock/artists.json';
import songsData from '@/data/mock/songs.json';
import lyricsData from '@/data/mock/lyrics.json';

/* ── Typed references ──────────────────────────────────────────── */
const artists: Artist[] = artistsData as Artist[];
const songs: Song[] = songsData as Song[];
const lyrics: Record<string, Lyrics> = lyricsData as unknown as Record<
  string,
  Lyrics
>;

/** Simulated network latency for realistic loading states (ms). */
const FAKE_DELAY = 350;

const delay = (ms: number = FAKE_DELAY) =>
  new Promise<void>((r) => setTimeout(r, ms));

/* ── Mock implementation ───────────────────────────────────────── */
export class MockLyricsRepository implements LyricsRepository {
  /* Artists */
  async getArtists(): Promise<Artist[]> {
    await delay();
    return artists;
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    await delay();
    return artists.find((a) => a.id === id);
  }

  /* Songs */
  async getSongs(sort: SongSortMode = 'title'): Promise<Song[]> {
    await delay();
    const sorted = [...songs];
    switch (sort) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'genre':
        sorted.sort((a, b) => (a.genre ?? '').localeCompare(b.genre ?? ''));
        break;
      case 'recent':
        sorted.sort((a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0));
        break;
      case 'popular':
        sorted.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
    }
    return sorted;
  }

  async getSongsByArtist(artistId: string): Promise<Song[]> {
    await delay();
    return songs.filter((s) => s.artistId === artistId);
  }

  async getSongById(id: string): Promise<Song | undefined> {
    await delay();
    return songs.find((s) => s.id === id);
  }

  /* Lyrics */
  async getLyrics(songId: string): Promise<Lyrics | undefined> {
    await delay();
    return lyrics[songId];
  }

  /* Search */
  async search(query: string): Promise<SearchResult[]> {
    await delay(200);
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Search artists
    artists.forEach((artist) => {
      if (artist.name.toLowerCase().includes(q)) {
        results.push({
          id: `result-artist-${artist.id}`,
          type: 'artist',
          title: artist.name,
          subtitle: `${artist.songCount} songs`,
          referenceId: artist.id,
        });
      }
    });

    // Search songs
    songs.forEach((song) => {
      if (
        song.title.toLowerCase().includes(q) ||
        song.artistName.toLowerCase().includes(q)
      ) {
        results.push({
          id: `result-song-${song.id}`,
          type: 'song',
          title: song.title,
          subtitle: song.artistName,
          referenceId: song.id,
        });
      }
    });

    // Search lyrics
    Object.values(lyrics).forEach((lyricsEntry) => {
      const match = lyricsEntry.sections.some((section) =>
        section.lines.some((line) => line.toLowerCase().includes(q)),
      );
      if (match) {
        const song = songs.find((s) => s.id === lyricsEntry.songId);
        if (song) {
          // avoid duplicate if song was already matched by title
          const alreadyAdded = results.some(
            (r) => r.type === 'song' && r.referenceId === song.id,
          );
          if (!alreadyAdded) {
            results.push({
              id: `result-lyric-${song.id}`,
              type: 'lyrics',
              title: song.title,
              subtitle: `${song.artistName} · lyrics match`,
              referenceId: song.id,
            });
          }
        }
      }
    });

    return results;
  }
}

/** Singleton instance used throughout the app. */
export const lyricsRepository = new MockLyricsRepository();
