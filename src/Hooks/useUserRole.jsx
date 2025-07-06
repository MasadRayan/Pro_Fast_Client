import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ['userRole', user?.email],     
    queryFn: async () => {                   
      if (!user || !user.email) {
        return 'user';
      }
      const response = await axiosSecure.get(`/users/${user.email}/role`);
      return response.data.role || 'user';
    },
    enabled: !!user?.email && !authLoading,
    onError: (error) => {
      console.error('Error fetching user role:', error);
    },
  });

  return {
    role: query.data || 'user',
    roleLoading: authLoading || query.isLoading,
    error: query.error,
  };
}
