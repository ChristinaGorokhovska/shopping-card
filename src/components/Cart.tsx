import { useEffect, Fragment } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { UseStoreCart } from "../context/StoreCartContext";
import CartItem from "../components/CartItem";
import { Typography, Box } from "@mui/material";
import storeItems from "../dataDB/storeItems.json";
import currencyFormatter from "../middleware/currencyFormatter";

type CartIsOpenType = {
  isOpen: boolean;
};

export default function Cart({ isOpen }: CartIsOpenType) {
  const { openCart, closeCart, itemsInCart } = UseStoreCart();

  useEffect(() => {
    itemsInCart.length === 0 && closeCart();
  }, [itemsInCart]);

  return (
    <div>
      <Fragment>
        <SwipeableDrawer anchor="right" open={isOpen} onClose={closeCart} onOpen={openCart}>
          <Box display={"flex"} flexDirection={"column"}>
            <Box>
              {itemsInCart.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Box>
            <Typography alignSelf={"flex-end"} variant="h4" mt={2}>
              Total:
              {currencyFormatter(
                itemsInCart.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </Typography>
          </Box>
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
}
