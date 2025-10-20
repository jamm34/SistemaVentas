import { useQuery } from "@tanstack/react-query";
import { CategoriasTemplate, Spinner1, useCategoriasStore } from "../index";
import {useEmpresaStore} from "../store/EmpresaStore"


export function Categorias(){
    const {mostrarCategorias, buscarCategorias, buscador} = useCategoriasStore()
    const {dataempresa} = useEmpresaStore()
    const {isLoading, error} = useQuery({queryKey:["mostrar categorias", dataempresa?.id],
         queryFn: ()=> mostrarCategorias({id_empresa:dataempresa?.id}),
         enabled:!!dataempresa, refetchOnWindowFocus:false});
//Buscar categorias
 const {} = useQuery({queryKey:["Buscar categorias", buscador],
         queryFn: ()=> buscarCategorias({id_empresa:dataempresa?.id, descripcion:buscador}),
         enabled:!!dataempresa, refetchOnWindowFocus:false});

    
    if(isLoading){
        return <Spinner1/>;
    }
    if (error){
        return <span>Ocurrio un error: {error.message}</span>
    }
    return(<CategoriasTemplate/>)
}