
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccessEditModal } from './AccessEditModal';

const initialMembers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    status: "Ativo",
    registered: "15/01/2023",
    access: "adm",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 97654-3210",
    status: "Ativo",
    registered: "03/03/2023",
    access: "financeiro",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    phone: "(11) 95432-1098",
    status: "Visitante",
    registered: "10/04/2025",
    access: "louvor",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 92345-6789",
    status: "Inativo",
    registered: "05/07/2022",
    access: "none",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    phone: "(11) 91234-5678",
    status: "Ativo",
    registered: "20/09/2023",
    access: "louvor",
  }
];

const accessLabels: Record<string, string> = {
  adm: "Adm",
  financeiro: "Financeiro",
  louvor: "Louvor",
  none: "Nenhum",
};

const accessColors: Record<string, string> = {
  adm: "bg-blue-100 text-blue-800",
  financeiro: "bg-yellow-100 text-yellow-800",
  louvor: "bg-purple-100 text-purple-800",
  none: "bg-gray-100 text-gray-800"
};

const MembersTab = () => {
  const navigate = useNavigate();
  const [members, setMembers] = React.useState(initialMembers);
  const [accessModal, setAccessModal] = React.useState<{ open: boolean, memberId?: number }>({ open: false });
  const [search, setSearch] = React.useState('');

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleAccessEditSave(id: number, newAccess: string) {
    setMembers(members =>
      members.map(m => m.id === id ? { ...m, access: newAccess } : m)
    );
  }

  // Responsividade: wrap em horizontal overflow e grid/table layout para mobile
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Membros da Igreja</CardTitle>
            <CardDescription>Cadastre, gerencie todos os membros e conceda acessos</CardDescription>
          </div>
          <div className="flex w-full md:w-auto space-x-2">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar membro..."
                className="pl-8"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <UserCheck size={18} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <div className="w-full min-w-[650px] md:min-w-0">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contato</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Acesso</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Data Cadastro</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(member =>
                  <tr key={member.id} className="border-b hover:bg-muted/60">
                    <td className="p-4 align-middle font-medium">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="text-xs flex items-center">
                          <Mail size={12} className="mr-1" /> {member.email}
                        </span>
                        <span className="text-xs flex items-center mt-1">
                          <Phone size={12} className="mr-1" /> {member.phone}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span className={
                        member.status === "Ativo"
                          ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                          : member.status === "Inativo"
                          ? "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                          : "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                      }>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${accessColors[member.access]}`}>
                        <ShieldCheck size={12} className="mr-1" />
                        {accessLabels[member.access]}
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="pl-0 ml-0 mt-1"
                        onClick={() => setAccessModal({ open: true, memberId: member.id })}
                      >
                        Editar acesso
                      </Button>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">{member.registered}</td>
                    <td className="p-4 align-middle flex flex-col md:flex-row gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/administrativo/membros/${member.id}`)}
                      >
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-4 gap-2">
          <Button variant="outline" size="sm">Carregar Mais</Button>
        </div>
      </CardContent>
      {accessModal.open && typeof accessModal.memberId === "number" && (
        <AccessEditModal
          open={accessModal.open}
          memberName={members.find(m => m.id === accessModal.memberId)?.name || ""}
          currentAccess={members.find(m => m.id === accessModal.memberId)?.access || "none"}
          onSave={value => handleAccessEditSave(accessModal.memberId!, value)}
          onClose={() => setAccessModal({ open: false })}
        />
      )}
      <div className="mt-8 text-xs text-muted-foreground">
        <strong>Acessos:</strong>{" "}
        <span className="font-medium text-blue-800">Adm</span> (total),{" "}
        <span className="font-medium text-yellow-800">Financeiro</span> (financeiro),{" "}
        <span className="font-medium text-purple-800">Louvor</span> (aba de música e membros do louvor).
        Todos membros de um ministério acessam atas e membros, e editam sua conta.
      </div>
    </Card>
  );
};

export default MembersTab;
