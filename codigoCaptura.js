 const formC = document.getElementById("formCaptura");

 // const aviso = document.getElementById("aviso");   

let urlAnexosActuales={};
let nombresAnexosActuales = {};
let esCorreccion;

//
//v1 
// const direccionEnlace="https://script.google.com/macros/s/AKfycbyc-hYSXKTjRN_I9lLpPHFzmsRo40ypzObsD1MvNvLwLjoHFpkAXXeodvCG-CqPacmEeA/exec";
   const direccionEnlace="https://script.google.com/macros/s/AKfycbyc-hYSXKTjRN_I9lLpPHFzmsRo40ypzObsD1MvNvLwLjoHFpkAXXeodvCG-CqPacmEeA/exec";


 const aviso = document.getElementById("aviso");
let temporizadorEspera=null;



document.getElementById("Capturar" ).addEventListener("click", async () => {
                         const confirmar = confirm("Aviso: Esta completo el correo que vas a capturar?");

                if (!confirmar) {
                  // ❌ Usuario canceló
                  return;
                }
        mostrarEstadoCarga("Guardando por favor espere")

        const formData = new FormData(formC);
        const data = {};
        for (const [key, value] of formData.entries()) {
     
                   if (!(value instanceof File)) {
                                   data[key] = value;
                                   continue;
                    }

                   if (value.size === 0) {
                                   data[key] = "";
                                   continue;
                    }
    
    
                   if (
                               key === "ArchivoAnexo"
                    ){


                            const base64 = await new Promise((resolve, reject) => {
                            const reader = new FileReader();

                             reader.onload = () => resolve(reader.result);
                              reader.onerror = () => reject(reader.error);

                               reader.readAsDataURL(value);
        });

        if (!data.ArchivoAnexo) {
            data.ArchivoAnexo = [];
        }

        data.ArchivoAnexo.push({
            nombre: value.name,
            tipo: value.type,
            contenido: base64
        });
    }
        };

        Object.keys(urlAnexosActuales).forEach(name => {
             data[name] = urlAnexosActuales[name];
/*             alert("data.envio:"+data.numeroEnvio);
             alert("url de cotizaciones:"+urlCotizacionesActuales[name]);
             alert("data: "+data[name]);
  */     
  });
data.esCorreccion=esCorreccion;

try {
  const partes = dividirData(data);

const res = await fetch(direccionEnlace, {
    method: "POST",
    body: JSON.stringify({
        action: "CapturarRegistro",
           json1: partes[0],
           json2: partes[1],
           json3: partes[2],
           json4: partes[3],
           json5: partes[4],   
           json6: partes[5],
           json7: partes[6],
           json8:partes[7],
    })
});
const json = await res.json();

   

terminarEstadoCarga("Guardando");
    if (json.success) {

        //       folioCargado = false; 
       terminarEstadoCarga("Enviando solicitud");
//       if(numerodeEnvio==1){
//        alert(`✅ Registro de solicitud correctamente Enviada del formato de detección correctamente capturado. Tu folio es: ${folioActual}`);

//        }else{
          
          alert(`✅ Tu registro fue correctamente capturado.`+json.msg + json.indice);

//        } 
      
       

//        aviso.textContent = "✅ Tu respuesta fue enviada correctamente";
//        aviso.style.color = "green";
            
        formC.reset();
        urlAnexosActuales = {};
        nombresAnexosActuales = {};
//        let formularioVisible=document.getElementById("tablasFrame");

//        formularioVisible.classList.add("paso");
    } else {
//        terminarEstadoCarga("Cargando solicitud por folio");
        alert("⚠️ Error al capturar los datos: " + json.message);

    }

} catch (e) {
   terminarEstadoCarga("Cargando solicitud por folio");
//    console.error(e);
    alert("⚠️ Error de conexión: " + e.message);

}



});






function dividirData(data, partes =8) {

    const json = JSON.stringify(data);

    const tam = Math.ceil(json.length / partes);

    const resultado = [];

    for (let i = 0; i < partes; i++) {
        resultado.push(
            json.substring(i * tam, (i + 1) * tam)
        );
    }

    return resultado;
}

const formCo=document.getElementById("formCorreccion");

