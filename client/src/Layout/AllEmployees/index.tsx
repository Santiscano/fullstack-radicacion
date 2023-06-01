import React from 'react'
import useAllEmployees from './hooks/useAllEmployees'

const AllEmployees = () => {
  const {} = useAllEmployees();
  return (
    <div>
      funcionando vista todos los empleados
    </div>
  )
}

export default AllEmployees
