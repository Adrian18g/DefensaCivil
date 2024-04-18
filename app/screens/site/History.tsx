import React from "react";
import { View, Text , StyleSheet} from "react-native";

const History: React.FC = () => {
  return (
    <View style={styles.container}>
        <View style={styles.card}>
      <Text style={styles.paragraph}>
        Antes del año 1966, cuando llegaba la temporada de huracanes, un grupo
        de radioaficionados se reunía en la Cruz Roja para estar atentos por si
        surgía algún tipo de emergencia, inmediatamente ponerse a disposición y
        ayudar en todo lo posible, inclusive, usando sus propios equipos de
        comunicación para así tener contacto con el exterior en caso de que las
        redes telefónicas resultaran afectadas.
      </Text>
      <Text style={styles.paragraph}>
        Al surgir el triunvirato fue designado el Dr. Rafael Cantizano Arias,
        como presidente de la Cruz Roja y al mismo tiempo nombraron al Ing.
        Carlos D´ Franco como director de la Defensa Civil, quien con un grupo
        compuesto por seis personas, se instaló en la calle Francia esquina
        Galván, siendo esa la primera oficina de la Defensa Civil.
      </Text>

      <Text style={styles.paragraph}>
        Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García
        Godoy, a los diecisiete días del mes de junio de 1966, fue promulgada la
        Ley 257, mediante la cual fue creada la Defensa Civil, institución
        dependiente de la Secretaría Administrativa de la Presidencia (ahora
        Ministerio de la Presidencia) y quien en la actualidad preside la
        Comisión Nacional de Emergencias.
      </Text>
    </View>
    </View>
  );
};

export default History;

//style para mis parrafos y para el titulo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    padding:10
  },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textDecorationLine: "underline",
    },
    paragraph: {
        padding: 6,
        textAlign: 'justify',
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

});
