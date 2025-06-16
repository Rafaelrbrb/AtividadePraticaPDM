import{ db } from "../src/firebaseConnection";
import{ collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext} from "react";
import { AuthContext} from "../src/auth-contexto";
import ListaAssinaturas from "../components/assinatura/ListaAssinaturas";

export default function ListaCompleta() {
  const { uid } = useContext(AuthContext);
  const[assinaturas, setAssinaturas] = useState([]);

  useEffect(() => {
    if(!uid) return;
  
    const unsubscribe = onSnapshot(
      collection(db,`usuarios/${uid}/assinaturas`),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAssinaturas(lista);
      }
    );
  
    return () => unsubscribe;
  }, [uid]);
  
  return (
    <ListaAssinaturas assinaturas={assinaturas} titulo="Minhas Assinaturas" />
  );
}
