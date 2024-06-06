document.getElementById("form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const name = data.name;
    const response = await fetchData(name);
    if(response){
        showMessage(response.nombre);
    }
    else{
        showMessage("Sin resultados");
    }
});

async function fetchData( nombre, method = "GET") {
    try {
        const response = await fetch(`https://sisedevco.ikeasistencia.com/api-swagger/api/v1/controller/test?name=${nombre}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(response.status === 302){
            const data = await response.json();
            return data;
        }
        
    } catch (error) {
        return { error: error};
    }

}
 
// agregar una funcion para mostrar el mensaje en el DOM
function showMessage(message) {
    const messageContainer = document.getElementById("message");
    messageContainer.textContent = message;
}