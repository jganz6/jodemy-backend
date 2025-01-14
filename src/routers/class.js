const Router = require("express").Router();
const classHandler = require("../handlers/class");
const verifyToken = require("../middlewares/verifyToken");
const multerUploadImage = require("../middlewares/uploadImages");
//-------------------------------Student
Router.get(
  "/allSchedule",
  verifyToken.student,
  classHandler.getAllScheduleClass
);
Router.get("/forYouClass", verifyToken.student, classHandler.getForYouClass);
Router.get("/myClass", verifyToken.student, classHandler.getMyClass);
Router.get("/newClass", verifyToken.student, classHandler.getNewClass);
Router.get(
  "/subjectClass/:id_class",
  verifyToken.student,
  classHandler.getSubjectClass
);
Router.post("/register", verifyToken.student, classHandler.registerClass);
//-------------------------------FACILITATOR
Router.get(
  "/scheduleList",
  verifyToken.facilitator,
  classHandler.getScheduleFacilitator
);
Router.get(
  "/list",
  verifyToken.facilitator,
  classHandler.getAllClassAndStudent
);
Router.get(
  "/members/:id_class",
  verifyToken.facilitator,
  classHandler.getMemberClass
);
Router.get(
  "/subjectByIdFacilitator/:id_class",
  verifyToken.facilitator,
  classHandler.getSubjectClassFacilitator
);
Router.get(
  "/members/subject/:id_account.:id_class",
  verifyToken.facilitator,
  classHandler.getMemberSubjectClass
);
Router.post(
  "/",
  verifyToken.facilitator,
  multerUploadImage.single("image"),
  classHandler.createClass
);
Router.post(
  "/subject",
  verifyToken.facilitator,
  classHandler.createSubjectClass
);
Router.patch(
  "/:id_class",
  verifyToken.facilitator,
  multerUploadImage.single("image"),
  classHandler.updateClass
);
Router.patch(
  "/subject/:id_subject",
  verifyToken.facilitator,
  classHandler.updateSubjectClass
);
Router.patch(
  "/addScore/:id_account",
  verifyToken.facilitator,
  classHandler.updateScore
);
Router.delete("/:id_class", verifyToken.facilitator, classHandler.deleteClass);
Router.delete(
  "/subject/:id_subject",
  verifyToken.facilitator,
  classHandler.deleteSubjectClass
);
//===============PUBLIC===================
Router.get("/", verifyToken.allRole, classHandler.getAllClass);
module.exports = Router;
