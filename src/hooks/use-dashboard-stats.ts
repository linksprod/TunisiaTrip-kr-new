
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  totalPosts: number;
  totalTrips: number;
  totalContacts: number;
  totalAdmins: number;
  isLoading: boolean;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalTrips: 0,
    totalContacts: 0,
    totalAdmins: 0,
    isLoading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total posts
        const { count: postsCount } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true });

        // Fetch total trips
        const { count: tripsCount } = await supabase
          .from("trips")
          .select("*", { count: "exact", head: true });

        // Fetch total contacts
        const { count: contactsCount } = await supabase
          .from("contacts")
          .select("*", { count: "exact", head: true });

        // Fetch total admins
        const { count: adminsCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("is_admin", true);

        setStats({
          totalPosts: postsCount || 0,
          totalTrips: tripsCount || 0,
          totalContacts: contactsCount || 0,
          totalAdmins: adminsCount || 0,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
