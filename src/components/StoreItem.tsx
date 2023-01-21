import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import currencyFormatter from "../middleware/currencyFormatter";
import { UseStoreCart } from "../context/StoreCartContext";

const useStyles = makeStyles({
  input: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

type StoreItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, description, price, imgUrl }: StoreItemType) {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = UseStoreCart();
  const quantity = getItemQuantity(id);
  const classes = useStyles();

  return (
    <Card elevation={12}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imgUrl} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6">{currencyFormatter(price)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {quantity === 0 ? (
          <Button size="small" color="primary" onClick={() => increaseItemQuantity(id)}>
            Add to Card
          </Button>
        ) : (
          <Grid container direction={"column"}>
            <Grid container item justifyContent={"center"}>
              {" "}
              <IconButton color="primary" onClick={() => increaseItemQuantity(id)}>
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
              <Grid item xs={3}>
                <TextField
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  type="number"
                  size="small"
                  value={quantity}
                  className={classes.input}
                ></TextField>
              </Grid>
              <IconButton color="primary" onClick={() => decreaseItemQuantity(id)}>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            </Grid>

            <Grid container item justifyContent={"center"}>
              <IconButton onClick={() => removeItem(id)}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Grid>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
}
