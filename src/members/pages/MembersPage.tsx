import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom';
import { format } from 'date-fns'

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import { useFetchMembers } from '../hooks/useMembers'
import { Miembro } from '../types/miembro';

const columns: ColumnDef<Miembro>[] = [
  {
    accessorKey: "imagenUrl",
    header: "Imagen",
    cell: ({ getValue }) => {
      const imagenUrl = getValue<string>();
      const apiUrl = import.meta.env.VITE_API_URL;

      return imagenUrl ? 
        (
          <img src={`${apiUrl}/members/image/${imagenUrl}`} 
            alt="Imagen Miembro" 
            className="w-16 h-16 object-cover rounded-full" 
          />
        ) 
        : 
        (
          <span>No disponible</span>
        );
    },
  },
  {
    accessorKey: "nombres",
    header: "Nombre",
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "tipoDocumento",
    header: "Tipo Documento",
  },
  {
    accessorKey: "numeroDocumento",
    header: "Número Documento",
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Fecha Nacimiento",
    cell: ({ getValue }) => {
      const rawDate = getValue<string>(); // Obtener la fecha cruda
      return format(new Date(rawDate), "dd/MM/yyyy"); // Formatear la fecha
    }
  },
  {
    accessorKey: "ciudadNacimiento.nombre",
    header: "Ciudad Nacimiento",
  },
  {
    accessorKey: "paisNacimiento.nombre",
    header: "País Nacimiento",
  },
  {
    accessorKey: "acudiente",
    header: "Acudiente",
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