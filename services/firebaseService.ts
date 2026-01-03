
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc, query, orderBy, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSy_DEFAULT_KEY",
  authDomain: "builder-core-nordic.firebaseapp.com",
  projectId: "builder-core-nordic",
  storageBucket: "builder-core-nordic.appspot.com",
  messagingSenderId: "987654321",
  appId: "1:987654321:web:nordic-v1"
};

let db: any = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.warn("Nexus Bridge Restricted. Using Local Vault Engine.");
}

// NEXUS PRISMA ENGINE V9.0
export const db_engine = {
  project: {
    findMany: async () => {
      if (db) {
        try {
          const q = query(collection(db, "projects"), orderBy("updatedAt", "desc"));
          const snapshot = await getDocs(q);
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) { console.error("Cloud Node Sync Error:", e); }
      }
      return JSON.parse(localStorage.getItem('nexus_projects') || '[]')
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt);
    },
    upsert: async (project: any) => {
      const payload = { ...project, updatedAt: Date.now() };
      if (db) {
        try {
          await setDoc(doc(db, "projects", project.id), payload);
        } catch (e) { console.error("Cloud Node Write Error:", e); }
      }
      const local = JSON.parse(localStorage.getItem('nexus_projects') || '[]');
      const idx = local.findIndex((p: any) => p.id === project.id);
      if (idx >= 0) local[idx] = payload;
      else local.push(payload);
      localStorage.setItem('nexus_projects', JSON.stringify(local));
      return payload;
    },
    delete: async (id: string) => {
      if (db) {
        try { await deleteDoc(doc(db, "projects", id)); } catch (e) {}
      }
      const local = JSON.parse(localStorage.getItem('nexus_projects') || '[]');
      localStorage.setItem('nexus_projects', JSON.stringify(local.filter((p: any) => p.id !== id)));
    }
  },
  warehouse: {
    getStats: async (uid: string) => {
      const projects = await db_engine.project.findMany();
      const totalSize = projects.reduce((acc: number, p: any) => acc + (JSON.stringify(p).length), 0);
      return {
        used: totalSize,
        max: 1073741824 // 1GB
      };
    }
  }
};
