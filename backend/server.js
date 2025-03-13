import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import buddyFinder from "./routes/buddyFinder.js";
import studentProjects from "./routes/studentProjects.js";
import startupProjects from "./routes/startupProjects.js";
import researchProjects from "./routes/researchProjects.js";
import feedback from "./routes/feedback.js";
import mentorship from "./routes/mentorship.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/buddy-finder", buddyFinder);
app.use("/student-projects", studentProjects);
app.use("/startup-projects", startupProjects);
app.use("/research-projects", researchProjects);
app.use("/mentorship", mentorship);
app.use("/", feedback);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});