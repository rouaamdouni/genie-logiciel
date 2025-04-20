/***********************************************************************
 * Module:  Instructeur.java
 * Author:  eyaha
 * Purpose: Defines the Class Instructeur
 ***********************************************************************/

import java.util.*;

/** @pdOid a4ad6bf8-bff1-460b-aace-3742a96f4356 */
public class Instructeur extends Utilisateur {
   /** @pdOid 7791439a-c6c4-4a42-9110-998593ab278a */
   private string attribut1;
   
   /** @pdRoleInfo migr=no name=Path assc=association5 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Path> path;
   /** @pdRoleInfo migr=no name=AvancementEtudiant assc=association11 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<AvancementEtudiant> avancementEtudiant;
   
   /** @param parametre1
    * @pdOid 088fa469-c1a5-4ab3-963f-d10988475dc4 */
   public void operation1(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 8a99ebbd-17b0-42a1-a34a-48701a6a3e33 */
   public void operation2(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 888a4f11-58f9-47a6-b0a1-96dbe1693560 */
   public void operation3(int parametre1) {
      // TODO: implement
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Path> getPath() {
      if (path == null)
         path = new java.util.HashSet<Path>();
      return path;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorPath() {
      if (path == null)
         path = new java.util.HashSet<Path>();
      return path.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newPath */
   public void setPath(java.util.Collection<Path> newPath) {
      removeAllPath();
      for (java.util.Iterator iter = newPath.iterator(); iter.hasNext();)
         addPath((Path)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newPath */
   public void addPath(Path newPath) {
      if (newPath == null)
         return;
      if (this.path == null)
         this.path = new java.util.HashSet<Path>();
      if (!this.path.contains(newPath))
         this.path.add(newPath);
   }
   
   /** @pdGenerated default remove
     * @param oldPath */
   public void removePath(Path oldPath) {
      if (oldPath == null)
         return;
      if (this.path != null)
         if (this.path.contains(oldPath))
            this.path.remove(oldPath);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllPath() {
      if (path != null)
         path.clear();
   }
   /** @pdGenerated default getter */
   public java.util.Collection<AvancementEtudiant> getAvancementEtudiant() {
      if (avancementEtudiant == null)
         avancementEtudiant = new java.util.HashSet<AvancementEtudiant>();
      return avancementEtudiant;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorAvancementEtudiant() {
      if (avancementEtudiant == null)
         avancementEtudiant = new java.util.HashSet<AvancementEtudiant>();
      return avancementEtudiant.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newAvancementEtudiant */
   public void setAvancementEtudiant(java.util.Collection<AvancementEtudiant> newAvancementEtudiant) {
      removeAllAvancementEtudiant();
      for (java.util.Iterator iter = newAvancementEtudiant.iterator(); iter.hasNext();)
         addAvancementEtudiant((AvancementEtudiant)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newAvancementEtudiant */
   public void addAvancementEtudiant(AvancementEtudiant newAvancementEtudiant) {
      if (newAvancementEtudiant == null)
         return;
      if (this.avancementEtudiant == null)
         this.avancementEtudiant = new java.util.HashSet<AvancementEtudiant>();
      if (!this.avancementEtudiant.contains(newAvancementEtudiant))
         this.avancementEtudiant.add(newAvancementEtudiant);
   }
   
   /** @pdGenerated default remove
     * @param oldAvancementEtudiant */
   public void removeAvancementEtudiant(AvancementEtudiant oldAvancementEtudiant) {
      if (oldAvancementEtudiant == null)
         return;
      if (this.avancementEtudiant != null)
         if (this.avancementEtudiant.contains(oldAvancementEtudiant))
            this.avancementEtudiant.remove(oldAvancementEtudiant);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllAvancementEtudiant() {
      if (avancementEtudiant != null)
         avancementEtudiant.clear();
   }

}