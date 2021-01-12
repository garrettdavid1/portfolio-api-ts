import mongoose from "mongoose";

export const startDB = () => {
	const mongoClientOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'Portfolio'
	}

	mongoose.connect(process.env.MONGO_CONNECTION_STRING ?? '', mongoClientOptions, (err: any) => {
		if (err) {
		  console.log(err.message);
		} else {
		  console.log("Successfully connected to MongoDB");
		}
	});
}