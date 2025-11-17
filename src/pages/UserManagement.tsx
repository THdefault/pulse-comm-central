import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'patient' | 'attendant' | 'manager';
}

interface UserWithRole extends UserProfile {
  roles: UserRole[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkIfManager();
  }, [user]);

  useEffect(() => {
    if (isManager) {
      fetchUsers();
    }
  }, [isManager]);

  const checkIfManager = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'manager')
      .maybeSingle();

    if (error || !data) {
      toast({
        title: 'Acesso negado',
        description: 'Apenas gerentes podem acessar esta página',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    setIsManager(true);
  };

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      const usersWithRoles = profiles.map(profile => ({
        ...profile,
        roles: roles.filter(role => role.user_id === profile.id),
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      toast({
        title: 'Erro ao carregar usuários',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'patient' | 'attendant' | 'manager') => {
    try {
      // Delete existing roles
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast({
        title: 'Role atualizado',
        description: 'O perfil do usuário foi atualizado com sucesso',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar role',
        description: 'Não foi possível atualizar o perfil do usuário',
        variant: 'destructive',
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'manager':
        return 'default';
      case 'attendant':
        return 'secondary';
      case 'patient':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'manager':
        return 'Gerente';
      case 'attendant':
        return 'Atendente';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Gerenciamento de Usuários</h1>
                  <p className="text-sm text-muted-foreground">Gerencie perfis e permissões</p>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários Cadastrados
            </CardTitle>
            <CardDescription>
              Total de {users.length} usuário{users.length !== 1 ? 's' : ''} no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((userProfile) => {
                const currentRole = userProfile.roles[0]?.role || 'patient';
                
                return (
                  <div
                    key={userProfile.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold">
                        {userProfile.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{userProfile.full_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Cadastrado em {new Date(userProfile.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={getRoleBadgeVariant(currentRole)}>
                        {getRoleLabel(currentRole)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      {userProfile.id === user?.id ? (
                        <Badge variant="outline" className="text-xs">
                          Você
                        </Badge>
                      ) : (
                        <Select
                          value={currentRole}
                          onValueChange={(value) =>
                            handleRoleChange(userProfile.id, value as 'patient' | 'attendant' | 'manager')
                          }
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Paciente</SelectItem>
                            <SelectItem value="attendant">Atendente</SelectItem>
                            <SelectItem value="manager">Gerente</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sobre os Perfis
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><strong>Gerente:</strong> Acesso completo ao sistema, incluindo gerenciamento de usuários e métricas</li>
            <li><strong>Atendente:</strong> Pode responder mensagens e visualizar histórico de atendimentos</li>
            <li><strong>Paciente:</strong> Pode enviar mensagens e visualizar seu próprio histórico</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
