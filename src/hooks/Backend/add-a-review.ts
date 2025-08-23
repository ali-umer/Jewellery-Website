import { supabase } from '@/lib/supabaseClient';

interface ReviewData {
  productId: number;
  rating: number;
  reviewText: string;
}

export async function addReview({ productId, rating, reviewText }: ReviewData): Promise<boolean> {
  try {
    // Get current user data
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Error fetching user:', userError);
      return false;
    }

    // Add the review
    const { error } = await supabase
      .from('Reviews')
      .insert({
        Writer_Id:user.id,
        Product_Id: productId,
        Rating: rating,
        Text: reviewText,
      });

    if (error) {
      console.error('Error adding review:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in addReview function:', error);
    return false;
  }
}