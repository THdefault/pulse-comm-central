import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  MessageSquare,
  CheckCircle,
  Star,
  BarChart3
} from "lucide-react";

export const MetricsDashboard = () => {
  const metricas = {
    atendimentosHoje: 247,
    tempoMedioResposta: 2.3,
    taxaConversao: 96,
    satisfacaoCliente: 4.8,
    atendentesOnline: 8,
    totalAtendentes: 12
  };

  const performanceAtendentes = [
    { nome: "Ana Silva", atendimentos: 45, tempoMedio: 1.8, satisfacao: 4.9, status: "online" },
    { nome: "Carlos Santos", atendimentos: 38, tempoMedio: 2.1, satisfacao: 4.7, status: "online" },
    { nome: "Maria Costa", atendimentos: 42, tempoMedio: 2.5, satisfacao: 4.6, status: "busy" },
    { nome: "João Oliveira", atendimentos: 35, tempoMedio: 1.9, satisfacao: 4.8, status: "online" }
  ];

  const canaisDesempenho = [
    { canal: "WhatsApp", volume: 45, conversao: 98, crescimento: 12 },
    { canal: "Instagram", volume: 28, conversao: 89, crescimento: 8 },
    { canal: "Facebook", volume: 22, conversao: 92, crescimento: -3 },
    { canal: "E-mail", volume: 18, conversao: 85, crescimento: 5 },
    { canal: "Telefone", volume: 12, conversao: 94, crescimento: -8 }
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Atendimentos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metricas.atendimentosHoje}</div>
              <div className="flex items-center gap-1 text-medical-green">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Meta: 300 atendimentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metricas.tempoMedioResposta}min</div>
              <div className="flex items-center gap-1 text-medical-green">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Ótimo</span>
              </div>
            </div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Meta: 3min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metricas.taxaConversao}%</div>
              <div className="flex items-center gap-1 text-medical-green">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">+4%</span>
              </div>
            </div>
            <Progress value={96} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Consultas agendadas: 89</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance dos Atendentes */}
      <Card>
        <CardHeader>
          <CardTitle>Performance dos Atendentes</CardTitle>
          <CardDescription>Ranking de desempenho da equipe hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceAtendentes.map((atendente, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-medical-blue text-white text-sm font-medium flex items-center justify-center">
                    {atendente.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{atendente.nome}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={atendente.status === 'online' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {atendente.status === 'online' ? 'Online' : 'Ocupado'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{atendente.atendimentos}</p>
                    <p className="text-muted-foreground">Atendimentos</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{atendente.tempoMedio}min</p>
                    <p className="text-muted-foreground">Tempo Médio</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{atendente.satisfacao}</span>
                    </div>
                    <p className="text-muted-foreground">Satisfação</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance por Canal */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Canal</CardTitle>
          <CardDescription>Análise de volume e conversão por canal de comunicação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {canaisDesempenho.map((canal, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-medical-blue-light flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-medium">{canal.canal}</p>
                    <p className="text-sm text-muted-foreground">{canal.volume}% do volume total</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{canal.conversao}%</p>
                    <p className="text-muted-foreground">Conversão</p>
                  </div>
                  <div className="text-center">
                    <div className={`flex items-center gap-1 ${
                      canal.crescimento > 0 ? 'text-medical-green' : 'text-destructive'
                    }`}>
                      {canal.crescimento > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="font-medium">{Math.abs(canal.crescimento)}%</span>
                    </div>
                    <p className="text-muted-foreground">Crescimento</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relatório de Satisfação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Satisfação do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-green mb-2">{metricas.satisfacaoCliente}/5.0</div>
              <p className="text-muted-foreground mb-4">Média baseada em 156 avaliações</p>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm w-6">{star}★</span>
                    <Progress value={star === 5 ? 78 : star === 4 ? 18 : star === 3 ? 3 : star === 2 ? 1 : 0} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-8">
                      {star === 5 ? '78%' : star === 4 ? '18%' : star === 3 ? '3%' : star === 2 ? '1%' : '0%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-medical-blue" />
              Distribuição da Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Atendentes Online</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-online"></div>
                  <span className="font-medium">{metricas.atendentesOnline}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Em Atendimento</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-busy"></div>
                  <span className="font-medium">4</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Disponível</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-away"></div>
                  <span className="font-medium">4</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Offline</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-offline"></div>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};