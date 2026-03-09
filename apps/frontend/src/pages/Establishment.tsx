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
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { AxiosError } from 'axios'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/src/components/common/combobox'
import { useErrorMessage } from '@/src/hooks/useErrorMessage'

const Establishment = () => {
  const [searchProvince, setSearchProvince] = useState('')
  const [idProvince, setIdProvince] = useState<string | undefined>('')
  const [searchLocality, setSearchLocality] = useState('')
  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const [selectedLocalityName, setSelectedLocalityName] = useState('')
  const [searchP] = useDebounce(searchProvince, 300)
  const [searchL] = useDebounce(searchLocality, 300)

  const { data: province } = useProvince({ name: searchP })
  const { data: locality } = useLocality({ id: idProvince, search: searchL })
  const { showErrorMessage } = useErrorMessage()

  const {
    mutateAsync: createEstablishment,
    error: createEstablishmentError,
    isPending,
  } = useCreateEstablishment()

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
    setValue,
  } = useForm({
    defaultValues: { nombre: '', localidad: '', provincia: '' },
    resolver: zodResolver(EstablishmentSchema),
  })

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      showErrorMessage()
    }
  }, [submitCount, errors, showErrorMessage])

  useEffect(() => {
    if (createEstablishmentError) {
      let message = 'Error al crear el establecimiento'
      if (createEstablishmentError instanceof AxiosError) {
        message = createEstablishmentError.response?.data?.message || message
      }
      showErrorMessage(message)
    }
  }, [createEstablishmentError, showErrorMessage])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const values = { ...data, fechaCreacion: new Date().toISOString() }
      await createEstablishment(values)
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Error al crear establecimiento:', err)
    }
  })

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/establecimiento.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="hidden md:flex md:w-1/3 xl:w-1/2" />
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8 z-10">
        <Card className="w-full max-w-125 border-none shadow-2xl py-10 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-12 lg:h-20 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6 mt-1" />
              </div>
              <div className="space-y-4 w-full">
                <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">
                  Crear establecimiento
                </h2>
                <p className="text-sm text-[#626059]">
                  Ingresá la información básica de tu establecimiento para
                  comenzar a gestionar la producción.
                </p>
                <form
                  className="space-y-5 pt-4 text-left"
                  onSubmit={onSubmit}
                  noValidate
                  data-testid="establishment-form"
                >
                  <div className="space-y-2">
                    <Label
                      className={`font-bold ${errors.nombre ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}
                    >
                      Nombre del establecimiento*
                    </Label>
                    <Input
                      placeholder="Ingrese el nombre"
                      {...register('nombre')}
                      className={`${errors.nombre ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'} h-14`}
                      disabled={isPending}
                      data-testid="establishment-name-input"
                    />
                    {errors.nombre && (
                      <p className="text-xs font-medium text-[#B91C1C]">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`font-bold ${errors.provincia ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}
                    >
                      Provincia*
                    </Label>
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
                          setSelectedLocalityName('')
                          setSearchLocality('')
                          setValue('localidad', '')
                        }
                      }}
                    >
                      <ComboboxInput
                        className={`h-14 w-full ${errors.provincia ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'bg-[#F9F9F7] border-[#D1CFCA]'}`}
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
                        data-testid="province-combobox-input"
                      />
                      <ComboboxContent
                        className="bg-white border-[#D1CFCA] z-100"
                        data-testid="province-combobox-content"
                      >
                        {!province?.provincias.length && (
                          <ComboboxEmpty>
                            No se encontraron provincias
                          </ComboboxEmpty>
                        )}
                        <ComboboxList>
                          {province?.provincias.map((item) => (
                            <ComboboxItem
                              key={item.id}
                              value={item.id}
                              className="hover:bg-[#0B1001]/5"
                              data-testid={`province-option-${item.id}`}
                            >
                              {item.nombre}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {errors.provincia && (
                      <p className="text-xs font-medium text-[#B91C1C]">
                        {errors.provincia.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`font-bold ${errors.localidad ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}
                    >
                      Localidad*
                    </Label>
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
                        className={`h-14 w-full ${errors.localidad ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'bg-[#F9F9F7] border-[#D1CFCA]'}`}
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
                        data-testid="locality-combobox-input"
                      />
                      <ComboboxContent
                        className="bg-white border-[#D1CFCA] z-100"
                        data-testid="locality-combobox-content"
                      >
                        {!locality?.municipios.length && (
                          <ComboboxEmpty>
                            No se encontraron localidades
                          </ComboboxEmpty>
                        )}
                        <ComboboxList>
                          {locality?.municipios.map((item) => (
                            <ComboboxItem
                              key={item.id}
                              value={item.id}
                              className="hover:bg-[#0B1001]/5"
                              data-testid={`locality-option-${item.id}`}
                            >
                              {item.nombre}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {errors.localidad && (
                      <p className="text-xs font-medium text-[#B91C1C]">
                        {errors.localidad.message}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full h-14 mt-6 bg-[#0B1001] hover:bg-[#2F3427] text-[#FFFBF1] rounded-lg text-lg font-medium transition-all gap-2"
                    type="submit"
                    disabled={isPending}
                    data-testid="establishment-submit-button"
                  >
                    {isPending ? 'Cargando...' : 'Comenzar'}
                    <ArrowRight className="size-5" />
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Establishment
