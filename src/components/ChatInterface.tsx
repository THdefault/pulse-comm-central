import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  MessageCircle,
  Instagram,
  Mail,
  Clock,
  CheckCheck
} from "lucide-react";

interface ChatInterfaceProps {
  userRole: "gerente" | "atendente" | "paciente";
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userRole }) => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const conversas = [
    {
      id: 1,
      nome: "Maria Silva",
      canal: "WhatsApp",
      ultimaMensagem: "Preciso reagendar minha consulta",
      tempo: "2min",
      naoLidas: 2,
      status: "online",
      avatar: "MS"
    },
    {
      id: 2,
      nome: "João Santos",
      canal: "Instagram",
      ultimaMensagem: "Qual o horário de funcionamento?",
      tempo: "5min",
      naoLidas: 1,
      status: "away",
      avatar: "JS"
    },
    {
      id: 3,
      nome: "Ana Costa",
      canal: "E-mail",
      ultimaMensagem: "Obrigada pelo atendimento!",
      tempo: "1h",
      naoLidas: 0,
      status: "offline",
      avatar: "AC"
    }
  ];

  const mensagens = [
    {
      id: 1,
      tipo: "recebida",
      conteudo: "Olá! Preciso reagendar minha consulta de amanhã",
      horario: "14:23",
      status: "entregue"
    },
    {
      id: 2,
      tipo: "enviada",
      conteudo: "Olá Maria! Claro, vou verificar a agenda disponível para você.",
      horario: "14:24",
      status: "lida"
    },
    {
      id: 3,
      tipo: "recebida",
      conteudo: "Seria possível para a próxima semana?",
      horario: "14:25",
      status: "entregue"
    }
  ];

  const getChannelIcon = (canal: string) => {
    switch (canal) {
      case "WhatsApp": return <MessageCircle className="w-4 h-4 text-medical-green" />;
      case "Instagram": return <Instagram className="w-4 h-4 text-medical-blue" />;
      case "E-mail": return <Mail className="w-4 h-4 text-medical-gray" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aqui enviaria a mensagem
      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Lista de Conversas */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Conversas Ativas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4">
              {conversas.map((conversa, index) => (
                <div
                  key={conversa.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === index ? 'bg-medical-blue-light' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-medical-blue text-white text-xs font-medium flex items-center justify-center">
                        {conversa.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{conversa.nome}</p>
                        <div className="flex items-center gap-1">
                          {getChannelIcon(conversa.canal)}
                          <span className="text-xs text-muted-foreground">{conversa.canal}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{conversa.tempo}</p>
                      {conversa.naoLidas > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5 mt-1">
                          {conversa.naoLidas}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversa.ultimaMensagem}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Área de Chat */}
      <Card className="lg:col-span-2 flex flex-col">
        {/* Header do Chat */}
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-blue text-white font-medium flex items-center justify-center">
                {conversas[selectedChat]?.avatar}
              </div>
              <div>
                <p className="font-medium">{conversas[selectedChat]?.nome}</p>
                <div className="flex items-center gap-2">
                  {getChannelIcon(conversas[selectedChat]?.canal || "")}
                  <span className="text-sm text-muted-foreground">{conversas[selectedChat]?.canal}</span>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    Online
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Área de Mensagens */}
        <CardContent className="flex-1 flex flex-col p-4">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.tipo === 'enviada' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.tipo === 'enviada'
                        ? 'bg-medical-blue text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.conteudo}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      msg.tipo === 'enviada' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{msg.horario}</span>
                      {msg.tipo === 'enviada' && (
                        <CheckCheck className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input de Mensagem */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};