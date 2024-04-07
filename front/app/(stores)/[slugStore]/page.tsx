'use client'
import { useEffect, useState } from "react"
import CardsItemShop, { CardsItemShopProps } from "./components/CardsItemsShop"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import YourCart from "./components/YourCart"
import { FlavorsController } from "@/controller/FlavorsController"
import { StockController } from "@/controller/StockController"
import { IStockStore } from "@/interface/IStockStore"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { RevenueController } from "@/controller/RevenueController"

const Store = () => {

  const store = useCurrentStore()
  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()

  useEffect(() => {
    if (store) {
      loadData()
    }
  }, [store])

  async function loadData() {
    const respStock = await StockController.getByStoreId(store.id)
    if (respStock) {
      setStock(respStock)
      const respFlavor = await FlavorsController.getAllByStockId(respStock.id)
      if (respFlavor) {
        setFlavors(respFlavor)
      }
    }
    const respRevenue = await RevenueController.getByStoreId(store.id)
    if (respRevenue) {
      setRevenue(respRevenue)
    }
  }

  const itemsShop = [
    {
      name: "Morango",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Morango")?.quantity,
      price: pricesOfIceCream.Morango,
      image: "/assets/flavors/morango.jpg",
      className: "w-[11rem]",
    }, {
      name: "Chocolate",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Chocolate")?.quantity,
      price: pricesOfIceCream.Chocolate,
      image: "/assets/flavors/chocolate.png",
      className: "w-[11rem]",
    }, {
      name: "Baunilha",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Baunilha")?.quantity,
      price: pricesOfIceCream.Baunilha,
      image: "/assets/flavors/baunilha.png",
      className: "w-[10rem]",
    }, {
      name: "Casquinha",
      remainingQuantity: stock?.cone,
      price: pricesOfIceCream.Cone,
      image: "/assets/flavors/casquinha.png",
      className: "w-[7rem]",
    },
  ] as CardsItemShopProps[]

  return (
    <main className="flex flex-col items-center pt-10">
      {store && flavors && stock && revenue &&
        <div className="flex w-full max-w-[60rem] gap-10">

          <div className="flex gap-5 flex-wrap justify-evenly w-full">
            {itemsShop.map(item =>
              item.remainingQuantity !== 0 &&
              <CardsItemShop {...item} />
            )}
          </div>

          <YourCart stock={stock} flavors={flavors} revenue={revenue} />

        </div>
      }
    </main>
  )
}
export default Store