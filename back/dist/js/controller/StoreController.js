import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class StoreController {
    static async createStore(req, res) {
        const { data } = req.body;
        try {
            const checkIfExist = await prisma.store.findUnique({ where: { name: data.name } });
            const idStore = createUuid();
            if (!checkIfExist) {
                const company = await prisma.company.update({
                    where: { id: data.companyId }, data: {
                        storeId: idStore,
                        store: {
                            create: [{
                                    id: idStore,
                                    name: data.name,
                                    address: { create: { ...AddressController.create(data.address) } },
                                    revenue: { create: { ...RevenueController.create() } },
                                    stock: { create: { ...StockController.create() } },
                                }]
                        },
                    },
                });
                const store = await prisma.store.findUnique({ where: { id: idStore } });
                return res.status(201).json({ resp: "Sucess", data: store });
            }
            res.json({ resp: "Esta loja já existe!" });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async put(req, res) {
        try {
            const { storeId } = req.params;
            const { data } = req.body;
            const store = await prisma.store.update({ where: { id: storeId }, data });
            res.status(200).json({ resp: "Sucess", data: store });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getAllByIdCompany(req, res) {
        const { companyId } = req.params;
        try {
            const store = await prisma.store.findMany({ where: { companyId } });
            if (!store) {
                return res.json({ msg: "Lojas não encontradas" });
            }
            res.status(200).json({ msg: "Sucess", data: store });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async get(req, res) {
        try {
            const { storeId } = req.params;
            const store = await prisma.store.findUnique({ where: { id: storeId } });
            if (!store) {
                return res.json({ msg: "Loja não encontrada" });
            }
            res.status(200).json({ msg: "Sucess", data: store });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async delete(req, res) {
        try {
            const { storeId } = req.params;
            const store = await prisma.store.delete({ where: { id: storeId } });
            if (!store) {
                return res.json({ msg: "Loja não encontrada" });
            }
            res.status(200).json({ msg: "Sucess" });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default StoreController;
//# sourceMappingURL=StoreController.js.map