// Importamos el JSON (asegúrate de que la ruta sea la correcta en tu proyecto)
import provincesData from '../../../public/ubications/provinces.json'
import localitiesData from '../../../public/ubications/localities.json'

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const getProvinces = (name: string = '') => {
  const query = removeAccents(name.toLowerCase().trim())

  if (query === '')
    return Promise.resolve({ data: { provincias: provincesData } })

  const filtered = provincesData
    .filter((prov) => removeAccents(prov.nombre.toLowerCase()).includes(query))
    .map((prov) => ({
      id: prov.id,
      nombre: prov.nombre,
    }))

  return Promise.resolve({ data: { provincias: filtered } })
}

/**
 * Obtiene y filtra localidades desde el JSON local
 * @param id ID de la provincia (ej: "06")
 * @param search Término de búsqueda para el nombre de la localidad
 */
export const getLocalities = (id: string, search: string = '') => {
  const query = removeAccents(search.toLowerCase().trim())

  // 1. Primero filtramos por ID de provincia para reducir el universo de búsqueda
  // 2. Luego filtramos por coincidencia de nombre (sin acentos)
  const filtered = localitiesData // O "localidades", según la raíz de tu JSON
    .filter((loc) => loc.provincia.id === id)
    .filter((loc) => removeAccents(loc.nombre.toLowerCase()).includes(query))
    .map((loc) => ({
      id: loc.id,
      nombre: loc.nombre,
    }))

  const limit = 50
  return Promise.resolve({ data: { municipios: filtered.slice(0, limit) } })
}
