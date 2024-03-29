import { IOwner } from "@/interface/IOwner"
import { OwnerService } from "@/service/OwnerService"

export abstract class OwnerController {
  private static ownerService = OwnerService.getInstance()

  static async getAll(): Promise<IOwner[]> {
    return await this.ownerService.getAll()
  }

  static async get(id: string) {
    const owner = (await this.ownerService.get(id))
    if(owner.data){
      return owner.data!
    }
  }

  static async put(id: string, data: IOwner): Promise<void> {
    await this.ownerService.putData(id, data)
  }

  static async delete(id: string): Promise<void> {
    await this.ownerService.deleteData(id)
  }

}

