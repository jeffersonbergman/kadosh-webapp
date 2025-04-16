
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck } from 'lucide-react';
import { Mail, Phone } from 'lucide-react';

const MembersTab = () => {
  const navigate = useNavigate();
  
  return (
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
                    <Button variant="ghost" size="sm" onClick={() => navigate('/administrativo/membros/1')}>Detalhes</Button>
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
                    <Button variant="ghost" size="sm" onClick={() => navigate('/administrativo/membros/2')}>Detalhes</Button>
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
                    <Button variant="ghost" size="sm" onClick={() => navigate('/administrativo/membros/3')}>Detalhes</Button>
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
                    <Button variant="ghost" size="sm" onClick={() => navigate('/administrativo/membros/4')}>Detalhes</Button>
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
                    <Button variant="ghost" size="sm" onClick={() => navigate('/administrativo/membros/5')}>Detalhes</Button>
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
  );
};

export default MembersTab;
