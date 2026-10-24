import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [escenaActual, setEscenaActual] = useState('principal');
  const [operacionActual, setOperacionActual] = useState('0');
  const [operacionPrevia, setOperacionPrevia] = useState('');
  const [operador, setOperador] = useState(null);

  const presionarNumero = (numero) => {
    if (numero === '.' && operacionActual.includes('.')) return;
    if (operacionActual === '0' && numero !== '.') {
      setOperacionActual(numero);
    } else {
      setOperacionActual(operacionActual + numero);
    }
  };

  const presionarOperacion = (op) => {
    if (operacionActual === '') return;
    if (operacionPrevia !== '') {
      calcularResultado();
    } else {
      setOperacionPrevia(operacionActual);
      setOperacionActual('');
    }
    setOperador(op);
  };

  const limpiarTodo = () => {
    setOperacionActual('0');
    setOperacionPrevia('');
    setOperador(null);
  };

  const borrarUltimo = () => {
    if (operacionActual.length <= 1) {
      setOperacionActual('0');
    } else {
      setOperacionActual(operacionActual.slice(0, -1));
    }
  };

  const calcularResultado = () => {
    const anterior = parseFloat(operacionPrevia);
    const actual = parseFloat(operacionActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    let resultado = 0;
    switch (operador) {
      case '+': resultado = anterior + actual; break;
      case '-': resultado = anterior - actual; break;
      case '*': resultado = anterior * actual; break;
      case '/': resultado = actual !== 0 ? anterior / actual : 'Error'; break;
      default: return;
    }

    setOperacionActual(resultado.toString());
    setOperacionPrevia('');
    setOperador(null);
  };

  if (escenaActual === 'principal') {
    return (
      <SafeAreaView style={styles.contenedorFondo}>
        <StatusBar barStyle="light-content" />
        <View style={styles.contenedorPrincipal}>
          <View style={styles.tarjetaBienvenida}>
            <Text style={styles.tituloPrincipal}>Calculadora React</Text>
            <Text style={styles.subtituloPrincipal}>Proyecto Final - Nivel Avanzado</Text>
            <TouchableOpacity style={styles.botonIrCalculadora} onPress={() => setEscenaActual('calculadora')}>
              <Text style={styles.textoBotonIr}>Ir a la Calculadora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedorFondo}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contenedorCalculadora}>
        
        <View style={styles.barraNavegacion}>
          <TouchableOpacity style={styles.botonVolver} onPress={() => setEscenaActual('principal')}>
            <Text style={styles.textoVolver}>{'< Volver al Inicio'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contenedorDisplay}>
          <Text style={styles.textoHistorial}>{operacionPrevia} {operador}</Text>
          <Text style={styles.textoResultado} numberOfLines={1} adjustsFontSizeToFit>{operacionActual || '0'}</Text>
        </View>
        
        <View style={styles.contenedorTeclado}>
          <View style={styles.filaBotones}>
            <TouchableOpacity style={[styles.boton, styles.botonControl]} onPress={limpiarTodo}><Text style={styles.textoBotonControl}>C</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonControl]} onPress={borrarUltimo}><Text style={styles.textoBotonControl}>DEL</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonOperacion]} onPress={() => presionarOperacion('/')}><Text style={styles.textoBoton}>÷</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonOperacion]} onPress={() => presionarOperacion('*')}><Text style={styles.textoBoton}>×</Text></TouchableOpacity>
          </View>
          <View style={styles.filaBotones}>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('7')}><Text style={styles.textoBoton}>7</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('8')}><Text style={styles.textoBoton}>8</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('9')}><Text style={styles.textoBoton}>9</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonOperacion]} onPress={() => presionarOperacion('-')}><Text style={styles.textoBoton}>−</Text></TouchableOpacity>
          </View>
          <View style={styles.filaBotones}>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('4')}><Text style={styles.textoBoton}>4</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('5')}><Text style={styles.textoBoton}>5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('6')}><Text style={styles.textoBoton}>6</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonOperacion]} onPress={() => presionarOperacion('+')}><Text style={styles.textoBoton}>+</Text></TouchableOpacity>
          </View>
          <View style={styles.filaBotones}>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('1')}><Text style={styles.textoBoton}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('2')}><Text style={styles.textoBoton}>2</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('3')}><Text style={styles.textoBoton}>3</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonIgual]} onPress={calcularResultado}><Text style={styles.textoBoton}>=</Text></TouchableOpacity>
          </View>
          <View style={styles.filaBotones}>
            <TouchableOpacity style={[styles.boton, styles.botonCero]} onPress={() => presionarNumero('0')}><Text style={styles.textoBoton}>0</Text></TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => presionarNumero('.')}><Text style={styles.textoBoton}>.</Text></TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorFondo: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contenedorPrincipal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  tarjetaBienvenida: { width: '100%', backgroundColor: '#1E1E1E', borderRadius: 20, padding: 30, flexDirection: 'column', alignItems: 'center' },
  tituloPrincipal: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  subtituloPrincipal: { fontSize: 16, color: '#A5A5A5', marginBottom: 30, textAlign: 'center' },
  botonIrCalculadora: { backgroundColor: '#FF9500', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12, width: '100%', alignItems: 'center' },
  textoBotonIr: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  contenedorCalculadora: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },
  barraNavegacion: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  botonVolver: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#1E1E1E', borderRadius: 8 },
  textoVolver: { color: '#FF9500', fontSize: 16, fontWeight: '600' },
  contenedorDisplay: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#1E1E1E', margin: 15, padding: 20, borderRadius: 16 },
  textoHistorial: { color: '#A5A5A5', fontSize: 24, marginBottom: 5 },
  textoResultado: { color: '#FFFFFF', fontSize: 56, fontWeight: 'bold' },
  contenedorTeclado: { flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', paddingHorizontal: 15, paddingBottom: 20 },
  filaBotones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  boton: { flex: 1, height: 75, backgroundColor: '#333333', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  botonCero: { flex: 3 },
  botonControl: { backgroundColor: '#A5A5A5' },
  botonOperacion: { backgroundColor: '#FF9500' },
  botonIgual: { backgroundColor: '#28CD41' },
  textoBoton: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  textoBotonControl: { color: '#121212', fontSize: 24, fontWeight: 'bold' },
});