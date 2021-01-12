import { BaseRepository } from "../base/BaseRepository";
import ConnectRequest, { IConnectRequest } from "../../models/connectRequest";

class ConnectRequestRepository extends BaseRepository<IConnectRequest> {
	constructor(){
		if(ConnectRequest) super(ConnectRequest);
	}
}

Object.freeze(ConnectRequestRepository);
export const ConnectRequestRepo = new ConnectRequestRepository();