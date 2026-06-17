import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";

export async function logAdminAction(
  action: string,
  adminEmail: string | null | undefined,
  before: any = null,
  after: any = null
) {
  try {
    const db = getFirestore(getFirebaseApp());
    const auditRef = collection(db, "audit_logs");
    
    await addDoc(auditRef, {
      action,
      adminEmail: adminEmail || "unknown",
      timestamp: serverTimestamp(),
      before,
      after,
      // You could theoretically add IP here if passed from server-side, 
      // but from client-side we just log the action payload
    });
  } catch (error) {
    // Silently handle audit log errors to avoid breaking the app flow
    console.error("Failed to log admin action", error);
  }
}
