function traerInformacion(){
    
    $.ajax({
        url: "https://g9f083baa779c55-reto1ciclo3.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            //Aca se puede validar la respuesta
            console.log(respuesta);
            //ciclo que recorra el arreglo items, el cual es un atributo de respuesta. Al recorrerlo
            //agregaremos al div llamado resultado el contenido de la propiedad name de cada elemento del
            //arreglo items.
            //for(i=0;i<respuesta.items.length;i++){
            //    $("#resultado").append(respuesta.items[i].name+"<br>")
            // }
            pintarRespuesta(respuesta.items);
            
        },
        error : function(xhr, status){
            alert('Ha sucedido un problema: '+ status);
        }
    });

}   

function pintarRespuesta(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"<td>";
        myTable+="<td>"+items[i].owner+"<td>";
        myTable+="<td>"+items[i].capacity+"<td>";
        myTable+="<td>"+items[i].category_id+"<td>";
        myTable+="<td>"+items[i].name+"<td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarElemento("+items[i].id+")'>Detalle</button>";
        
        
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}

function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g9f083baa779c55-reto1ciclo3.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "POST",
        data:myData,
        datatype: "JSON",
        success:function(respuesta){
            //Aca se puede validar la respuesta
            $("#resultado").empty();
            $("#id").val();
            $("#owner").val();
            $("#capacity").val();
            $("#category_id").val();
            $("#name").val();
            traerInformacion();
            alert("Se ha guardado!")

            $("#id").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#category_id").val("");
            $("#name").val("");
        },
        /*
        statusCode : {
            201 :  function() {
                alert("guardado!");
                $("#id").val("");
                $("#owner").val("");
                $("#capacity").val("");
                $("#category_id").val("");
                $("#name").val("");
                traerInformacion();	
                }
                
            }*/
    });
}
function editarInformacion(){
    let myData={
        id:$("#id").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g9f083baa779c55-reto1ciclo3.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "PUT",
        data:dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val();
            $("#owner").val();
            $("#capacity").val();
            $("#category_id").val();
            $("#name").val();
            traerInformacion();
            alert("Se ha actualizado.") 
            
            $("#id").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#category_id").val("");
            $("#name").val("");
            

            
        }
        
    });
}
function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g9f083baa779c55-reto1ciclo3.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type: "DELETE",
        data:dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha eliminado.")
        }
    })
}

function editarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: 'https://g9f083baa779c55-reto1ciclo3.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/'+idElemento,
        data:"{}",
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",

        success:function(respuesta){
            console.log(respuesta);
            let myTable="<table>";
            for(i=0;i<respuesta.items.length;i++){
                $("#id").val(respuesta.items[i].id);
                $("#owner").val(respuesta.items[i].owner);
                $("#capacity").val(respuesta.items[i].capacity);
                $("#category_id").val(respuesta.items[i].category_id);
                $("#name").val(respuesta.items[i].name);
                
            }
        }
    })
}

