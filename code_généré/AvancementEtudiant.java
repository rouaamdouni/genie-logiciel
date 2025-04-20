/***********************************************************************
 * Module:  AvancementEtudiant.java
 * Author:  eyaha
 * Purpose: Defines the Class AvancementEtudiant
 ***********************************************************************/

import java.util.*;

/** @pdOid 522e1a63-c650-4ba9-be38-a97a9a929497 */
public class AvancementEtudiant {
   /** @pdOid 1b326927-1d7a-4ebe-a13d-1f139317f3e7 */
   private string attribut1;
   /** @pdOid 1186cae8-7645-4b44-a570-9f6ffb5ee06d */
   private int attribut2;
   
   /** @pdRoleInfo migr=no name=Etudiant assc=association10 mult=0..1 */
   public Etudiant etudiant;

}