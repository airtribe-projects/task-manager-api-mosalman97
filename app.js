import express from "express";
import router from "./routes/taskRoutes.js";

const app = express();
const port = 3222;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/tasks", router);

app.listen(port, (err) => {
	if (err) {
		return console.log("Something bad happened", err);
	}
	console.log(`Server is listening on ${port}`);
});


