/***********************************************************************
 * Module:  Administrateur.java
 * Author:  eyaha
 * Purpose: Defines the Class Administrateur
 ***********************************************************************/

import java.util.*;

/** @pdOid c7205f2a-28ba-4545-aace-a6012a526a95 */
public class Administrateur extends Utilisateur {
   /** @pdOid 54c83956-633b-44ed-9db9-e9bf95afa107 */
   private string attribut1;
   
   /** @pdRoleInfo migr=no name=Voucher assc=association7 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Voucher> voucher;
   
   /** @param parametre1
    * @pdOid 62c0e58f-3c86-4da1-9805-679c5e5c1015 */
   public void addUser(Utilisateur parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1 
    * @param parametre2
    * @pdOid 18d5cc78-16eb-4b7a-893b-1a396720cd5e */
   public void operation2(int parametre1, string parametre2) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid f6d572e4-0ebb-4fb9-8fec-93180b663e1e */
   public void operation3(int parametre1) {
      // TODO: implement
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Voucher> getVoucher() {
      if (voucher == null)
         voucher = new java.util.HashSet<Voucher>();
      return voucher;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorVoucher() {
      if (voucher == null)
         voucher = new java.util.HashSet<Voucher>();
      return voucher.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newVoucher */
   public void setVoucher(java.util.Collection<Voucher> newVoucher) {
      removeAllVoucher();
      for (java.util.Iterator iter = newVoucher.iterator(); iter.hasNext();)
         addVoucher((Voucher)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newVoucher */
   public void addVoucher(Voucher newVoucher) {
      if (newVoucher == null)
         return;
      if (this.voucher == null)
         this.voucher = new java.util.HashSet<Voucher>();
      if (!this.voucher.contains(newVoucher))
         this.voucher.add(newVoucher);
   }
   
   /** @pdGenerated default remove
     * @param oldVoucher */
   public void removeVoucher(Voucher oldVoucher) {
      if (oldVoucher == null)
         return;
      if (this.voucher != null)
         if (this.voucher.contains(oldVoucher))
            this.voucher.remove(oldVoucher);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllVoucher() {
      if (voucher != null)
         voucher.clear();
   }

}