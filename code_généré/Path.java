/***********************************************************************
 * Module:  Path.java
 * Author:  eyaha
 * Purpose: Defines the Class Path
 ***********************************************************************/

import java.util.*;

/** @pdOid 6a1fc3e7-2ae7-4e19-acef-300cd2f98e4e */
public class Path {
   /** @pdOid daa5023e-9dd4-4792-aa32-16431d2a16ef */
   private string pathId;
   /** @pdOid c7c81a64-92d3-4167-96f1-5e75966de9f6 */
   private string attribut2;
   /** @pdOid b9b7c9c1-3483-40b7-a438-ae5e9fef85bf */
   private string attribut3;
   /** @pdOid 841227f5-86a3-4585-a18f-816c9cbb3d42 */
   private int attribut4;
   
   /** @pdRoleInfo migr=no name=Node assc=association1 coll=java.util.Collection impl=java.util.HashSet mult=0..* type=Composition */
   public java.util.Collection<Node> node;
   /** @pdRoleInfo migr=no name=Etudiant assc=association6 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Etudiant> etudiant;
   /** @pdRoleInfo migr=no name=Voucher assc=association8 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Voucher> voucher;
   
   /** @param parametre1
    * @pdOid 2d16f644-cc10-4858-ad52-59efefdc9e70 */
   public void addNode(Node parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1 
    * @param parametre2
    * @pdOid 2f82746b-04a3-4a41-95b2-e45959e5e15f */
   public void operation2(int parametre1, string parametre2) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid b2f56376-10a2-4ea8-8418-f0f634ce242f */
   public void operation3(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 6ff5d40c-ce45-4618-960e-1b8679e67db1 */
   public void operation4(int parametre1) {
      // TODO: implement
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Node> getNode() {
      if (node == null)
         node = new java.util.HashSet<Node>();
      return node;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorNode() {
      if (node == null)
         node = new java.util.HashSet<Node>();
      return node.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newNode */
   public void setNode(java.util.Collection<Node> newNode) {
      removeAllNode();
      for (java.util.Iterator iter = newNode.iterator(); iter.hasNext();)
         addNode((Node)iter.next());
   }
   
   /** @pdGenerated default remove
     * @param oldNode */
   public void removeNode(Node oldNode) {
      if (oldNode == null)
         return;
      if (this.node != null)
         if (this.node.contains(oldNode))
            this.node.remove(oldNode);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllNode() {
      if (node != null)
         node.clear();
   }
   /** @pdGenerated default getter */
   public java.util.Collection<Etudiant> getEtudiant() {
      if (etudiant == null)
         etudiant = new java.util.HashSet<Etudiant>();
      return etudiant;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorEtudiant() {
      if (etudiant == null)
         etudiant = new java.util.HashSet<Etudiant>();
      return etudiant.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newEtudiant */
   public void setEtudiant(java.util.Collection<Etudiant> newEtudiant) {
      removeAllEtudiant();
      for (java.util.Iterator iter = newEtudiant.iterator(); iter.hasNext();)
         addEtudiant((Etudiant)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newEtudiant */
   public void addEtudiant(Etudiant newEtudiant) {
      if (newEtudiant == null)
         return;
      if (this.etudiant == null)
         this.etudiant = new java.util.HashSet<Etudiant>();
      if (!this.etudiant.contains(newEtudiant))
         this.etudiant.add(newEtudiant);
   }
   
   /** @pdGenerated default remove
     * @param oldEtudiant */
   public void removeEtudiant(Etudiant oldEtudiant) {
      if (oldEtudiant == null)
         return;
      if (this.etudiant != null)
         if (this.etudiant.contains(oldEtudiant))
            this.etudiant.remove(oldEtudiant);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllEtudiant() {
      if (etudiant != null)
         etudiant.clear();
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