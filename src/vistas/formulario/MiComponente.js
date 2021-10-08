import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";


const MiComponente = () => {
	const [id, setId] = useState("")
	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
	const [personas, setPersonas] = useState([])

	const handleInputChangeNombre = (event) => {
		//console.log(event.target.value)
		setNombre(event.target.value)
	}

	const handleInputChangeApellido = (event) => {
		//console.log(event.target.value)
		setApellido(event.target.value)

	}

	const enviarDatos = () => {
		console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

		guardarPersona();
	}

	const editarDatos = () => {
		console.log(`Editando datos id:${id} nombre:${nombre} y apellido:${apellido}`)

		editarPersona();
	}

	useEffect(() => {
		getPersonas()
	}, [])
	async function getPersonas() {
		try {
			const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=3');
			if (response.status == 200) {
				setPersonas(response.data.persona)
				console.log(response.data);
			}

		}
		catch (error) {
			console.error(error);
		}
	}

	function guardarPersona() {
		axios.post('http://192.99.144.232:5000/api/personas', {
			nombre: nombre,
			apellido: apellido,
			grupo: 3
		})
			.then(function (response) {

				if (response.status == 200) {
					alert("Registro correcto")
					getPersonas()

				} else {
					alert("Error al guardar")
				}

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function editarPersona() {
		console.log(id)
		axios.put(`http://192.99.144.232:5000/api/personas/${id}`, {
			nombre: nombre,
			apellido: apellido,
		})
			.then(function (response) {

				if (response.status == 200) {
					alert("Registro edicion correcto")
					getPersonas()

				} else {
					alert("Error al editar")
				}

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const columns = [
		{
			name: "ID",
			field: "_id",
			options: {
				filter: true,
				sort: true,
				display: false
			}
		},
		{
			name: "Nombre",
			field: "nombre",
			options: {
				filter: true,
				sort: true,
			}
		},
		{
			name: "Apellido",
			field: "apellido",
			options: {
				filter: true,
				sort: false,
			}
		},
		/*{
			name: "Edad",
			field: "age",
			options: {
				filter: true,
				sort: false,
			}
		},
		{
			name: "Rut",
			field: "rut",
			options: {
				filter: true,
				sort: false,
			}
		},
		{
			name: "Sexo",
			field: "gender",
			options: {
				filter: true,
				sort: false,
			}
		},
		{
			name: "Estado",
			field: "state",
			options: {
				filter: true,
				sort: false,
			}
		},*/
	];

	/*const data = [
		{ firstname: "Name 1", lastname: "Title 1", age: "Location 1", rut: 30, gender:80 , state:'cliente'},
		{ firstname: "Name 2", lastname: "Title 2", age: "Location 2", rut: 31, gender:80 , state: 'cliente'},
	];*/

	const handleRowClick = (rowData, rowMeta) => {
		console.log(rowData)
		setId(rowData._id)
		setNombre(rowData.nombre)
		setApellido(rowData.apellido)
		
	};

	const options = {
		filterType: 'checkbox',
		onlyOneRowCanBeSelected: true,
		onRowClick: handleRowClick
	};

	return (
		<Fragment>
			<div style={{marginBottom:'15px', marginTop:'15px'}}>
				<div style={{border: '3px solid black', borderRadius:'30px' , width: '25%',margin:'auto',textAlign: 'center', backgroundColor:'#ffe082'}}>
				<h1>Formulario</h1>
					<div style={{marginBottom:'15px'}}>
						<label for='nombre'>Nombre: </label>
						<input type="text"  name="nombre" onChange={handleInputChangeNombre} value={nombre} style={{backgroundColor: '#caae53'}}></input>
						<br></br>
						<label for='nombre'>Apellido: </label>
						<input type="text"  name="apellido" onChange={handleInputChangeApellido} value={apellido} style={{backgroundColor: '#caae53'}}></input>
					</div>
					<div style={{marginBottom:'15px'}}>
						<button onClick={enviarDatos} style={{marginRight:'15px'}}>Enviar</button>
						<button onClick={editarDatos}>Editar</button>
					</div>
				</div>
				
				{/*<div className="users">
					{personas.map((persona) => (

						<li>{persona.nombre} {persona.apellido}</li>
					))}
					</div>*/}
			</div>
			<div style={{width: "75%", margin: 'auto'}}>
				<MaterialDatatable
					title={"Personas"}
					data={personas}
					columns={columns}
					options={options}
				/>
			</div>
			

		</Fragment>
  )
}
export default MiComponente