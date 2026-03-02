import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { Input } from '@/src/components/common/Input'
import { Label } from '@/src/components/common/label'
import { useCreateEstablishment } from '@/src/hooks/establishment/useCreateEstablishment'
import { useLocality } from '@/src/hooks/ubication/useLocality'
import { useProvince } from '@/src/hooks/ubication/useProvince'
import { EstablishmentSchema } from '@/src/types/establishment'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/src/components/common/combobox'

const Establishment = () => {
  const [searchProvince, setSearchProvince] = useState('')
  const [idProvince, setIdProvince] = useState<string | undefined>('')
  const [searchLocality, setSearchLocality] = useState('')

  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const [selectedLocalityName, setSelectedLocalityName] = useState('')

  const [searchP] = useDebounce(searchProvince, 300)
  const [searchL] = useDebounce(searchLocality, 300)

  const { data: province } = useProvince({
    name: searchP,
  })

  const { data: locality } = useLocality({
    id: idProvince,
    search: searchL,
  })

  const {
    mutateAsync: createEstablishment,
    error: createEstablishmentError,
    isPending,
  } = useCreateEstablishment()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { nombre: '', localidad: '', provincia: '' },
    resolver: zodResolver(EstablishmentSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const values = {
        ...data,
        fechaCreacion: new Date().toISOString(),
      }
      await createEstablishment(values)

      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
    }
  })

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#e5e5e5]">
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center">
        <div className="w-full h-full max-w-lg flex items-center justify-center">
          <div className="rounded-2xl w-full aspect-square flex flex-col items-center justify-center">
            <img
              src="/isotipo_tambo 1.svg"
              alt="Logo"
              className="w-3/4 h-auto"
            />
            <img
              src="/logotipo 1.svg"
              alt="Tambo"
              className="w-1/2 h-auto mt-4"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-8 bg-white rounded-xl">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4 h-full">
              <div className="h-12 lg:h-28 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />

                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>

              <section className="min-h-[50vh] flex flex-col items-center justify-center gap-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                    Crear establecimiento*
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Ingresá la información básica de tu establecimiento <br />
                    para comenzar a gestionar la producción.
                  </p>

                  <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-4">
                      <Label>Nombre del establecimiento*</Label>
                      <Input
                        placeholder="Ingrese el nombre del establecimiento"
                        data-test-id="nombre-establecimiento"
                        {...register('nombre')}
                        disabled={isPending}
                      />
                      {errors.nombre && (
                        <small className="text-red-700">
                          {errors.nombre.message}
                        </small>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>Provincia*</Label>
                      <Combobox
                        onValueChange={(id: string) => {
                          const selectedProv = province?.provincias.find(
                            (p) => p.id === id
                          )
                          if (selectedProv) {
                            setIdProvince(id)
                            setSelectedProvinceName(selectedProv.nombre)
                            setSearchProvince(selectedProv.nombre)
                            setValue('provincia', selectedProv.nombre)

                            setIdProvince(id)
                            setSelectedLocalityName('')
                            setSearchLocality('')
                            setValue('localidad', '')
                          }
                        }}
                      >
                        <ComboboxInput
                          className="h-14 bg-[#EAEAEA]"
                          placeholder="Seleccione una provincia"
                          value={searchProvince}
                          onChange={(e) => {
                            const val = e.target.value
                            setSearchProvince(val)

                            if (val !== selectedProvinceName) {
                              setIdProvince('')
                              setSelectedProvinceName('')
                              setValue('provincia', '')
                            }
                          }}
                        />
                        <ComboboxContent>
                          {!province?.provincias.length && (
                            <ComboboxEmpty>
                              No se encontraron provincias
                            </ComboboxEmpty>
                          )}
                          <ComboboxList>
                            {province?.provincias.map((item) => (
                              <ComboboxItem key={item.id} value={item.id}>
                                {item.nombre}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      {errors.provincia && (
                        <small className="text-red-700">
                          {errors.provincia.message}
                        </small>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>Localidad*</Label>
                      <Combobox
                        disabled={!idProvince}
                        onValueChange={(id) => {
                          const selectedLoc = locality?.municipios.find(
                            (l) => l.id === id
                          )
                          if (selectedLoc) {
                            setSelectedLocalityName(selectedLoc.nombre)
                            setSearchLocality(selectedLoc.nombre)
                            setValue('localidad', selectedLoc.nombre)
                          }
                        }}
                      >
                        <ComboboxInput
                          className="h-14 bg-[#EAEAEA]"
                          placeholder={
                            idProvince
                              ? 'Seleccione una localidad'
                              : 'Primero seleccione una provincia'
                          }
                          value={searchLocality}
                          onChange={(e) => {
                            const val = e.target.value
                            setSearchLocality(val)

                            if (val !== selectedLocalityName) {
                              setSelectedLocalityName('')
                              setValue('localidad', '')
                            }
                          }}
                          disabled={!idProvince}
                        />
                        <ComboboxContent>
                          {!idProvince && (
                            <ComboboxEmpty>
                              Primero seleccione una provincia
                            </ComboboxEmpty>
                          )}

                          {!locality?.municipios.length && (
                            <ComboboxEmpty>
                              No se encontraron localidades
                            </ComboboxEmpty>
                          )}
                          <ComboboxList>
                            {locality?.municipios.map((item) => (
                              <ComboboxItem key={item.id} value={item.id}>
                                {item.nombre}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      {errors.localidad && (
                        <small className="text-red-700">
                          {errors.localidad.message}
                        </small>
                      )}

                      {createEstablishmentError && (
                        <small className="text-red-700">
                          {createEstablishmentError.response.data.message}
                        </small>
                      )}
                    </div>

                    <Button
                      className="w-full h-14 mt-4"
                      type="submit"
                      data-test-id="comenzar"
                      disabled={isPending}
                    >
                      Comenzar
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </form>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Establishment
