import { supabase } from "../index";
import Swal from "sweetalert2";

const tabla = "productos";
export async function InsertarProductos(p) {
    const { data, error } = await supabase.rpc("insertarproductos", p);
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops... no se pudo conectar",
            text: error.message
        });
        return;
    }
    return data;

}

export async function MostrarProductos(p) {
    const { data } = await supabase.rpc("mostrarproductos", { _id_empresa: p._id_empresa })

    return data;
}

export async function BuscarProductos(p) {
    const { data } = await supabase.rpc("buscarproductos", { _id_empresa: p.id_empresa, buscador: p.buscador })
    return data;
}

export async function EliminarProductos(p) {
    const { error } = await supabase
        .from(tabla)
        .delete()
        .eq("id", p.id);
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
}

export async function EditarProductos(p) {
    const { error } = await supabase.rpc("editarproductos", p)
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
}
