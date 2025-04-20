/***********************************************************************
 * Module:  CreateurDeContenu.java
 * Author:  eyaha
 * Purpose: Defines the Class CreateurDeContenu
 ***********************************************************************/

import java.util.*;

/** @pdOid 0b900b32-83ea-4640-bf28-e69353a7fb35 */
public class CreateurDeContenu extends Utilisateur {
   /** @pdOid 2be883b6-795c-4208-85a7-79ed611a0985 */
   private string attribut1;
   
   /** @pdRoleInfo migr=no name=Challenge assc=association2 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Challenge> challenge;
   /** @pdRoleInfo migr=no name=Path assc=association4 coll=java.util.Collection impl=java.util.HashSet mult=0..* */
   public java.util.Collection<Path> path;
   
   /** @param parametre1
    * @pdOid 52cb3b00-b8c2-4a3d-896e-96739cd5e521 */
   public void addPath(Path parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid c54a6921-89a6-4cc9-8754-0a032f8f2e6f */
   public void addChallenge(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 1c79f9b4-2fda-4fd2-8416-4d7a7d68e3ce */
   public void operation3(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 62d50a65-267e-476c-8e3b-be8f7943a30a */
   public void operation4(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 2e60cbd6-1208-4805-9289-b839d3bddcb0 */
   public void operation5(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid b36ba7e4-297c-4c0d-964f-183c66f62c27 */
   public void operation6(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1
    * @pdOid 85f8ed00-1863-4467-8f90-75a2112f948a */
   public void operation7(int parametre1) {
      // TODO: implement
   }
   
   /** @param parametre1 
    * @param parametre2
    * @pdOid 4898e568-0eea-453e-8844-1db08df9de99 */
   public void operation8(int parametre1, string parametre2) {
      // TODO: implement
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<Challenge> getChallenge() {
      if (challenge == null)
         challenge = new java.util.HashSet<Challenge>();
      return challenge;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorChallenge() {
      if (challenge == null)
         challenge = new java.util.HashSet<Challenge>();
      return challenge.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newChallenge */
   public void setChallenge(java.util.Collection<Challenge> newChallenge) {
      removeAllChallenge();
      for (java.util.Iterator iter = newChallenge.iterator(); iter.hasNext();)
         addChallenge((Challenge)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newChallenge */
   public void addChallenge(Challenge newChallenge) {
      if (newChallenge == null)
         return;
      if (this.challenge == null)
         this.challenge = new java.util.HashSet<Challenge>();
      if (!this.challenge.contains(newChallenge))
         this.challenge.add(newChallenge);
   }
   
   /** @pdGenerated default remove
     * @param oldChallenge */
   public void removeChallenge(Challenge oldChallenge) {
      if (oldChallenge == null)
         return;
      if (this.challenge != null)
         if (this.challenge.contains(oldChallenge))
            this.challenge.remove(oldChallenge);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllChallenge() {
      if (challenge != null)
         challenge.clear();
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

}