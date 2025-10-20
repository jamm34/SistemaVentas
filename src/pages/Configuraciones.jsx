import { useQuery } from "@tanstack/react-query"
import {ConfiguracionesTemplate, useModuloStore} from "../index"
import { Spinner1 } from "../index"

export function Configuraciones(){
    const {mostrarModulos} = useModuloStore()  
    const {isLoading, error} = useQuery({queryKey:[" mostrar modulos"], queryFn:mostrarModulos})
    if(isLoading) {
        return <Spinner1 />
    }
    if(error){
        return <span>ocurrio un error: {error.message}</span>
    }
    return(
        <ConfiguracionesTemplate />
    )
}