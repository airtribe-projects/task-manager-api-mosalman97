import express from "express";
import dotenv from "dotenv";
import router from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/tasks", router);

app.listen(PORT, (err) => {
	if (err) {
		return console.log("Something bad happened", err);
	}
	console.log(`Server is listening on ${PORT}`);
});

export default app;
