Rafael Rodrigues Barbosa - 2212130042  
Davi Mendes Paraiso Carvalho - 2212130041

1. **Instalar dependências do projeto:**

Dentro da pasta raiz do projeto, execute:

expo install @react-navigation/native
expo install @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
expo install @react-native-firebase/app
expo install @react-native-firebase/firestore
expo install react-native-vector-icons

2. **Criar uma pasta src/fireBaseConnections e adicionar as credenciais enviadas em pdf**

3. **As pastas devem ser organizadas da seguinte forma:**
├── App.js
├── metro.config.js
├── components/
│   ├── IconButton.js
│   └── assinatura/
│       └── ListaAssinatura.js
├── screens/
│   ├── AdicionarAssinatura.js
│   ├── ListaCompleta.js
│   └── TelaInicial.js
├── src/
│   ├── fireBaseConnections.js
│   └── auth-contexto.js



4-**Utilizar o npx expo start para iniciar o aplicativo e conectar via emulador de android ou pelo próprio celular**
