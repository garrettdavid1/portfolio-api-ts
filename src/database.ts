import mongoose from "mongoose";
import { appConfig } from './config/appConfig';

const mongoClientOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: appConfig.mongo.devDbName
}

mongoose.connect(appConfig.mongo.connectionString, mongoClientOptions, (err: any) => {
	if (err) {
	  console.log(err.message);
	} else {
	  console.log("Successfully connected to MongoDB");
	}
});