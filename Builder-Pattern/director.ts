const builder = new Builder()

const pathItems = builder
.addSuperSkill("SuperSkill HTML", "we will learn about forms", "https", 1, 45)
    .addSkill("Skill 1", "http", 15, 20)
    .addQuiz("Quiz 1", 21, 45, 1, 21)
    .addCheckpoint("Checkpoint about first super skill ", "difficult", 1, 21)
    .addSuperSkill("SuperSkill css", "we will learn about colors", "https", 1, 45)
    .addSkill("Skill 1", "http", 15, 20)
    .addQuiz("Quiz 1", 21, 45, 1, 21)
    .addCheckpoint("Checkpoint about first super skill ", "difficult", 1, 21)
    .addProject("finalProject","develop an e-commerce website",3,120)
    .getResult()


    //client

const path = new Path("Path number 1", "web dev", "https://ai.aws", pathItems)
path.show()