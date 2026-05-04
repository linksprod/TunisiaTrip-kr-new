
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserPlus, Trash2, Shield, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

interface AdminProfile {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_admin", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error: any) {
      console.error("Error fetching admins:", error);
      toast({
        title: "Error fetching admins",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Sign up the new user
      // We use a temporary client to avoid logging out the current admin
      const tempSupabase = createClient(
        (supabase as any).supabaseUrl,
        (supabase as any).supabaseKey,
        { auth: { persistSession: false } }
      );

      const { data: signUpData, error: signUpError } = await tempSupabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (signUpData.user) {
        // Step 2: Set as admin in profiles table
        // Note: The profile should be created automatically by a trigger
        // If not, we might need to wait or insert it manually
        
        // Wait a bit for the trigger to fire
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { error: profileError } = await supabase
          .from("profiles")
          .update({ is_admin: true })
          .eq("id", signUpData.user.id);

        if (profileError) {
          // If update failed, maybe profile wasn't created yet? 
          // Let's try upsert
          const { error: upsertError } = await supabase
            .from("profiles")
            .upsert({ 
              id: signUpData.user.id, 
              email: email, 
              is_admin: true,
              updated_at: new Date().toISOString()
            });
          
          if (upsertError) throw upsertError;
        }

        toast({
          title: "Admin added successfully",
          description: `${email} is now an administrator.`
        });

        // Reset form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        fetchAdmins();
      }
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast({
        title: "Failed to add admin",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAdmin = async (adminId: string, adminEmail: string) => {
    if (!window.confirm(`Are you sure you want to remove ${adminEmail} from administrators?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: false })
        .eq("id", adminId);

      if (error) throw error;

      toast({
        title: "Admin removed",
        description: `${adminEmail} is no longer an administrator.`
      });

      fetchAdmins();
    } catch (error: any) {
      console.error("Error removing admin:", error);
      toast({
        title: "Failed to remove admin",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fadeIn">
        <AdminHeader 
          title="Admin Management" 
          description="Add, view, and manage system administrators."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Admin Form */}
          <Card className="p-6 lg:col-span-1 shadow-sm border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus className="text-admin-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">Add New Administrator</h3>
            </div>
            
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="admin@tunisiatrip.kr" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock size={14} /> Password
                </label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Shield size={14} /> Confirm Password
                </label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-admin-primary hover:bg-admin-accent text-white mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</>
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </form>
          </Card>

          {/* Admin List */}
          <Card className="lg:col-span-2 overflow-hidden shadow-sm border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="text-admin-primary h-5 w-5" />
                Current Administrators
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><div className="h-4 w-48 bg-gray-100 animate-pulse rounded" /></TableCell>
                        <TableCell><div className="h-4 w-16 bg-gray-100 animate-pulse rounded" /></TableCell>
                        <TableCell><div className="h-4 w-24 bg-gray-100 animate-pulse rounded" /></TableCell>
                        <TableCell className="text-right"><div className="h-8 w-8 bg-gray-100 animate-pulse rounded ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : admins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No administrators found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    admins.map((admin) => (
                      <TableRow key={admin.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{admin.email}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700 border-none">Administrator</Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          {new Date(admin.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManagementPage;
