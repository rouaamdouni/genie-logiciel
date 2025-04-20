/***********************************************************************
 * Module:  Etudiant.java
 * Author:  eyaha
 * Purpose: Defines the Class Etudiant
 ***********************************************************************/

import java.util.*;

/** @pdOid db96db77-831d-489c-a8e9-7caeae788da3 */
public class Etudiant extends Utilisateur {
   /** @pdOid 2d61b720-c787-477b-a552-92e8ab606b52 */
   private string attribut1;
   
   /** @pdRoleInfo migr=no name=Voucher assc=association9 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Voucher> voucher;
   public java.util.Collection association12;
   
   /** @pdOid 18f38ea3-9309-4c12-be77-5bd4c249cda4 */
   public void operation1() {
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