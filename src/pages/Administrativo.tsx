
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, Search, UserPlus, FileText, UserCheck, 
  FileUp, Mic, Send, Mail, Phone, Calendar
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Administrativo = () => {
  const { t } = useTranslation();
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t('administrative.title')}</h1>
            <p className="text-gray-500">{t('administrative.subtitle')}</p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <UserPlus size={18} className="mr-2" /> {t('administrative.newMember')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link to="/administrativo/membros" className="dashboard-card flex items-start group">
            <div className="mr-4 bg-church-light p-3 rounded-lg text-church-primary">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('administrative.members')}</h3>
              <p className="text-gray-500 mt-1 text-sm">{t('administrative.membersDescription')}</p>
            </div>
          </Link>
          
          <Link to="/administrativo/calendario" className="dashboard-card flex items-start group">
            <div className="mr-4 bg-church-light p-3 rounded-lg text-church-primary">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('administrative.events')}</h3>
              <p className="text-gray-500 mt-1 text-sm">{t('administrative.eventsDescription')}</p>
            </div>
          </Link>
          
          <Link to="/administrativo/comunicados" className="dashboard-card flex items-start group">
            <div className="mr-4 bg-church-light p-3 rounded-lg text-church-primary">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('administrative.communications')}</h3>
              <p className="text-gray-500 mt-1 text-sm">{t('administrative.communicationsDescription')}</p>
            </div>
          </Link>
        </div>

        <Tabs defaultValue="membros" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="membros">Membros</TabsTrigger>
            <TabsTrigger value="atas">Atas</TabsTrigger>
            <TabsTrigger value="comunicados">Comunicados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="membros" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Membros da Igreja</CardTitle>
                    <CardDescription>Cadastre e gerencie todos os membros</CardDescription>
                  </div>
                  <div className="flex w-full md:w-auto space-x-2">
                    <div className="relative flex-grow md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Buscar membro..."
                        className="pl-8"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <UserCheck size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nome</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contato</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data de Cadastro</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">João Silva</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs flex items-center">
                                <Mail size={12} className="mr-1" /> joao.silva@email.com
                              </span>
                              <span className="text-xs flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> (11) 98765-4321
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">15/01/2023</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Maria Oliveira</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs flex items-center">
                                <Mail size={12} className="mr-1" /> maria.oliveira@email.com
                              </span>
                              <span className="text-xs flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> (11) 97654-3210
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">03/03/2023</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Pedro Santos</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs flex items-center">
                                <Mail size={12} className="mr-1" /> pedro.santos@email.com
                              </span>
                              <span className="text-xs flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> (11) 95432-1098
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Visitante
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">10/04/2025</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Ana Costa</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs flex items-center">
                                <Mail size={12} className="mr-1" /> ana.costa@email.com
                              </span>
                              <span className="text-xs flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> (11) 92345-6789
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Inativo
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">05/07/2022</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Carlos Ferreira</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <span className="text-xs flex items-center">
                                <Mail size={12} className="mr-1" /> carlos.ferreira@email.com
                              </span>
                              <span className="text-xs flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> (11) 91234-5678
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">20/09/2023</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">Carregar Mais</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="atas" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Atas de Assembleia</CardTitle>
                    <CardDescription>Registre e consulte atas de reuniões</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <FileUp size={18} className="mr-2" /> Nova Ata
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Assembleia Geral Ordinária</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Data: 05/04/2025 • Registrado por: Pr. Roberto Silva
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Mic size={16} className="mr-2" /> Áudio
                        </Button>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Pauta principal: Aprovação do plano financeiro para 2025 e eleição de novos diáconos.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Reunião do Conselho</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Data: 20/03/2025 • Registrado por: Maria Oliveira
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Mic size={16} className="mr-2" /> Áudio
                        </Button>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Pauta principal: Planejamento de eventos para o segundo trimestre de 2025.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Assembleia Extraordinária</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Data: 15/02/2025 • Registrado por: Pr. Roberto Silva
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Mic size={16} className="mr-2" /> Áudio
                        </Button>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Pauta principal: Aprovação de reforma do templo e compra de novos equipamentos.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Reunião de Liderança</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Data: 05/01/2025 • Registrado por: João Silva
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Mic size={16} className="mr-2" /> Áudio
                        </Button>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Pauta principal: Planejamento anual e definição de metas para 2025.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comunicados" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Comunicados Internos</CardTitle>
                    <CardDescription>Envie e gerencie comunicados para os membros</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <Send size={18} className="mr-2" /> Novo Comunicado
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Convite para Retiro Anual</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Enviado em: 10/04/2025 • Para: Todos os Membros
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Convite para participação no retiro anual da igreja, que acontecerá nos dias 15 a 17 de maio...</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Campanha de Arrecadação</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Enviado em: 05/04/2025 • Para: Todos os Membros
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Estamos iniciando uma campanha de arrecadação de alimentos não perecíveis para doação...</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Reunião de Líderes de Ministério</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Enviado em: 01/04/2025 • Para: Líderes de Ministério
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Convocamos todos os líderes de ministério para uma reunião importante no dia 10/04...</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail size={20} className="mr-3 text-church-primary" />
                        <div>
                          <h3 className="font-medium">Alteração no Horário dos Cultos</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Enviado em: 25/03/2025 • Para: Todos os Membros
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Informamos que a partir do próximo domingo (07/04), o culto da manhã passará a ser realizado às 10h...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Administrativo;
