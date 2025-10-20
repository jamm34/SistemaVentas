import { useQuery } from "@tanstack/react-query";
import { POSTemplate, useEmpresaStore } from "../index";



export function POS() {
    const { dataempresa } = useEmpresaStore();
    //Buscar productos
    useQuery({
        queryKey: ["Buscar productos", buscador],
        queryFn: () => buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
        enabled: !!dataempresa,
        refetchOnWindowFocus: false
    });
    return (
        <POSTemplate />
    );
};