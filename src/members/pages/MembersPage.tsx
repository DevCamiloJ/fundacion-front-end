import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import { useFetchMembers } from '../hooks/useMembers'
import { Miembro } from '../types/miembro';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const columns: ColumnDef<Miembro>[] = [
  {
    accessorKey: "nombres",
    header: "Persona",
    cell: ({ row }) => {
      const person = row.original;
      return (
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={person.imagenUrl || undefined} alt={`Foto de ${person.nombres}`} />
            <AvatarFallback>{person.nombres[0]}{person.apellidos[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{person.nombres} {person.apellidos}</div>
            <div className="text-sm text-muted-foreground">{person.tipoDocumento}: {person.numeroDocumento}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Fecha de Nacimiento",
  },
  {
    accessorKey: "grado",
    header: "Grado",
  },
  {
    accessorKey: "institucionEducativa.nombre",
    header: "Institución Educativa",
  },
  {
    accessorKey: "eps.nombre",
    header: "EPS",
  },
  {
    accessorKey: "puntajeSisben.puntaje",
    header: "Puntaje Sisben",
  },
  {
    accessorKey: "grupoPoblacional.nombre",
    header: "Grupo Poblacional",
  },
];

export const MembersPage = () => {
  const { data: members, isLoading, isError } = useFetchMembers()

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-xl font-medium">Miembros</h2>
        <Button asChild>
          <Link to="/dashboard/miembros/agregar">
            <Icons.Plus className="h-4 w-4"/>
            Agregar
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={members || []}/>
    </div>
  )
}