import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

interface ShelterItem {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
}

const SheltersScreen = () => {
  const [search, setSearch] = useState('');
  const data: ShelterItem[] = [
    {
        "ciudad": "Distrito Nacional",
        "codigo": "DO-010002",
        "edificio": "Polideportivo San Carlos",
        "coordinador": "Luis Peña",
        "telefono": "(809) 308-3411",
        "capacidad": "274 personas",
        "lat": "-69.89178",
        "lng": "18.47893"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010007",
        "edificio": "Politécnico Don Bosco",
        "coordinador": "Modesto Cabrera",
        "telefono": "(829) 699-3290",
        "capacidad": "",
        "lat": "-69.901247",
        "lng": "18.478692"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010008",
        "edificio": "Parroquia Don Bosco",
        "coordinador": "Pedro Arias",
        "telefono": "(809) 858-9928",
        "capacidad": "",
        "lat": "-69.899758",
        "lng": "18.479236"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010010",
        "edificio": "Iglesia Abventista Del 7Mo Dia Franco Creor",
        "coordinador": "Pastor Reini",
        "telefono": "(809) 904-7084",
        "capacidad": "13,392 personas",
        "lat": "-69.889178",
        "lng": "18.476092"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010011",
        "edificio": "Parroquia San Carlos Borromeo",
        "coordinador": "Solangel De Los Santos",
        "telefono": "(809) 689-5020",
        "capacidad": "1,225 personas",
        "lat": "-69.893956",
        "lng": "18.475336"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010012",
        "edificio": "Asociación De Detallista Del Dn",
        "coordinador": "Maria Isabel Pichardo",
        "telefono": "(829) 399-3360",
        "capacidad": "178 personas",
        "lat": "-69.889074",
        "lng": "18.479367"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010014",
        "edificio": "Escuela Santo Socorro",
        "coordinador": "Sandra Morel",
        "telefono": "(809) 856-9374",
        "capacidad": "",
        "lat": "-69.893783",
        "lng": "18.478761"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010017",
        "edificio": "Escuela Básica/Primaria Republica De Hondura",
        "coordinador": "Anny Medrano",
        "telefono": "(829) 654-1254",
        "capacidad": "",
        "lat": "-69.888648",
        "lng": "18.494045"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010020",
        "edificio": "Escuela Santo Socorro",
        "coordinador": "Odalis Soriano",
        "telefono": "(809) 919-5847",
        "capacidad": "",
        "lat": "-69.888012",
        "lng": "18.48582"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010025",
        "edificio": "Liceo Panamericano",
        "coordinador": "Udelka Gonzales",
        "telefono": "(829) 393-9835",
        "capacidad": "",
        "lat": "-69.912786",
        "lng": "18.479961"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010026",
        "edificio": "Escuela Domingo Savio",
        "coordinador": "Agustin Suerra",
        "telefono": "(809) 681-2279",
        "capacidad": "",
        "lat": "-69.896893",
        "lng": "18.493812"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010050",
        "edificio": "Centro Educativo Republica De Haiti",
        "coordinador": "Dulce Delgado",
        "telefono": "(809) 869-2972",
        "capacidad": "68 personas",
        "lat": "-69.896018",
        "lng": "18.497888"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010051",
        "edificio": "Escuela Básica/Primaria Republica De Colombia",
        "coordinador": "Carmen Diana Ramirez",
        "telefono": "(809) 880-0756",
        "capacidad": "",
        "lat": "-69.898725",
        "lng": "18.501312"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010058",
        "edificio": "Escuela Parroquia Cristo Rey",
        "coordinador": "Rita Cruz Holguin",
        "telefono": "(849) 707-0141",
        "capacidad": "1,285 personas",
        "lat": "-69.92714",
        "lng": "18.49643"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010060",
        "edificio": "Politécnico Victor Estrella Liz",
        "coordinador": "Andres Brito",
        "telefono": "(829) 908-7817",
        "capacidad": "288 personas",
        "lat": "-69.925347",
        "lng": "18.489991"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010066",
        "edificio": "Parroquia Cristo Rey",
        "coordinador": "Padre Cristian Canario",
        "telefono": "(849) 919-3808",
        "capacidad": "154 personas",
        "lat": "-69.926235",
        "lng": "18.496885"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010070",
        "edificio": "Instituto De Arte Y Oficios ( Itao )",
        "coordinador": "Jose Miguel Diez Cabrera",
        "telefono": "(809) 434-2557",
        "capacidad": "",
        "lat": "-69.931691",
        "lng": "18.489013"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010072",
        "edificio": "Club Educativo, Deportivo Y Cultural General Antonio Duverge",
        "coordinador": "Prof Javier Molina",
        "telefono": "(849) 878-0106",
        "capacidad": "952 personas",
        "lat": "-69.936868",
        "lng": "18.445797"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010077",
        "edificio": "Colegio Luis Muñoz Rivera",
        "coordinador": "Rafael Mateo Aquino",
        "telefono": "(809) 609-7908",
        "capacidad": "",
        "lat": "-69.93028",
        "lng": "18.472356"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010079",
        "edificio": "Escuela Enrique Jimenez Moya",
        "coordinador": "Luz Maria Jimenez",
        "telefono": "(829) 275-3831",
        "capacidad": "",
        "lat": "-69.928007",
        "lng": "18.454124"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010081",
        "edificio": "Colegio Loyola",
        "coordinador": "Oscar De Los Santos",
        "telefono": "(829) 659-8609",
        "capacidad": "",
        "lat": "-69.923568",
        "lng": "18.450405"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010084",
        "edificio": "Liceo General Antonio Duverge",
        "coordinador": "Lourdes Pimentel",
        "telefono": "(809) 231-7992",
        "capacidad": "400 personas",
        "lat": "-69.936673",
        "lng": "18.447882"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010088",
        "edificio": "Iglesia Alpha Y Onmega",
        "coordinador": "Rodofo De La Cruz",
        "telefono": "(829) 263-7070",
        "capacidad": "224 personas",
        "lat": "-69.915197",
        "lng": "18.50675"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010092",
        "edificio": "Escuela Santa Ana",
        "coordinador": "Lisbet Felix",
        "telefono": "(809) 684-4106",
        "capacidad": "",
        "lat": "-69.887708",
        "lng": "18.507262"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010093",
        "edificio": "Escuela Básica/Primaria Centro Educaativo Inicial Y Primaria Fatima Oscar Santana",
        "coordinador": "Ana Maria Espinal",
        "telefono": "(829) 380-9697",
        "capacidad": "54 personas",
        "lat": "-69.886863",
        "lng": "18.50737"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010095",
        "edificio": "Escuela Rafael Leonida Solano",
        "coordinador": "David Garcia",
        "telefono": "(809) 686-1817",
        "capacidad": "1,902 personas",
        "lat": "-69.884304",
        "lng": "18.493202"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010096",
        "edificio": "Escuela Básica/Primaria San Martin De Porres",
        "coordinador": "Angela Peres",
        "telefono": "(809) 404-3205",
        "capacidad": "",
        "lat": "-69.883457",
        "lng": "18.496975"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010099",
        "edificio": "Escuela San Rafael",
        "coordinador": "Maria Sanchez",
        "telefono": "(849) 207-1072",
        "capacidad": "1,828 personas",
        "lat": "-69.879612",
        "lng": "18.506322"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010111",
        "edificio": "Escuela Secundaria Padre Marsella",
        "coordinador": "Antolin Gomes",
        "telefono": "(829) 445-0582",
        "capacidad": "2,857 personas",
        "lat": "-69.888012",
        "lng": "18.492193"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010125",
        "edificio": "Escuela Peru",
        "coordinador": "Rafel Perez",
        "telefono": "(809) 436-8900",
        "capacidad": "",
        "lat": "-69.889748",
        "lng": "18.486418"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010134",
        "edificio": "Escuela Eduardo",
        "coordinador": "Sucre",
        "telefono": "(809) 308-3411",
        "capacidad": "",
        "lat": "-69.950276",
        "lng": "18.479903"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010135",
        "edificio": "Escuela Hermana Mirabal",
        "coordinador": "Juan Cabrera",
        "telefono": "(829) 444-5936",
        "capacidad": "",
        "lat": "-69.923959",
        "lng": "18.488157"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010136",
        "edificio": "Iglesia Asamble De Dios",
        "coordinador": "Juan Perez",
        "telefono": "(829) 333-5555",
        "capacidad": "1,085 personas",
        "lat": "-69.923665",
        "lng": "18.488326"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010137",
        "edificio": "Escuela San Miguel",
        "coordinador": "Juan Mateo",
        "telefono": "(829) 444-5936",
        "capacidad": "",
        "lat": "-69.923912",
        "lng": "18.488128"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010139",
        "edificio": "Iglesia San Pedro",
        "coordinador": "Juan Perez",
        "telefono": "(828) 555-6677",
        "capacidad": "",
        "lat": "-69.923789",
        "lng": "18.488342"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010140",
        "edificio": "Centro Educativo Republica De Chile",
        "coordinador": "Juan Mateo",
        "telefono": "(829) 555-5555",
        "capacidad": "",
        "lat": "-69.923937",
        "lng": "18.488163"
      },
      {
        "ciudad": "Santo Domingo de Guzmán",
        "codigo": "DO-010141",
        "edificio": "Funerarias Municipal Funeraria La Zurza",
        "coordinador": "Andres Astacio",
        "telefono": "(809) 773-7567",
        "capacidad": "457 personas",
        "lat": "-69.91216",
        "lng": "18.50628"
      },
      {
        "ciudad": "Neiba",
        "codigo": "DO-030004",
        "edificio": "Iglesia San Bartolomė",
        "coordinador": "Ervis Roman",
        "telefono": "(829) 233-4780",
        "capacidad": "-",
        "lat": "-71.415049",
        "lng": "18.489044"
      },
      {
        "ciudad": "Neiba",
        "codigo": "DO-030034",
        "edificio": "Liceo Ernestina Gonzales",
        "coordinador": "Altagracia Ferreras",
        "telefono": "(849) 272-3225",
        "capacidad": "214 personas",
        "lat": "-71.410055",
        "lng": "18.488271"
      },
      {
        "ciudad": "Neiba",
        "codigo": "DO-030035",
        "edificio": "Escuela Pedro Mir El Manguito",
        "coordinador": "Deisi Gonzales",
        "telefono": "(829) 302-3471",
        "capacidad": "600 personas",
        "lat": "-71.441158",
        "lng": "18.518214"
      },
      {
        "ciudad": "Tamayo",
        "codigo": "DO-030014",
        "edificio": "Liceo María Antonia Gómez",
        "coordinador": "Francisco Del Rosario Sanchez",
        "telefono": "(809) 708-7323",
        "capacidad": "-",
        "lat": "-71.199621",
        "lng": "18.48599"
      },
      {
        "ciudad": "Cristóbal",
        "codigo": "DO-030016",
        "edificio": "Liceo Fernando Taveras",
        "coordinador": "Doris Santiago Oviedo Mendez",
        "telefono": "(809) 889-0961",
        "capacidad": "57 personas",
        "lat": "-71.340262",
        "lng": "18.395517"
      },
      {
        "ciudad": "Villa Jaragua",
        "codigo": "DO-030022",
        "edificio": "Escuela Básica/Primaria Anacaona",
        "coordinador": "Dalireinis Hernandez",
        "telefono": "(829) 426-8079",
        "capacidad": "137 personas",
        "lat": "-71.490188",
        "lng": "18.50667"
      },
      {
        "ciudad": "Villa Jaragua",
        "codigo": "DO-030023",
        "edificio": "Escuela Básica/Primaria José Altagracia Ferreras",
        "coordinador": "Silfida Antonia Diaz Matos",
        "telefono": "(829) 820-7321",
        "capacidad": "23 personas",
        "lat": "-71.486503",
        "lng": "18.486053"
      },
      {
        "ciudad": "Los Rios",
        "codigo": "DO-030026",
        "edificio": "Liceo Prof. Humberto Recio",
        "coordinador": "Saira Rivas",
        "telefono": "(829) 877-4226",
        "capacidad": "10 personas",
        "lat": "-71.587785",
        "lng": "18.491807"
      },
      {
        "ciudad": "Los Rios",
        "codigo": "DO-030027",
        "edificio": "Escuela Básica/Primaria Gregorio Luperón",
        "coordinador": "Ileana Ledesma",
        "telefono": "(829) 852-5402",
        "capacidad": "-",
        "lat": "-71.591205",
        "lng": "18.49222"
      },
      {
        "ciudad": "Los Rios",
        "codigo": "DO-030028",
        "edificio": "Escuela Básica/Primaria Hermanas Mirabal",
        "coordinador": "Advincula Rivas Sierra",
        "telefono": "(829) 261-8173",
        "capacidad": "55 personas",
        "lat": "-71.581162",
        "lng": "18.488463"
      },
      {
        "ciudad": "Los Rios",
        "codigo": "DO-030029",
        "edificio": "Centro Educativo Juan Pablo Duarte",
        "coordinador": "María Micaela Novas",
        "telefono": "(829) 539-3190",
        "capacidad": "-",
        "lat": "-71.588285",
        "lng": "18.498183"
      },
      {
        "ciudad": "Galván",
        "codigo": "DO-030030",
        "edificio": "Escuela Básica/Primaria Ulises Francisco Espaillat",
        "coordinador": "Dreilin Novas Mateo",
        "telefono": "(829) 395-2132",
        "capacidad": "46 personas",
        "lat": "-71.244945",
        "lng": "18.488263"
      },
      {
        "ciudad": "Galván",
        "codigo": "DO-030031",
        "edificio": "Liceo Anadilcia Santana",
        "coordinador": "Belen Mesa Novas",
        "telefono": "(809) 424-6219",
        "capacidad": "71 personas",
        "lat": "-71.251257",
        "lng": "18.518152"
      },
      {
        "ciudad": "Galván",
        "codigo": "DO-030032",
        "edificio": "Liceo Prof. Juan Emilio Bosch Y Gaviño",
        "coordinador": "Miguel Figuereo Novas",
        "telefono": "(829) 510-6141",
        "capacidad": "71 personas",
        "lat": "-71.202988",
        "lng": "18.526978"
      },
      {
        "ciudad": "Galván",
        "codigo": "DO-030033",
        "edificio": "Escuela Del Nivel Primario Aleris Magdaleno Montero",
        "coordinador": "Miguelina Mendez",
        "telefono": "(829) 948-0230",
        "capacidad": "-",
        "lat": "-71.202297",
        "lng": "18.518502"
      }
  ];

  const renderItem = ({ item }: { item: ShelterItem }) => (
    <View style={styles.item}>
      <Text>{item.ciudad}</Text>
      <Text>{item.edificio}</Text>
      <Text>{item.coordinador}</Text>
      <Text>{item.telefono}</Text>
      <Text>{item.capacidad}</Text>
      <Text>{item.lat}</Text>
      <Text>{item.lng}</Text>
    </View>
  );

  const filteredData = data.filter(item =>
    item.ciudad.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por ciudad..."
        onChangeText={text => setSearch(text)}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.codigo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default SheltersScreen;
