"use client";

import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  // evita actualizar estado si el componente se desmonto o cambio la url
  // soluciona race-conditions si se realiza multiples peticiones
  let cancelled = false; //es una bandera que se hace true se la instancia es robada o desmontada

    // resetear estado cuando cambia la URL
    // no le gusta al lint, no es lo recomendado pero es simple y funcional. aveces es lo mejor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(null); setLoading(true); setError(null); //limpia datos de la instancia anterior

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json(); //retorna una promise que se resuelve con el json de la resuedta
      })
      .then((json) => { //si dio retorno encadena con este then para setear el estado
         //se setea los datos solo si el efecto no ha sido interrumpido
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        //se hace el setError de la peticion solo si no se cancelo la instancia del fetch actual
        if (!cancelled) setError(err.message); 
      })
      .finally(() => { //no importa el resultado de la request mientras no se cancele setea el loading en false
        //termina el loading cuando termina correctamente la peticion si no se cancela
        if (!cancelled) setLoading(false); 
      });

    // Cleanup: si cambia url o se desmonta, marcar como cancelado
    return () => {
      cancelled = true;
    };
     //la url en la dependencia hará que se relance la funcion con la nueva url seteando al flag cancelled a true 
     //y cortando el retorno de la request que se ejecutaba previamente y dando el estado actual de pedicion a la nueva request.
  }, [url]);

  return { data, loading, error };
}
