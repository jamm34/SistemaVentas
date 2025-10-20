import styled from "styled-components"
import { supabase } from "./supabase.config";

const tabla = "modulos"
export async function MostrarModulos(){
    const {data, error } = await supabase
    .from(tabla)
    .select()
     if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });
        return;
    }
    return data;
}