import { IManager } from "@/interface/IManager"
import { IOwner } from "@/interface/IOwner"
import axios from "axios"

export class AuthService {
  static baseUrl = "http://localhost:4000/auth"

  static async registerCompany(name: string, email: string, password: string) {
    const resp = (await axios.post(`${this.baseUrl}/register`, { name, email, password })).data
    return resp as { resp: string, token: string, refresh: string, owner: IOwner }
  }
  static async loginAdmin(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/login/${email}/${password}`)).data
    return resp as { resp: string, token: string, refresh: string, owner: IOwner }
  }

  static async loginManager(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/login/manager/${email}/${password}`)).data
    return resp as { resp: string, token: string, refresh: string, manager: IManager }
  }
}