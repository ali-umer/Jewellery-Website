"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useReviewController = (productId: number) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('Reviews')
        .select('*')
        .eq('Product_Id', productId)
        .order('created_at', { ascending: false });

      if(data) {
        setReviews(data || []);
      }

      setLoading(false);
    };

    if (productId) 
        fetchReviews();

  }, [productId]);

  return { reviews, loading };
};
