import axios from "axios";
import { TokenService } from "@/store/services/authToken";

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token",
    headers: { Authorization: `Bearer ${TokenService.getToken()}` }
});

export default instance;
