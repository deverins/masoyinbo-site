"use client";
import { API_URL } from '@/constants/api';
import { Episode } from '@/types';
import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import EpisodeCollection from './EpisodeCollection';
import Loading from '../UI/Loading';
import Custom500 from '@/app/(homepage)/error-page/Error';

const AllEpisodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchEpisodes = useCallback(async () => {
    if (totalPages && page > totalPages) return;

    try {
      setIsFetching(true);
      const { data } = await axios.get(`${API_URL}/api/episodes`, {
        params: { page, limit: 8 },
      });

      const { episodes: newEpisodes, totalPages: fetchedTotalPages } = data;

      // Remove duplicates by filtering for unique episode IDs
      setEpisodes((prevEpisodes) => {
        const uniqueEpisodes = [
          ...prevEpisodes,
          ...newEpisodes.filter(
            (episode: Episode) => !prevEpisodes.some((prev) => prev._id === episode._id)
          ),
        ];
        return uniqueEpisodes;
      });

      setPage((prevPage) => prevPage + 1);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Failed to fetch episodes');
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, [page, totalPages]);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  // Set up the intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isFetching) {
          fetchEpisodes();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchEpisodes, loading, isFetching]);


  if (error) return <Custom500 />;
  if (loading && episodes.length === 0) return <Loading />;

  return (
    <div className="mt-14 pb-5 mx-2">
      <h2 className="text-2xl font-bold mb-9 dark:text-neutral-400 text-center">All Episodes</h2>
      <EpisodeCollection episodes={episodes} />
      {loading && <Loading />}
      {/* Observer target element */}
      <div ref={observerRef} style={{ height: '20px' }} />
    </div>
  );
};

export default AllEpisodes;