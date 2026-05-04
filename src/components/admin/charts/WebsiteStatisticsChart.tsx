
import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, MapPin, MessageSquare, Shield } from "lucide-react";

interface WebsiteStatisticsChartProps {
  stats: {
    totalPosts: number;
    totalTrips: number;
    totalContacts: number;
    totalAdmins: number;
  };
  title?: string;
}

export const WebsiteStatisticsChart = ({ 
  stats, 
  title = "Website Statistics" 
}: WebsiteStatisticsChartProps) => {
  return (
    <Card className="p-4 md:p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
        <span className="text-xs text-gray-500">Live Database Overview</span>
      </div>
      
      <div className="space-y-6">
        {/* Blog Posts */}
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-xs md:text-sm text-gray-500">Total Blog Articles</span>
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-900">{stats.totalPosts}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((stats.totalPosts / 20) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Trips */}
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-xs md:text-sm text-gray-500">Active Trip Packages</span>
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-900">{stats.totalTrips}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((stats.totalTrips / 10) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Contacts */}
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span className="text-xs md:text-sm text-gray-500">Customer Inquiries</span>
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-900">{stats.totalContacts}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((stats.totalContacts / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Admins */}
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <span className="text-xs md:text-sm text-gray-500">Registered Administrators</span>
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-900">{stats.totalAdmins}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((stats.totalAdmins / 5) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
