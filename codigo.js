 const form = document.getElementById("formCaptura");
// const aviso = document.getElementById("aviso");   

const direccionEnlace="https://script.google.com/macros/s/AKfycbyc-hYSXKTjRN_I9lLpPHFzmsRo40ypzObsD1MvNvLwLjoHFpkAXXeodvCG-CqPacmEeA/exec";

document.getElementById("Guardar").addEventListener("click", async () => {
   
//document.getElementById("Enviar").addEventListener("submit", function(e){
                //e.preventDefault();
                //if (!this.checkValidity()) {
                //    this.reportValidity(); // muestra mensajes
                //    return;  
               // }
                 const confirmar = confirm("¿Estás seguro de que deseas enviar el formulario?");

                if (!confirmar) {
                  // ❌ Usuario canceló
                  return;
                }
       //**
       



//const formData = new FormData(this);

const formData = new FormData(form);

  const data = {};
/*
const selectsTexto = [
                      "dependencia"
                ];
                selectsTexto.forEach(id => {
                        const select = document.getElementById(id);
                        if (select && select.selectedIndex >= 0) {
                        formData.set(id, select.options[select.selectedIndex].value);
                        }
                });
                aviso.textContent = " ";

  
*/

  for (const [key, value] of formData.entries()) {
     
    if (!(value instanceof File)) {
        data[key] = value;
        continue;
    }

    if (value.size === 0) {
        data[key] = "";
        continue;
    }
/*    
     if(key.includes("CotizacionAdquisicion")){
                             const base64 = await new Promise(resolve => {
                             const reader = new FileReader();
                             reader.onload = () => resolve(reader.result);
                             reader.readAsDataURL(value);
        });
    


    data[key] = {
        nombre: value.name,
        tipo: value.type,
        contenido: base64
    };    
}
*/




/*
const archivosPlanos = formData.getAll("Planos_T3");
data.planos = [];

for (const archivo of archivosPlanos) {

  if (archivo.size === 0) continue;

  const base64 = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(archivo);
  });

  data.planos.push({
    nombre: archivo.name,
    tipo: archivo.type,
    contenido: base64
  });
}

*/
  }




//------------------llenando de las url

/*
Object.keys(urlCotizacionesActuales).forEach(name => {
             data[name] = urlCotizacionesActuales[name];
  });
*/




  //-------------------------------------------------------------------


/*
  // Guardamos también el número de filas actuales
  data.__filas1 = document.querySelectorAll("#tablaBody tr").length;
  data.__filas2 = document.querySelectorAll("#tablaBody2 tr").length;
  data.__filas3 = document.querySelectorAll("#tablaBody3 tr").length;
  data.__filasC = document.querySelectorAll("#tablaCotizaciones tr").length;
  data.__filas4 = document.querySelectorAll("#tablaBody4 tr").length;
  data.__filas5 = document.querySelectorAll("#tablaBody5 tr").length;

  if(folioActual==null){
      folioActual = generarFolio();
  }
  data.__folio = folioActual;
  data.__envioDependencia = true;
  data.edicion=edicionActual;
  data.numeroEnvio=numerodeEnvio+1;
  data.existenciaCotizaciones=ExistenciaDeCotizaciones;
  data.existenciaCotizaciones_T4=ExistenciaDeCotizaciones_T4;
  data.existenciaCotizaciones2=ExistenciaDeCotizacionesA2;
  data.existenciaCotizaciones2_T4=ExistenciaDeCotizacionesA2_T4;

*/



formData.append(
    "payload",
    JSON.stringify({
        action: "EnviarFormulario",
        data
    })
);  


try {

const res = await fetch(direccionEnlace, {
      method: "POST",
      body: JSON.stringify({action: "GuardarCorreo", data})
 });
  const json = await res.json();

   


    if (json.success) {

        alert(`✅ Registro de correo correctamente capturado. `);

        /*
        aviso.textContent = "✅ Tu registro fue correctamente hecho";
        aviso.style.color = "green";
*/
        form.reset();

    } else {

        alert("⚠️ Error al enviar los datos: " + json.message);

    }

} catch (e) {

    console.error(e);
    alert("⚠️ Error de conexión: " + e.message);

}

  });