async function cargarDatosporNoOficio() {
//    urlCotizacionesActuales = {};
//    nombresCotizacionesActuales = {};
//    mostrarEstadoCarga("Cargando solicitud por folio");
    const tipoDocumentoC = document
        .getElementById("tipoDocumentoC")
        .value
        .trim();
    const noOficioC = document
        .getElementById("noOficioC")
        .value
        .trim();

    if (!tipoDocumentoC) {
        alert("Ingrese un tipo de Documento.");
        return;
    }
    if (!noOficioC) {
        alert("Ingrese un numero de Oficio.");
        return;
    }

    // Cargar dependencia




try {    
    const res = await fetch(direccionEnlace, {
    method: "POST",
    body: JSON.stringify({
        action: "cargarUltimaVersion",
        noOficio:noOficioC,
        tipoDocumento:tipoDocumentoC
    })
});






const json = await res.json();

if (!json.success || !json.data) {
    alert("⚠️ " + (json.message || "Registro no encontrado"));
    return;
}

const data = json.data;




//-------------------------------  activa selects


/*
setSelectValue("dependencia", data.dependencia);
      Object.keys(data).forEach(name => {
                          if (name.includes("__filas")) return;
                          if(name.includes("url")){
                                        urlCotizacionesActuales[name] = data[name];
                                        //alert("data:"+data[name]);
                                        //alert("urlcot"+urlCotizacionesActuales[name]);
                          };
                          if (
                               name.startsWith("nombreCotizacion_TCR") ||
                               name.startsWith("nombreCotizacion2_TCR")
                              ) {

                               nombresCotizacionesActuales[name] = data[name];
                       
                          }
                          if (name.includes("R")) return; //quitamos los campos de la tabla
                          if(name.includes("secretaria")) return;
                          if(name.includes("direccion")) return; 
                          if(name.includes("nivel")) return; 
                          if(name.includes("dependencia")) return;
//                          if(name.includes("folio")) return; 
                          const campo = document.querySelector(`[name="${name}"]`);
                          if (!campo) return;
                          
    campo.value = data[name];

    if (campo.tagName === "TEXTAREA") {
      campo.style.height = "auto";
      campo.style.height = campo.scrollHeight + "px";
    }
  });

*/  
formC.querySelectorAll('input[type="checkbox"]').forEach(campo => {
    campo.checked = false;
});




      
      // ⬇️ Ahora sí, restaurar la tabla
      restaurarTabla(data);

      esCorreccion=true;
//  terminarEstadoCarga("Cargando solicitud por folio");
  alert("📂  datos de la solicitud cargados correctamente");
//  let formularioVisible=document.getElementById("tablasFrame");

//  formularioVisible.classList.remove("paso");

} catch (e) {
//    terminarEstadoCarga("Cargando solicitud por folio");
    alert("⚠️ Error de conexión al cargar los datos");
}
  

}


   let temporizadorToast;

   
   
function mostrarEstadoGuardado(mensaje) {

    const toast = document.getElementById("estadoGuardado");

    clearTimeout(temporizadorToast);

    toast.textContent = mensaje;

    toast.classList.add("mostrar");

    temporizadorToast = setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 2500);
}

function mostrarEstadoCarga(mensaje) {

    const toast =
        document.getElementById("estadoCarga");

    toast.textContent = mensaje;

    toast.classList.add("mostrar");

    let puntos = 0;

    clearInterval(temporizadorEspera);

    temporizadorEspera =
        setInterval(() => {

            puntos =
                (puntos + 1) % 4;

            toast.textContent =
                mensaje +
                ".".repeat(puntos);

        }, 500);
}

function terminarEstadoCarga(mensaje) {

    const toast = document.getElementById("estadoCarga");

    toast.classList.remove("mostrar");
               
}

function setSelectValue(selectId, value) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.value = value;
  select.dispatchEvent(new Event("change"));
}


function restaurarTabla(data) {

  Object.keys(data).forEach(name => {
     
    const campo = document.querySelector(`[name="${name}"]`);


    if (!campo) return;

    if (campo.type === "file") {

        return;

    }


  if (
    data[name] !== null &&
    typeof data[name] === "object"
  ) {
    console.log("Objeto omitido:", name, data[name]);
    return;
  }
  //--------------------------------------------------------------------------------    

    campo.value = data[name];


    if (campo.type === "checkbox") {
    campo.checked =
        data[name] === true ||
        data[name] === "true" ||
        data[name] === "on";

    return;
}
// }
/*
if (campo.tagName === "TEXTAREA") {
      campo.style.height = "auto";
      campo.style.height = campo.scrollHeight + "px";
    }
*/

  });
/*  
document.querySelectorAll('[name^="CotizacionAdquisicionG"]').forEach(campo => {
         const url  = campo.dataset.compa;
         const name = campo.dataset.compa2;
         const nombre        =document.getElementById(name);
          
         const nameFile= campo.dataset.compa3;
         const nombreArchivo=document.getElementById(nameFile);
         nombre.innerHTML = `
                   <a href="${data[url]}" target="_blank">
                             ${nombreArchivo.value}
                    </a>
`;     
   

});

document
    .querySelectorAll(
        ".planoFilaInput"
    )
    .forEach(campo => {

        const claveUrl =campo.dataset.compa;
        const idVisual =campo.dataset.compa2;
        const claveNombre =campo.dataset.compa3;
        const contenedorNombre =document.getElementById(idVisual);
        const campoNombre =document.getElementById(claveNombre);
        if (!contenedorNombre ||!campoNombre) {
            return;
        }
        const url =data[claveUrl] || "";

        const nombre =campoNombre.value || "";


        if (!url ||!nombre) {
            return;
        }


        contenedorNombre.innerHTML = `
            <a
                href="${url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${nombre}
            </a>
        `;
    });
*/


}




document
    .getElementById("CargarCorreo")
    .addEventListener("click", cargarDatosporNoOficio);


/*    

mostrarEstadoCarga("Enviando solicitud, gracias por la espera");       

*/





