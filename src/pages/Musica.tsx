
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Music, Calendar, ListMusic, PlusCircle, Search, 
  ChevronRight, UserPlus, Clock, FileMusic, Mic
} from 'lucide-react';

const Musica = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Módulo de Música</h1>
            <p className="text-gray-500">Gerencie escalas, repertórios e recursos para a equipe de louvor</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="hidden md:flex">
              <UserPlus size={18} className="mr-2" /> Novo Músico
            </Button>
            <Button>
              <PlusCircle size={18} className="mr-2" /> Nova Escala
            </Button>
          </div>
        </div>

        <Tabs defaultValue="escalas" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
            <TabsTrigger value="repertorios">Repertórios</TabsTrigger>
            <TabsTrigger value="musicos">Músicos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escalas" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Escalas de Músicos</CardTitle>
                    <CardDescription>Organização das equipes para cada culto</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Calendar size={16} className="mr-2" /> Calendário
                    </Button>
                    <Button size="sm">
                      <PlusCircle size={16} className="mr-2" /> Nova Escala
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Manhã</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            21/04/2025 • 10:00 - 12:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          6 músicos
                        </span>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Detalhes</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          João (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Maria (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Pedro (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +3 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Noite</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            21/04/2025 • 19:00 - 21:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          5 músicos
                        </span>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Detalhes</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Carlos (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Ana (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Lucas (Guitarra)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +2 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Quarta-feira</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            24/04/2025 • 19:30 - 21:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          4 músicos
                        </span>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Detalhes</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Julia (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Ricardo (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +2 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Ensaio Geral da Equipe</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            20/04/2025 • 15:00 - 17:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          8 músicos
                        </span>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Detalhes</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          João (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Maria (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Pedro (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +5 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="repertorios" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Repertórios</CardTitle>
                    <CardDescription>Gerenciamento das músicas para cada culto</CardDescription>
                  </div>
                  <div className="flex w-full md:w-auto space-x-2">
                    <div className="relative flex-grow md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Buscar música..."
                        className="pl-8"
                      />
                    </div>
                    <Button size="sm">
                      <ListMusic size={16} className="mr-2" /> Novo Repertório
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Music size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Manhã (21/04)</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            8 músicas • Atualizado em 14/04/2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-3 md:mt-0">
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Ver Repertório</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Grande é o Senhor (Adhemar de Campos)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Oceanos (Hillsong)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Tua Graça Me Basta (Davi Sacer)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-church-primary cursor-pointer hover:underline">
                            +5 músicas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Music size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Noite (21/04)</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            7 músicas • Atualizado em 14/04/2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-3 md:mt-0">
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Ver Repertório</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Deus é Deus (Delino Marçal)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Santo Espírito (Laura Souguellis)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Lugar Secreto (Gabriela Rocha)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-church-primary cursor-pointer hover:underline">
                            +4 músicas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Music size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Quarta-feira (24/04)</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            5 músicas • Atualizado em 13/04/2025
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-3 md:mt-0">
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <span>Ver Repertório</span>
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Nada Além do Sangue (Fernandinho)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Deus Proverá (Adhemar de Campos)</span>
                        </div>
                        <div className="flex items-center">
                          <FileMusic size={16} className="mr-2 text-church-primary" />
                          <span className="text-sm">Enquanto Eu Chorava (Gabriel Guedes)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-church-primary cursor-pointer hover:underline">
                            +2 músicas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="musicos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Músicos Cadastrados</CardTitle>
                    <CardDescription>Gerenciamento da equipe de louvor</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <UserPlus size={18} className="mr-2" /> Novo Músico
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
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Instrumento</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contato</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">João Silva</td>
                          <td className="p-4 align-middle">Bateria</td>
                          <td className="p-4 align-middle">(11) 98765-4321</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Maria Oliveira</td>
                          <td className="p-4 align-middle">Vocal</td>
                          <td className="p-4 align-middle">(11) 98765-1234</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Pedro Santos</td>
                          <td className="p-4 align-middle">Violão</td>
                          <td className="p-4 align-middle">(11) 97654-3210</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Ana Costa</td>
                          <td className="p-4 align-middle">Violino</td>
                          <td className="p-4 align-middle">(11) 96543-2109</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Ocasional
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Lucas Ferreira</td>
                          <td className="p-4 align-middle">Guitarra</td>
                          <td className="p-4 align-middle">(11) 95432-1098</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                        <tr className="transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Julia Almeida</td>
                          <td className="p-4 align-middle">Vocal</td>
                          <td className="p-4 align-middle">(11) 94321-0987</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Musica;
