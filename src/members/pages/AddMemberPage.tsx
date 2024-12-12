import { AddMemberForm } from '../components/AddMemberForm'

export const AddMemberPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-medium">Agregar Miembros</h2>
        <p className="text-sm text-gray-900 mt-1">Formulario para agregar un nuevo miembro</p>
      </div>
      <div>
        {/* <AddMemberForm /> */}
        <AddMemberForm />
      </div>
    </div>
  )
}