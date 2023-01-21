import React from "react";
import { Box, Card, CardMedia, CardActionArea, CardContent, Typography, IconButton } from "@mui/material";

import { UseStoreCart } from "../context/StoreCartContext";
import storeItems from "../dataDB/storeItems.json";
import currencyFormatter from "../middleware/currencyFormatter";
import DeleteIcon from "@mui/icons-material/Delete";

type CartItemType = {
  id: number;
  quantity: number;
};
export default function CartItem({ id, quantity }: CartItemType) {
  const { removeItem } = UseStoreCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Card sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
      <CardActionArea sx={{ display: "flex", justifyContent: "start" }}>
        <Box sx={{ maxWidth: "40%" }}>
          <CardMedia component="img" sx={{ maxHeight: 200 }} image={item.imgUrl} alt={item.name} />
        </Box>

        <CardContent sx={{ maxWidth: "20%" }}>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2">{currencyFormatter(item.price)}</Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ width: "40%", display: "flex", alignItems: "center" }} gap={2}>
        <Typography variant="body2">{quantity}x</Typography>
        <Typography variant="h6">{currencyFormatter(item.price * quantity)}</Typography>
        <IconButton onClick={() => removeItem(id)}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Box>
    </Card>
  );
}
