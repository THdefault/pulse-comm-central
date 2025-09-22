import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Phone, 
  Mail, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Instagram,
  Facebook
} from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { StatusIndicator } from "@/components/StatusIndicator";
import heroImage from "@/assets/hero-medical-dashboard.jpg";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [userRole, setUserRole] = useState<"gerente" | "atendente" | "paciente">("gerente");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-blue-light/30 to-medical-green-light/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-blue to-medical-green flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MediChannel</h1>
                <p className="text-sm text-muted-foreground">Sistema Omnichannel Médico</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <StatusIndicator status="online" />
              <div className="flex gap-2">
                <Button 
                  variant={userRole === "gerente" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("gerente")}
                >
                  Gerente
                </Button>
                <Button 
                  variant={userRole === "atendente" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("atendente")}
                >
                  Atendente
                </Button>
                <Button 
                  variant={userRole === "paciente" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("paciente")}
                >
                  Paciente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
            <TabsTrigger value="canais">Canais</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Visão do Sistema */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Sistema Omnichannel Médico</h2>
                    <p className="text-muted-foreground mb-4">
                      Centralize todos os canais de atendimento da sua clínica em uma única plataforma. 
                      Conecte WhatsApp, Instagram, Facebook, e-mail e telefone para oferecer uma experiência 
                      unificada aos seus pacientes.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">Tempo Real</Badge>
                      <Badge variant="secondary">Multi-canal</Badge>
                      <Badge variant="secondary">Métricas Avançadas</Badge>
                      <Badge variant="secondary">Gestão de Equipe</Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={heroImage} 
                      alt="Dashboard do sistema omnichannel médico mostrando integração de múltiplos canais"
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-medical-blue to-medical-blue/80 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Atendimentos Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% desde ontem
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-medical-green to-medical-green/80 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Consultas Agendadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    96% de conversão
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">2.3min</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Meta: 3min
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Atendentes Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">8/12</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    4 em atendimento
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Canais de Comunicação */}
            <Card>
              <CardHeader>
                <CardTitle>Canais de Comunicação</CardTitle>
                <CardDescription>Status dos canais integrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-green-light/50">
                    <MessageCircle className="w-8 h-8 text-medical-green" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <Badge variant="outline" className="text-status-online border-status-online">Ativo</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-blue-light/50">
                    <Instagram className="w-8 h-8 text-medical-blue" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <Badge variant="outline" className="text-status-online border-status-online">Ativo</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-blue-light/50">
                    <Facebook className="w-8 h-8 text-medical-blue" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <Badge variant="outline" className="text-status-online border-status-online">Ativo</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-gray-light/50">
                    <Mail className="w-8 h-8 text-medical-gray" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <Badge variant="outline" className="text-status-online border-status-online">Ativo</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-gray-light/50">
                    <Phone className="w-8 h-8 text-medical-gray" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <Badge variant="outline" className="text-status-away border-status-away">Ocupado</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fila de Atendimentos */}
            <Card>
              <CardHeader>
                <CardTitle>Fila de Atendimentos</CardTitle>
                <CardDescription>Próximos atendimentos pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { nome: "Maria Silva", canal: "WhatsApp", tempo: "2min", urgencia: "alta" },
                    { nome: "João Santos", canal: "Instagram", tempo: "5min", urgencia: "media" },
                    { nome: "Ana Costa", canal: "E-mail", tempo: "8min", urgencia: "baixa" },
                  ].map((atendimento, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          atendimento.urgencia === 'alta' ? 'bg-destructive' :
                          atendimento.urgencia === 'media' ? 'bg-status-away' : 'bg-status-online'
                        }`} />
                        <div>
                          <p className="font-medium">{atendimento.nome}</p>
                          <p className="text-sm text-muted-foreground">{atendimento.canal}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Aguarda há</p>
                        <p className="font-medium">{atendimento.tempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interface de Atendimento */}
          <TabsContent value="atendimento">
            <ChatInterface userRole={userRole} />
          </TabsContent>

          {/* Métricas e Relatórios */}
          <TabsContent value="metricas">
            <MetricsDashboard />
          </TabsContent>

          {/* Configuração de Canais */}
          <TabsContent value="canais">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Canais</CardTitle>
                <CardDescription>Gerencie as integrações dos canais de comunicação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Integração com Power Apps</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Esta seção conectaria com as APIs dos canais (WhatsApp Business, Facebook, Instagram) 
                      através de conectores do Power Apps para gerenciar as integrações em tempo real.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;