/***********************************************************************
 * Module:  Quiz.java
 * Author:  eyaha
 * Purpose: Defines the Class Quiz
 ***********************************************************************/

import java.util.*;

/** @pdOid 3cef3d7c-afcf-4450-b4df-f597b30b2e57 */
public class Quiz extends Node {
   /** @pdOid 2b6b32b5-3dd8-4b2c-960c-a581060d1e3f */
   private number subQuizzesCount<spanStyle_"backgroundcolor;
   /** @pdOid 2c0f0648-0c29-4a33-9be9-6fa5f67bcaed */
   private int attribut2;
   
   /** @pdRoleInfo migr=no name=SubQuiz assc=association3 coll=java.util.Collection impl=java.util.HashSet mult=0..* type=Composition */
   public java.util.Collection<SubQuiz> subQuiz;
   
   /** @pdOid 97ae0290-5674-48cf-8b6c-d4e7d655479b */
   public int operation1() {
      // TODO: implement
      return 0;
   }
   
   
   /** @pdGenerated default getter */
   public java.util.Collection<SubQuiz> getSubQuiz() {
      if (subQuiz == null)
         subQuiz = new java.util.HashSet<SubQuiz>();
      return subQuiz;
   }
   
   /** @pdGenerated default iterator getter */
   public java.util.Iterator getIteratorSubQuiz() {
      if (subQuiz == null)
         subQuiz = new java.util.HashSet<SubQuiz>();
      return subQuiz.iterator();
   }
   
   /** @pdGenerated default setter
     * @param newSubQuiz */
   public void setSubQuiz(java.util.Collection<SubQuiz> newSubQuiz) {
      removeAllSubQuiz();
      for (java.util.Iterator iter = newSubQuiz.iterator(); iter.hasNext();)
         addSubQuiz((SubQuiz)iter.next());
   }
   
   /** @pdGenerated default add
     * @param newSubQuiz */
   public void addSubQuiz(SubQuiz newSubQuiz) {
      if (newSubQuiz == null)
         return;
      if (this.subQuiz == null)
         this.subQuiz = new java.util.HashSet<SubQuiz>();
      if (!this.subQuiz.contains(newSubQuiz))
         this.subQuiz.add(newSubQuiz);
   }
   
   /** @pdGenerated default remove
     * @param oldSubQuiz */
   public void removeSubQuiz(SubQuiz oldSubQuiz) {
      if (oldSubQuiz == null)
         return;
      if (this.subQuiz != null)
         if (this.subQuiz.contains(oldSubQuiz))
            this.subQuiz.remove(oldSubQuiz);
   }
   
   /** @pdGenerated default removeAll */
   public void removeAllSubQuiz() {
      if (subQuiz != null)
         subQuiz.clear();
   }

}